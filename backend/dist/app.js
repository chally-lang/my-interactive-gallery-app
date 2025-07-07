"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const likeRoutes_1 = __importDefault(require("./routes/likeRoutes"));
const commentRoutes_1 = __importDefault(require("./routes/commentRoutes"));
const app = (0, express_1.default)();
// ✅ Allow both 5173 and 3000
const allowedOrigins = ["http://localhost:5173", "http://localhost:3000", "http://localhost:3001"];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
app.use(express_1.default.json());
// ✅ Routes
app.use("/api/auth", authRoutes_1.default);
app.use("/api/likes", likeRoutes_1.default);
app.use("/api/comments", commentRoutes_1.default);
exports.default = app;
