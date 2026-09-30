const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const {
  listRooms,
  createRoom,
  joinRoom,
  getRoom,
  leaveRoom,
  assignProblem,
} = require("../controllers/roomController");

router.get("/", authMiddleware, listRooms);
router.post("/", authMiddleware, createRoom);
router.post("/join", authMiddleware, joinRoom);
router.post("/:roomCode/problem", authMiddleware, assignProblem);
router.get("/:roomCode", authMiddleware, getRoom);
router.delete("/:roomCode/leave", authMiddleware, leaveRoom);

module.exports = router;
