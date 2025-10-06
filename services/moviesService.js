"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMovies = getAllMovies;
exports.getMoviesByYear = getMoviesByYear;
exports.getMoviesByGenre = getMoviesByGenre;
exports.getMovieDetails = getMovieDetails;
var db_1 = require("./db");
var ratingsService_1 = require("./ratingsService");
// Get paginated movies
function getAllMovies(page, pageSize) {
    if (page === void 0) { page = 1; }
    if (pageSize === void 0) { pageSize = 50; }
    try {
        var offset = (page - 1) * pageSize;
        var stmt = db_1.moviesDb.prepare("\n      SELECT imdbId, title, genres, releaseDate, budget\n      FROM movies\n      ORDER BY releaseDate ASC\n      LIMIT ? OFFSET ?\n    ");
        return stmt.all(pageSize, offset);
    }
    catch (err) {
        console.error("Error in getAllMovies:", err);
        throw err;
    }
}
// Get movies by year
function getMoviesByYear(year, page, pageSize) {
    if (page === void 0) { page = 1; }
    if (pageSize === void 0) { pageSize = 50; }
    try {
        var offset = (page - 1) * pageSize;
        var startDate = "".concat(year, "-01-01");
        var endDate = "".concat(year + 1, "-01-01");
        var stmt = db_1.moviesDb.prepare("\n      SELECT imdbId, title, genres, releaseDate, budget\n      FROM movies\n      WHERE releaseDate BETWEEN ? AND ?\n      ORDER BY releaseDate ASC\n      LIMIT ? OFFSET ?\n    ");
        return stmt.all(startDate, endDate, pageSize, offset);
    }
    catch (err) {
        console.error("Error in getMoviesByYear:", err);
        throw err;
    }
}
// Get movies by genre
function getMoviesByGenre(genre, page, pageSize) {
    if (page === void 0) { page = 1; }
    if (pageSize === void 0) { pageSize = 50; }
    try {
        var offset = (page - 1) * pageSize;
        var genrePattern = "%".concat(genre, "%");
        var stmt = db_1.moviesDb.prepare("\n      SELECT imdbId, title, genres, releaseDate, budget\n      FROM movies\n      WHERE genres LIKE ?\n      ORDER BY releaseDate ASC\n      LIMIT ? OFFSET ?\n    ");
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
        var movie = db_1.moviesDb
            .prepare("\n      SELECT movieId,\n             imdbId,\n             title,\n             overview AS description,\n             releaseDate,\n             budget,\n             runtime,\n             language AS originalLanguage,\n             genres,\n             productionCompanies\n      FROM movies\n      WHERE imdbId = ?\n    ")
            .get(imdbId);
        if (!movie)
            return null;
        // Use ratingsService for average rating
        var averageRating = (0, ratingsService_1.getAverageRating)(movie.movieId);
        return __assign(__assign({}, movie), { averageRating: averageRating });
    }
    catch (err) {
        console.error("Error in getMovieDetails:", err);
        throw err;
    }
}
