import { Request, Response } from "express";
import prisma from "../lib/prisma";

/**
 * @route   POST /api/comments/:imageId
 * @desc    Add an anonymous comment to an image
 * @access  Public
 */
export const commentImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { text } = req.body;
    const { imageId } = req.params;

    if (!imageId || typeof text !== "string" || text.trim() === "") {
      res.status(400).json({ message: "Image ID and non-empty comment text are required." });
      return;
    }

    const comment = await prisma.comment.create({
      data: {
        imageId,
        text: text.trim(),
        userId: null, // ✅ Anonymous (no username field)
      },
    });

    res.status(201).json(comment);
  } catch (err) {
    console.error("❌ Error creating comment:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @route   GET /api/comments/:imageId
 * @desc    Get all comments for an image
 * @access  Public
 */
export const getComments = async (req: Request, res: Response): Promise<void> => {
  try {
    const { imageId } = req.params;

    const comments = await prisma.comment.findMany({
      where: { imageId },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(comments);
  } catch (err) {
    console.error("❌ Error fetching comments:", err);
    res.status(500).json({ message: "Server error" });
  }
};
