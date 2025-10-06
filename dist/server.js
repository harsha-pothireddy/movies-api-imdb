"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_1 = require("./swagger");
const moviesRoutes_1 = __importDefault(require("./routes/v1/moviesRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Swagger UI
app.use("/api-docs", swagger_1.swaggerUi.serve, swagger_1.swaggerUi.setup(swagger_1.specs));
// v1 routes
app.use("/api/v1/movies", moviesRoutes_1.default);
// Start server (skip if running in test mode)
if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
    });
}
exports.default = app;
