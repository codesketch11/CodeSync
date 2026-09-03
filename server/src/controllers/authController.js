const bcrypt = require("bcrypt");
const prisma = require("../config/db");

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Correct input
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required",
            });
        }

        // Password validation
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters",
            });
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email.toLowerCase(),
            },
        });

        if (existingUser) {
            return res.status(409).json({
                message: "User with this email already exists",
            });
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.user.create({
            data: {
                name: name.trim(),
                email: email.toLowerCase().trim(),
                passwordHash,
            },
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Registration error:", error);

        res.status(500).json({
            message: "Server error",
        });
    }
};

module.exports = {
    register,
};