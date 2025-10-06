"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingsDb = exports.moviesDb = void 0;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const path_1 = __importDefault(require("path"));
const moviesDbPath = path_1.default.resolve("db", "movies.db");
const ratingsDbPath = path_1.default.resolve("db", "ratings.db");
exports.moviesDb = new better_sqlite3_1.default(moviesDbPath, { verbose: console.log });
exports.ratingsDb = new better_sqlite3_1.default(ratingsDbPath, { verbose: console.log });
//Close databases on process exit
process.on('exit', () => {
    exports.moviesDb.close();
    exports.ratingsDb.close();
});
process.on('SIGINT', () => {
    exports.moviesDb.close();
    exports.ratingsDb.close();
    process.exit(0);
});
