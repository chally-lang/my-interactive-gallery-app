"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const generateToken_1 = require("../utils/generateToken");
/**
 * @route   POST /api/auth/register
 * @desc    Register new user
 */
const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required" });
            return;
        }
        const existingUser = await prisma_1.default.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = await prisma_1.default.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });
        res.status(201).json({
            id: newUser.id,
            email: newUser.email,
            token: (0, generateToken_1.generateToken)(newUser.id),
        });
    }
    catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ message: "Server error during registration" });
    }
};
exports.register = register;
/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user and return token
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required" });
            return;
        }
        const user = await prisma_1.default.user.findUnique({ where: { email } });
        if (!user || !(await bcryptjs_1.default.compare(password, user.password))) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        res.status(200).json({
            id: user.id,
            email: user.email,
            token: (0, generateToken_1.generateToken)(user.id),
        });
    }
    catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error during login" });
    }
};
exports.login = login;
