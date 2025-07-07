"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CommentController_1 = require("../controllers/CommentController");
const router = express_1.default.Router();
// ✅ Anyone can comment
router.post("/:imageId", CommentController_1.commentImage);
// ✅ Anyone can view comments
router.get("/:imageId", CommentController_1.getComments);
exports.default = router;
