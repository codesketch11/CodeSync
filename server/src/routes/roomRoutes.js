const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const { createRoom, joinRoom, getRoom, leaveRoom } = require("../controllers/roomController");

router.post("/", authMiddleware, createRoom);
router.post("/join", authMiddleware, joinRoom);
router.get("/:roomCode", authMiddleware, getRoom);
router.delete("/:roomCode/leave", authMiddleware, leaveRoom);

module.exports = router;