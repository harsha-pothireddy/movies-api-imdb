"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAverageRating = getAverageRating;
const db_1 = require("./db");
/**
 * Get average rating for a movie
 * Returns null if no ratings found
 */
function getAverageRating(movieId) {
    if (!movieId) {
        console.warn('getAverageRating called with invalid movieId');
        return null;
    }
    const result = db_1.ratingsDb
        .prepare(`
      SELECT AVG(rating) as averageRating
      FROM ratings
      WHERE movieId = ?
    `)
        .get(movieId);
    // Round to 2 decimal places if we have a rating
    if (result?.averageRating) {
        return Math.round(result.averageRating * 100) / 100;
    }
    return null;
}
