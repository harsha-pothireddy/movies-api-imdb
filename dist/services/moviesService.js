"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMovies = getAllMovies;
exports.getMoviesByYear = getMoviesByYear;
exports.getMoviesByGenre = getMoviesByGenre;
exports.getMovieDetails = getMovieDetails;
const db_1 = require("./db");
const ratingsService_1 = require("./ratingsService");
const DEFAULT_PAGE_SIZE = 50; // Good prac
/**
 * Helper function to format budget in dollars
 
 */
function formatBudget(budget) {
    if (!budget || budget === 0)
        return undefined;
    // Format as USD with commas
    return `$${budget.toLocaleString('en-US')}`;
}
/**
 * Get all movies with pagination
 */
function getAllMovies(page = 1, pageSize = DEFAULT_PAGE_SIZE) {
    const offset = (page - 1) * pageSize;
    const stmt = db_1.moviesDb.prepare(`
    SELECT imdbId, title, genres, releaseDate, budget
    FROM movies
    ORDER BY releaseDate ASC
    LIMIT ? OFFSET ?
  `);
    const movies = stmt.all(pageSize, offset);
    // Format budgets for display
    return movies.map(movie => ({
        ...movie,
        budget: formatBudget(movie.budget)
    }));
}
/**
 * Get movies by year with pagination and optional sort order
 */
function getMoviesByYear(year, page = 1, sortOrder = 'asc', pageSize = DEFAULT_PAGE_SIZE) {
    const offset = (page - 1) * pageSize;
    const startDate = `${year}-01-01`;
    const endDate = `${year + 1}-01-01`;
    // Validate sort order to prevent SQL injection
    const order = sortOrder.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
    const stmt = db_1.moviesDb.prepare(`
    SELECT imdbId, title, genres, releaseDate, budget
    FROM movies
    WHERE releaseDate >= ? AND releaseDate < ?
    ORDER BY releaseDate ${order}
    LIMIT ? OFFSET ?
  `);
    const movies = stmt.all(startDate, endDate, pageSize, offset);
    return movies.map(movie => ({
        ...movie,
        budget: formatBudget(movie.budget)
    }));
}
/**
 * Get movies by genre with pagination
 */
function getMoviesByGenre(genre, page = 1, pageSize = DEFAULT_PAGE_SIZE) {
    const offset = (page - 1) * pageSize;
    // Case-insensitive search for genre
    const genrePattern = `%${genre}%`;
    const stmt = db_1.moviesDb.prepare(`
    SELECT imdbId, title, genres, releaseDate, budget
    FROM movies
    WHERE genres LIKE ?
    ORDER BY releaseDate ASC
    LIMIT ? OFFSET ?
  `);
    const movies = stmt.all(genrePattern, pageSize, offset);
    return movies.map(movie => ({
        ...movie,
        budget: formatBudget(movie.budget)
    }));
}
/**
 * Get detailed information for a specific movie
 */
function getMovieDetails(imdbId) {
    // Fetch movie from database
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
    // Get average rating from ratings database
    const averageRating = (0, ratingsService_1.getAverageRating)(movie.movieId);
    // Format and return
    return {
        ...movie,
        budget: formatBudget(movie.budget),
        averageRating
    };
}
