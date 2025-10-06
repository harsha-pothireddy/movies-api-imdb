import { moviesDb } from "./db";
import { getAverageRating } from "./ratingsService";

// Define a Movie type
export interface Movie {
  movieId?: number;
  imdbId: string;
  title: string;
  description?: string;
  releaseDate: string;
  budget?: number;
  runtime?: number;
  originalLanguage?: string;
  genres?: string;
  productionCompanies?: string;
  averageRating?: number | null;
}

// Get paginated movies
export function getAllMovies(page: number = 1, pageSize: number = 50): Movie[] {
  try {
    const offset = (page - 1) * pageSize;

    const stmt = moviesDb.prepare(`
      SELECT imdbId, title, genres, releaseDate, budget
      FROM movies
      ORDER BY releaseDate ASC
      LIMIT ? OFFSET ?
    `);

    return stmt.all(pageSize, offset) as Movie[];
  } catch (err) {
    console.error("Error in getAllMovies:", err);
    throw err;
  }
}

// Get movies by year
export function getMoviesByYear(
  year: number,
  page: number = 1,
  pageSize: number = 50
): Movie[] {
  try {
    const offset = (page - 1) * pageSize;
    const startDate = `${year}-01-01`;
    const endDate = `${year + 1}-01-01`;

    const stmt = moviesDb.prepare(`
      SELECT imdbId, title, genres, releaseDate, budget
      FROM movies
      WHERE releaseDate BETWEEN ? AND ?
      ORDER BY releaseDate ASC
      LIMIT ? OFFSET ?
    `);

    return stmt.all(startDate, endDate, pageSize, offset) as Movie[];
  } catch (err) {
    console.error("Error in getMoviesByYear:", err);
    throw err;
  }
}

// Get movies by genre
export function getMoviesByGenre(
  genre: string,
  page: number = 1,
  pageSize: number = 50
): Movie[] {
  try {
    const offset = (page - 1) * pageSize;
    const genrePattern = `%${genre}%`;

    const stmt = moviesDb.prepare(`
      SELECT imdbId, title, genres, releaseDate, budget
      FROM movies
      WHERE genres LIKE ?
      ORDER BY releaseDate ASC
      LIMIT ? OFFSET ?
    `);

    return stmt.all(genrePattern, pageSize, offset) as Movie[];
  } catch (err) {
    console.error("Error in getMoviesByGenre:", err);
    throw err;
  }
}

// Get movie details by imdbId
export function getMovieDetails(imdbId: string): Movie | null {
  try {
    // Fetch from movies.db
    const movie = moviesDb
      .prepare(
        `
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
    `
      )
      .get(imdbId) as Movie | undefined;

    if (!movie) return null;

    // Use ratingsService for average rating
    const averageRating = getAverageRating(movie.movieId!);

    return { ...movie, averageRating };
  } catch (err) {
    console.error("Error in getMovieDetails:", err);
    throw err;
  }
}
