import Database from "better-sqlite3";
import path from "path";

const moviesDbPath = path.resolve("db", "movies.db");
const ratingsDbPath = path.resolve("db", "ratings.db");

export const moviesDb = new Database(moviesDbPath, { verbose: console.log });
export const ratingsDb = new Database(ratingsDbPath, { verbose: console.log });



//Close databases on process exit

process.on('exit', () => {
  moviesDb.close();
  ratingsDb.close();
});

process.on('SIGINT', () => {
  moviesDb.close();
  ratingsDb.close();
  process.exit(0);
});