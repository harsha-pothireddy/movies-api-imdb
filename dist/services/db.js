"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingsDb = exports.moviesDb = void 0;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const path_1 = __importDefault(require("path"));
const rootDir = path_1.default.resolve(__dirname, "..", ".."); // go back to project root
const moviesDbPath = path_1.default.join(rootDir, "db", "movies.db");
exports.moviesDb = new better_sqlite3_1.default(moviesDbPath, { verbose: console.log });
const ratingsDbPath = path_1.default.join(rootDir, "db", "ratings.db");
exports.ratingsDb = new better_sqlite3_1.default(ratingsDbPath, { verbose: console.log });
