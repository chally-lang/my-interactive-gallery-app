"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const LikeController_1 = require("../controllers/LikeController");
const router = express_1.default.Router();
router.post("/", LikeController_1.likeImage); // 🔓 Public
router.get("/:imageId", LikeController_1.getLikes);
exports.default = router;
