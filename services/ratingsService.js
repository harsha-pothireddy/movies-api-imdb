const { ratingsDb } = require('./db');

// Get average rating for a movie
function getAverageRating(movieId) {
  try {
    const { averageRating } = ratingsDb.prepare(`
      SELECT AVG(rating) as averageRating
      FROM ratings
      WHERE movieId = ?
    `).get(movieId) || {};

    return averageRating || null;
  } catch (err) {
    console.error("Error in getAverageRating:", err);
    throw err;
  }
}

module.exports = {
  getAverageRating,
};