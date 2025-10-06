import Database from "better-sqlite3";
import path from "path";

const rootDir = path.resolve(__dirname, "..", ".."); // go back to project root

const moviesDbPath = path.join(rootDir, "db", "movies.db");
export const moviesDb = new Database(moviesDbPath, { verbose: console.log });

const ratingsDbPath = path.join(rootDir, "db", "ratings.db");
export const ratingsDb = new Database(ratingsDbPath, { verbose: console.log });
