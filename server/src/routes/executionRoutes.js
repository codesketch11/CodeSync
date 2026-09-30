const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { execute } = require("../controllers/executionController");

const router = express.Router();
router.post("/:roomCode/execute", authMiddleware, execute);

module.exports = router;
