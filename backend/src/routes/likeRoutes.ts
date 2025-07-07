import express from "express";
import { likeImage, getLikes } from "../controllers/LikeController";

const router = express.Router();

router.post("/", likeImage); // 🔓 Public
router.get("/:imageId", getLikes);

export default router;
