import { moviesDb } from "./db";
import { getAverageRating } from "./ratingsService";

// Movie interface
export interface Movie {
  movieId?: number;
  imdbId: string;
  title: string;
  description?: string;
  releaseDate: string;
  budget?: string; // Formatted budget in dollars
  originalLanguage?: string;
  genres?: string;
  productionCompanies?: string;
  averageRating?: number | null;
}

const DEFAULT_PAGE_SIZE = 50; // Good prac

/**
 * Helper function to format budget in dollars
 
 */
function formatBudget(budget: number | null): string | undefined {
  if (!budget || budget === 0) return undefined;
  
  // Format as USD with commas
  return `$${budget.toLocaleString('en-US')}`;
}

/**
 * Get all movies with pagination
 */
export function getAllMovies(page: number = 1, pageSize: number = DEFAULT_PAGE_SIZE): Movie[] {
  const offset = (page - 1) * pageSize;

  const stmt = moviesDb.prepare(`
    SELECT imdbId, title, genres, releaseDate, budget
    FROM movies
    ORDER BY releaseDate ASC
    LIMIT ? OFFSET ?
  `);

  const movies = stmt.all(pageSize, offset) as any[];
  
  // Format budgets for display
  return movies.map(movie => ({
    ...movie,
    budget: formatBudget(movie.budget)
  }));
}

/**
 * Get movies by year with pagination and optional sort order
 */
export function getMoviesByYear(
  year: number,
  page: number = 1,
  sortOrder: 'asc' | 'desc' = 'asc',  
  pageSize: number = DEFAULT_PAGE_SIZE
): Movie[] {
  const offset = (page - 1) * pageSize;
  const startDate = `${year}-01-01`;
  const endDate = `${year + 1}-01-01`;

  // Validate sort order to prevent SQL injection
  const order = sortOrder.toLowerCase() === 'desc' ? 'DESC' : 'ASC';

  const stmt = moviesDb.prepare(`
    SELECT imdbId, title, genres, releaseDate, budget
    FROM movies
    WHERE releaseDate >= ? AND releaseDate < ?
    ORDER BY releaseDate ${order}
    LIMIT ? OFFSET ?
  `);

  const movies = stmt.all(startDate, endDate, pageSize, offset) as any[];
  
  return movies.map(movie => ({
    ...movie,
    budget: formatBudget(movie.budget)
  }));
}

/**
 * Get movies by genre with pagination
 */
export function getMoviesByGenre(
  genre: string,
  page: number = 1,
  pageSize: number = DEFAULT_PAGE_SIZE
): Movie[] {
  const offset = (page - 1) * pageSize;
  
  // Case-insensitive search for genre
  const genrePattern = `%${genre}%`;

  const stmt = moviesDb.prepare(`
    SELECT imdbId, title, genres, releaseDate, budget
    FROM movies
    WHERE genres LIKE ?
    ORDER BY releaseDate ASC
    LIMIT ? OFFSET ?
  `);

  const movies = stmt.all(genrePattern, pageSize, offset) as any[];
  
  return movies.map(movie => ({
    ...movie,
    budget: formatBudget(movie.budget)
  }));
}

/**
 * Get detailed information for a specific movie
 */
export function getMovieDetails(imdbId: string): Movie | null {
  // Fetch movie from database
  const movie = moviesDb
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
    .get(imdbId) as any;

  if (!movie) return null;

  // Get average rating from ratings database
  const averageRating = getAverageRating(movie.movieId);

  // Format and return
  return {
    ...movie,
    budget: formatBudget(movie.budget),
    averageRating
  };
}