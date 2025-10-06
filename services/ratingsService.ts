import { ratingsDb } from "./db";

// Get average rating for a movie
export function getAverageRating(movieId: number): number | null {
  try {
    const result = ratingsDb
      .prepare(
        `SELECT AVG(rating) as averageRating
        FROM ratings
        WHERE movieId = ?
        `
      )
      .get(movieId) as { averageRating?: number };

    return result?.averageRating ?? null;
  } catch (err) {
    console.error("Error in getAverageRating:", err);
    throw err;
  }
}
