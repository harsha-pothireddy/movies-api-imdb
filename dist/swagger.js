"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.specs = exports.swaggerUi = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
exports.swaggerUi = swagger_ui_express_1.default;
// Swagger options
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Movies API",
            version: "1.0.0",
            description: "API documentation for IMDB Movies Microservice",
        },
        servers: [
            {
                url: "http://localhost:3000/api/v1",
            },
        ],
    },
    apis: ["./routes/v1/*.ts"],
};
const specs = (0, swagger_jsdoc_1.default)(options);
exports.specs = specs;
