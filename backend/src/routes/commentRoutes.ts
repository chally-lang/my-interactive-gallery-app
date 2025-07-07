import express from "express";
import { commentImage, getComments } from "../controllers/CommentController";

const router = express.Router();

// ✅ Anyone can comment
router.post("/:imageId", commentImage);

// ✅ Anyone can view comments
router.get("/:imageId", getComments);

export default router;
