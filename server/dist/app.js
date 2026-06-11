"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const resumeRoutes_1 = __importDefault(require("./routes/resumeRoutes"));
const templateRoutes_1 = __importDefault(require("./routes/templateRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.get('/', (req, res) => {
    res.send('API is running...');
});
app.use('/api/auth', authRoutes_1.default);
app.use('/api/resumes', resumeRoutes_1.default);
app.use('/api/templates', templateRoutes_1.default);
// Database Connection
(0, db_1.connectDB)();
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
