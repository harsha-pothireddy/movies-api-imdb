"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAverageRating = getAverageRating;
const db_1 = require("./db");
// Get average rating for a movie
function getAverageRating(movieId) {
    try {
        const result = db_1.ratingsDb
            .prepare(`
      SELECT AVG(rating) as averageRating
      FROM ratings
      WHERE movieId = ?
    `)
            .get(movieId);
        return result?.averageRating ?? null;
    }
    catch (err) {
        console.error("Error in getAverageRating:", err);
        throw err;
    }
}
