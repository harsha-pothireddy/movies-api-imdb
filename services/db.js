const Database = require('better-sqlite3');
const path = require('path');

//Connect to the movies database
const moviesDbPath = path.resolve(__dirname, '../db/movies.db');
const moviesDb = new Database(moviesDbPath, { verbose: console.log });

//Connect to the ratings database
const ratingsDbPath = path.resolve(__dirname, '../db/ratings.db');
const ratingsDb = new Database(ratingsDbPath, { verbose: console.log });

module.exports = {
  moviesDb,
  ratingsDb,
};


