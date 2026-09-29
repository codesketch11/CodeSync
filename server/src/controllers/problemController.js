const prisma = require("../config/db");

const getProblems = async (req, res) => {
    try {

        const { difficulty } = req.query;

        const problems = await prisma.problem.findMany({
            where: difficulty
            ? {
                difficulty: difficulty.toUpperCase(),
            }
            : undefined,

            select: {
                id: true,
                title: true,
                slug: true,
                difficulty: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        res.status(200).json({
            problems,
        });
    } catch (error) {
        console.error("Get problems error:", error);

        res.status(500).json({
            message: "Server error",
        });
    }
};

const getProblemBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        const problem = await prisma.problem.findUnique({
            where: {
                slug: slug.toLowerCase(),
            },

            select: {
                id: true,
                title: true,
                slug: true,
                description: true,
                difficulty: true,
                inputFormat: true,
                outputFormat: true,
                constraints: true,
                examples: true,
                starterCode: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        if (!problem) {
            return res.status(404).json({
                message: "Problem not found",
            });
        }

        res.status(200).json({
            problem,
        });

    } catch (error) {
        console.error("Get problem error:", error);

        res.status(500).json({
            message: "Server error",
        });
    }
};

module.exports = {
    getProblems, getProblemBySlug,
};