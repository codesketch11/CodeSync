const prisma = require("../config/db");

const PISTON_URL = process.env.EXECUTION_API_URL;
const MAX_SOURCE_LENGTH = 50000;

const runtimes = {
    cpp: { language: "c++", version: process.env.PISTON_CPP_VERSION || "*" },
};

const normalizeOutput = (value = "") => value.replace(/\r\n/g, "\n").trim();

const runProgram = async ({ code, language, input }) => {
    if (!PISTON_URL) {
        throw new Error("Code execution is not configured. Set EXECUTION_API_URL to a private Piston-compatible sandbox.");
    }
    const runtime = runtimes[language];
    if (!runtime) throw new Error("Unsupported language");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
        const response = await fetch(PISTON_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            signal: controller.signal,
            body: JSON.stringify({
                ...runtime,
                files: [{ content: code }],
                stdin: input || "",
                run_timeout: 5000,
                compile_timeout: 10000,
            }),
        });

        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
            throw new Error(data.message || "The execution service is unavailable");
        }

        const result = data.run || {};
        const stderr = result.stderr || data.compile?.stderr || "";
        const failed = result.code !== 0 || result.signal || Boolean(stderr);
        return {
            stdout: result.stdout || "",
            stderr,
            code: result.code,
            signal: result.signal,
            failed,
        };
    } catch (error) {
        if (error.name === "AbortError") throw new Error("Execution timed out. Please try a simpler solution.");
        throw error;
    } finally {
        clearTimeout(timeout);
    }
};

const execute = async (req, res) => {
    try {
        const { roomCode } = req.params;
        const { code, language, mode = "run" } = req.body;
        const userId = req.user.userId;

        if (!code || typeof code !== "string" || code.length > MAX_SOURCE_LENGTH) {
            return res.status(400).json({ message: "Code must be between 1 and 50,000 characters" });
        }
        if (!runtimes[language] || !["run", "submit"].includes(mode)) {
            return res.status(400).json({ message: "Invalid execution request" });
        }

        const room = await prisma.room.findUnique({
            where: { roomCode: roomCode.toUpperCase() },
            include: { problem: true, participants: { where: { userId } } },
        });
        if (!room) return res.status(404).json({ message: "Room not found" });
        if (!room.participants.length) return res.status(403).json({ message: "You are not a participant in this room" });
        if (!room.problem) return res.status(400).json({ message: "Choose a challenge before running code" });

        const tests = mode === "run" ? room.problem.examples : room.problem.testCases;
        if (!Array.isArray(tests) || !tests.length) {
            return res.status(400).json({ message: "This challenge has no test cases configured" });
        }

        const results = [];
        for (let index = 0; index < tests.length; index += 1) {
            const test = tests[index];
            const execution = await runProgram({ code, language, input: test.input });
            const passed = !execution.failed && normalizeOutput(execution.stdout) === normalizeOutput(test.output);
            results.push({
                index: index + 1,
                passed,
                stdout: execution.stdout,
                stderr: execution.stderr,
                ...(mode === "run" ? { input: test.input, expected: test.output } : {}),
            });
            if (execution.failed) break;
        }

        const allPassed = results.length === tests.length && results.every((result) => result.passed);
        const executionFailed = results.some((result) => result.stderr);
        const status = allPassed ? "ACCEPTED" : executionFailed ? "RUNTIME_ERROR" : "WRONG_ANSWER";
        let submission;

        if (mode === "submit") {
            submission = await prisma.submission.create({
                data: { code, language, status, userId, roomId: room.id, problemId: room.problem.id },
                select: { id: true, status: true, createdAt: true },
            });
        }

        res.json({
            mode,
            status,
            passedCount: results.filter((result) => result.passed).length,
            totalCount: tests.length,
            results,
            submission,
        });
    } catch (error) {
        console.error("Code execution error:", error);
        res.status(503).json({ message: error.message || "Code execution is temporarily unavailable" });
    }
};

module.exports = { execute };
