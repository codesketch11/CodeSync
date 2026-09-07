const crypto = require("crypto");

const prisma = require("../config/db");

const generateRoomCode = () => {
    return crypto.randomBytes(4).toString("hex").toUpperCase();
};

const createRoom = async (req, res) => {
    try {
        const { name } = req.body;
        const userId = req.user.userId;

        if (!name) {
            return res.status(400).json({
                message: "Room name is required",
            });
        }

        const roomCode = generateRoomCode();

        const room = await prisma.room.create({
            data: {
                name: name.trim(),
                roomCode,
                hostId: userId,

                participants: {
                    create: {
                        userId: userId,
                        role: "HOST",
                    },
                },
            },

            include: {
                participants: true,
            },
        });

        const hostParticipant = room.participants[0];

        res.status(201).json({
            message: "Room created successfully",

            room: {
                id: room.id,
                name: room.name,
                roomCode: room.roomCode,
                hostId: room.hostId,
                createdAt: room.createdAt,
            },

            participant: {
                userId: hostParticipant.userId,
                role: hostParticipant.role,
                joinedAt: hostParticipant.joinedAt,
            },
        });

    } catch (error) {
        console.error("Create room error:", error);

        res.status(500).json({
            message: "Server error",
        });
    }
};

const joinRoom = async (req, res) => {
    try {
        const { roomCode } = req.body;
        const userId = req.user.userId;

        if (!roomCode) {
            return res.status(400).json({
                message: "Room code is required",
            });
        }

        // Find the room
        const room = await prisma.room.findUnique({
            where: {
                roomCode: roomCode.toUpperCase(),
            },
        });

        if (!room) {
            return res.status(404).json({
                message: "Room not found",
            });
        }

        // Checking if user is already a participant
        const existingParticipant = await prisma.roomParticipant.findUnique({
            where: {
                roomId_userId: {
                    roomId: room.id,
                    userId: userId,
                },
            },
        });

        if (existingParticipant) {
            return res.status(409).json({
                message: "You are already in this room",
            });
        }

        // Add user to room
        const participant = await prisma.roomParticipant.create({
            data: {
                roomId: room.id,
                userId: userId,
                role: "MEMBER",
            },
        });

        res.status(201).json({
            message: "Joined room successfully",
            room: {
                id: room.id,
                name: room.name,
                roomCode: room.roomCode,
                hostId: room.hostId,
            },
            participant: {
                userId: participant.userId,
                role: participant.role,
                joinedAt: participant.joinedAt,
            },
        });
    } catch (error) {
        console.error("Join room error:", error);

        res.status(500).json({
            message: "Server error",
        });
    }
};

const getRoom = async (req, res) => {
    try {
        const { roomCode } = req.params;

        const room = await prisma.room.findUnique({
            where: {
                roomCode: roomCode.toUpperCase(),
            },

            include: {
                host: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },

                participants: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                            },
                        },
                    },
                },
            },
        });

        if (!room) {
            return res.status(404).json({
                message: "Room not found",
            });
        }

        res.status(200).json({
            room: {
                id: room.id,
                name: room.name,
                roomCode: room.roomCode,
                createdAt: room.createdAt,
                host: room.host,
            },

            participants: room.participants.map((participant) => ({
                id: participant.user.id,
                name: participant.user.name,
                email: participant.user.email,
                role: participant.role,
                joinedAt: participant.joinedAt,
            })),
        });

    } catch (error) {
        console.error("Get room error:", error);

        res.status(500).json({
            message: "Server error",
        });
    }
};

const leaveRoom = async (req, res) => {
    try {
        const { roomCode } = req.params;
        const userId = req.user.userId;

        const room = await prisma.room.findUnique({
            where: {
                roomCode: roomCode.toUpperCase(),
            },
        });

        if (!room) {
            return res.status(404).json({
                message: "Room not found",
            });
        }

        // Check whether the user is a participant
        const participant = await prisma.roomParticipant.findUnique({
            where: {
                roomId_userId: {
                    roomId: room.id,
                    userId: userId,
                },
            },
        });

        if (!participant) {
            return res.status(404).json({
                message: "You are not a participant in this room",
            });
        }

        // Host cannot leave the room
        if (participant.role === "HOST") {
            return res.status(403).json({
                message: "Host cannot leave the room",
            });
        }

        // Remove participant
        await prisma.roomParticipant.delete({
            where: {
                roomId_userId: {
                    roomId: room.id,
                    userId: userId,
                },
            },
        });

        res.status(200).json({
            message: "Left room successfully",
        });

    } catch (error) {
        console.error("Leave room error:", error);

        res.status(500).json({
            message: "Server error",
        });
    }
};

module.exports = {
    createRoom, joinRoom, getRoom, leaveRoom,
};