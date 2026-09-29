const express = require("express");

const { getProblems, getProblemBySlug } = require("../controllers/problemController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getProblems);
router.get("/:slug", authMiddleware, getProblemBySlug);

module.exports = router;