"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLikes = exports.likeImage = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
/**
 * @route   POST /api/likes
 * @desc    Like an image (anonymous/public)
 * @access  Public
 */
const likeImage = async (req, res) => {
    try {
        const { imageId } = req.body;
        if (!imageId || typeof imageId !== "string") {
            res.status(400).json({ message: "Image ID is required" });
            return;
        }
        const like = await prisma_1.default.like.create({
            data: {
                imageId,
                // userId: optional (we're skipping it for anonymous users)
            },
        });
        res.status(201).json(like);
    }
    catch (err) {
        console.error("❌ Error liking image:", err);
        res.status(500).json({ message: "Server error" });
    }
};
exports.likeImage = likeImage;
/**
 * @route   GET /api/likes/:imageId
 * @desc    Get total like count for an image
 * @access  Public
 */
const getLikes = async (req, res) => {
    try {
        const { imageId } = req.params;
        if (!imageId || typeof imageId !== "string") {
            res.status(400).json({ message: "Image ID is required" });
            return;
        }
        const count = await prisma_1.default.like.count({
            where: { imageId },
        });
        res.status(200).json({ imageId, count });
    }
    catch (err) {
        console.error("❌ Error fetching like count:", err);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getLikes = getLikes;
