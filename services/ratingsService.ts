import { ratingsDb } from "./db";

/**
 * Get average rating for a movie
 * Returns null if no ratings found
 */
export function getAverageRating(movieId: number): number | null {
  if (!movieId) {
    console.warn('getAverageRating called with invalid movieId');
    return null;
  }

  const result = ratingsDb
    .prepare(`
      SELECT AVG(rating) as averageRating
      FROM ratings
      WHERE movieId = ?
    `)
    .get(movieId) as { averageRating?: number } | undefined;

  // Round to 2 decimal places if we have a rating
  if (result?.averageRating) {
    return Math.round(result.averageRating * 100) / 100;
  }

  return null;
}
