"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var swagger_1 = require("./swagger");
var moviesRoutes_1 = require("./routes/v1/moviesRoutes");
var app = (0, express_1.default)();
var port = 3000;
// Swagger UI
app.use("/api-docs", swagger_1.swaggerUi.serve, swagger_1.swaggerUi.setup(swagger_1.specs));
// v1 routes
app.use("/api/v1/movies", moviesRoutes_1.default);
// Start server (skip if running in test mode)
if (process.env.NODE_ENV !== "test") {
    app.listen(port, function () {
        console.log("Server is running on http://localhost:".concat(port));
        console.log("Swagger UI available at http://localhost:".concat(port, "/api-docs"));
    });
}
exports.default = app;
