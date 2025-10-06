"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMovies = getAllMovies;
exports.getMoviesByYear = getMoviesByYear;
exports.getMoviesByGenre = getMoviesByGenre;
exports.getMovieDetails = getMovieDetails;
const db_1 = require("./db");
const ratingsService_1 = require("./ratingsService");
// Get paginated movies
function getAllMovies(page = 1, pageSize = 50) {
    try {
        const offset = (page - 1) * pageSize;
        const stmt = db_1.moviesDb.prepare(`
      SELECT imdbId, title, genres, releaseDate, budget
      FROM movies
      ORDER BY releaseDate ASC
      LIMIT ? OFFSET ?
    `);
        return stmt.all(pageSize, offset);
    }
    catch (err) {
        console.error("Error in getAllMovies:", err);
        throw err;
    }
}
// Get movies by year
function getMoviesByYear(year, page = 1, pageSize = 50) {
    try {
        const offset = (page - 1) * pageSize;
        const startDate = `${year}-01-01`;
        const endDate = `${year + 1}-01-01`;
        const stmt = db_1.moviesDb.prepare(`
      SELECT imdbId, title, genres, releaseDate, budget
      FROM movies
      WHERE releaseDate BETWEEN ? AND ?
      ORDER BY releaseDate ASC
      LIMIT ? OFFSET ?
    `);
        return stmt.all(startDate, endDate, pageSize, offset);
    }
    catch (err) {
        console.error("Error in getMoviesByYear:", err);
        throw err;
    }
}
// Get movies by genre
function getMoviesByGenre(genre, page = 1, pageSize = 50) {
    try {
        const offset = (page - 1) * pageSize;
        const genrePattern = `%${genre}%`;
        const stmt = db_1.moviesDb.prepare(`
      SELECT imdbId, title, genres, releaseDate, budget
      FROM movies
      WHERE genres LIKE ?
      ORDER BY releaseDate ASC
      LIMIT ? OFFSET ?
    `);
        return stmt.all(genrePattern, pageSize, offset);
    }
    catch (err) {
        console.error("Error in getMoviesByGenre:", err);
        throw err;
    }
}
// Get movie details by imdbId
function getMovieDetails(imdbId) {
    try {
        // Fetch from movies.db
        const movie = db_1.moviesDb
            .prepare(`
      SELECT movieId,
             imdbId,
             title,
             overview AS description,
             releaseDate,
             budget,
             runtime,
             language AS originalLanguage,
             genres,
             productionCompanies
      FROM movies
      WHERE imdbId = ?
    `)
            .get(imdbId);
        if (!movie)
            return null;
        // Use ratingsService for average rating
        const averageRating = (0, ratingsService_1.getAverageRating)(movie.movieId);
        return { ...movie, averageRating };
    }
    catch (err) {
        console.error("Error in getMovieDetails:", err);
        throw err;
    }
}
