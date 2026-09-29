const express = require("express");
const cors = require("cors");
const http = require("http");

require("dotenv").config();

const prisma = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const roomRoutes = require("./routes/roomRoutes");
const problemRoutes = require("./routes/problemRoutes");
const setupSocket = require("./socket");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/problems", problemRoutes);

app.get("/", (req, res) =>{
    res.json({
        message: "CodeSync API is running",
    });
});

app.get("/api/test-db", async (req, res) => {
    try {
        await prisma.$connect();

        res.json({
            message: "Database connected successfully",
        });
    } catch (error) {
        console.error("Database connection error:", error);

        res.status(500).json({
            message: "Database connection failed",
        });
    }
});

const server = http.createServer(app);
setupSocket(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});