const { Server } = require("socket.io");

const prisma = require("./config/db");

const setupSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log("Socket connected:", socket.id);

        // ================================
        // JOIN ROOM
        // ================================

        socket.on("join-room", async ({ roomCode }) => {
            try {
                const normalizedRoomCode = roomCode.toUpperCase();

                socket.join(normalizedRoomCode);

                console.log(
                    `Socket ${socket.id} joined room ${normalizedRoomCode}`
                );

                const room = await prisma.room.findUnique({
                    where: {
                        roomCode: normalizedRoomCode,
                    },
                    select: {
                        code: true,
                        language: true,
                    },
                });

                if (!room) {
                    console.log(
                        `Room ${normalizedRoomCode} not found`
                    );
                    return;
                }

                socket.emit("room-state", {
                    code: room.code,
                    language: room.language,
                });

                console.log(
                    `Sent room state to ${socket.id}`
                );

            } catch (error) {
                console.error(
                    "Join room socket error:",
                    error
                );
            }
        });

        // ================================
        // CODE CHANGE
        // ================================

        socket.on("code-change", async ({ roomCode, code }) => {
            try {
                const normalizedRoomCode =
                    roomCode.toUpperCase();

                // Save latest code
                await prisma.room.update({
                    where: {
                        roomCode: normalizedRoomCode,
                    },
                    data: {
                        code,
                    },
                });

                console.log(
                    `Code updated in room ${normalizedRoomCode}`
                );

                // Send to everyone else
                socket
                    .to(normalizedRoomCode)
                    .emit("code-update", {
                        code,
                    });

            } catch (error) {
                console.error(
                    "Code change error:",
                    error
                );
            }
        });

        // ================================
        // LANGUAGE CHANGE
        // ================================

        socket.on(
            "language-change",
            async ({ roomCode, language, code }) => {
                try {
                    const normalizedRoomCode =
                        roomCode.toUpperCase();

                    await prisma.room.update({
                        where: {
                            roomCode: normalizedRoomCode,
                        },
                        data: {
                            language,
                            code,
                        },
                    });

                    console.log(
                        `Language changed to ${language} in room ${normalizedRoomCode}`
                    );

                    socket
                        .to(normalizedRoomCode)
                        .emit("language-update", {
                            language,
                            code,
                        });

                } catch (error) {
                    console.error(
                        "Language change error:",
                        error
                    );
                }
            }
        );

        // ================================
        // DISCONNECT
        // ================================

        socket.on("disconnect", () => {
            console.log(
                "Socket disconnected:",
                socket.id
            );
        });
    });

    return io;
};

module.exports = setupSocket;