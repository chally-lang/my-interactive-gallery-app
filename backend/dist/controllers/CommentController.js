"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComments = exports.commentImage = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
/**
 * @route   POST /api/comments/:imageId
 * @desc    Add an anonymous comment to an image
 * @access  Public
 */
const commentImage = async (req, res) => {
    try {
        const { text } = req.body;
        const { imageId } = req.params;
        if (!imageId || typeof text !== "string" || text.trim() === "") {
            res.status(400).json({ message: "Image ID and non-empty comment text are required." });
            return;
        }
        const comment = await prisma_1.default.comment.create({
            data: {
                imageId,
                text: text.trim(),
                userId: null, // ✅ Anonymous (no username field)
            },
        });
        res.status(201).json(comment);
    }
    catch (err) {
        console.error("❌ Error creating comment:", err);
        res.status(500).json({ message: "Server error" });
    }
};
exports.commentImage = commentImage;
/**
 * @route   GET /api/comments/:imageId
 * @desc    Get all comments for an image
 * @access  Public
 */
const getComments = async (req, res) => {
    try {
        const { imageId } = req.params;
        const comments = await prisma_1.default.comment.findMany({
            where: { imageId },
            orderBy: { createdAt: "desc" },
        });
        res.status(200).json(comments);
    }
    catch (err) {
        console.error("❌ Error fetching comments:", err);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getComments = getComments;
