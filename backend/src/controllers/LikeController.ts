import { Request, Response } from "express";
import prisma from "../lib/prisma";

/**
 * @route   POST /api/likes
 * @desc    Like an image (anonymous/public)
 * @access  Public
 */
export const likeImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { imageId } = req.body;

    if (!imageId || typeof imageId !== "string") {
      res.status(400).json({ message: "Image ID is required" });
      return;
    }

    const like = await prisma.like.create({
      data: {
        imageId,
        // userId: optional (we're skipping it for anonymous users)
      },
    });

    res.status(201).json(like);
  } catch (err) {
    console.error("❌ Error liking image:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @route   GET /api/likes/:imageId
 * @desc    Get total like count for an image
 * @access  Public
 */
export const getLikes = async (req: Request, res: Response): Promise<void> => {
  try {
    const { imageId } = req.params;

    if (!imageId || typeof imageId !== "string") {
      res.status(400).json({ message: "Image ID is required" });
      return;
    }

    const count = await prisma.like.count({
      where: { imageId },
    });

    res.status(200).json({ imageId, count });
  } catch (err) {
    console.error("❌ Error fetching like count:", err);
    res.status(500).json({ message: "Server error" });
  }
};
