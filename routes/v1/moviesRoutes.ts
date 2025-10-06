import express, { Request, Response } from "express";
import {
  getAllMovies,
  getMovieDetails,
  getMoviesByYear,
  getMoviesByGenre,
} from "../../services/moviesService";

const router = express.Router();

/**
 * Health check endpoint
 */
router.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", apiVersion: "v1" });
});

/**
 * List all movies with pagination
 * GET /api/v1/movies?page=1
 */
router.get("/", (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  
  if (page < 1) {
    return res.status(400).json({ error: "Page must be a positive integer" });
  }

  const movies = getAllMovies(page);

  if (!movies || movies.length === 0) {
    return res.status(404).json({
      error: `No movies found for page ${page}`
    });
  }

  res.json({
    page,
    pageSize: 50,
    count: movies.length,
    results: movies,
  });
});

/**
 * Get movie details by IMDb ID
 * GET /api/v1/movies/:imdbId
 */
router.get("/:imdbId", (req: Request, res: Response) => {
  const { imdbId } = req.params;
  
  // Basic validation for IMDb ID format
  if (!imdbId.startsWith('tt')) {
    return res.status(400).json({ 
      error: "Invalid IMDb ID format. Expected format: tt1234567" 
    });
  }

  const movie = getMovieDetails(imdbId);

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  res.json(movie);
});

/**
 * Get movies by year with optional sort order
 * GET /api/v1/movies/year/:year?page=1&order=desc
 * 
 * @swagger
 * /movies/year/{year}:
 *   get:
 *     summary: Get movies released in a specific year
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 */
router.get("/year/:year", (req: Request, res: Response) => {
  const year = parseInt(req.params.year, 10);
  const page = parseInt(req.query.page as string) || 1;
  const order = (req.query.order as string)?.toLowerCase() === 'desc' ? 'desc' : 'asc';

  // Validation
  if (isNaN(year) || year < 1800 || year > 2100) {
    return res.status(400).json({ 
      error: "Invalid year. Must be between 1800 and 2100" 
    });
  }

  if (page < 1) {
    return res.status(400).json({ error: "Page must be a positive integer" });
  }

  const movies = getMoviesByYear(year, page, order);
  
  if (!movies || movies.length === 0) {
    return res.status(404).json({ 
      error: `No movies found for year ${year} on page ${page}` 
    });
  }

  res.json({ 
    year, 
    page,
    sortOrder: order,
    count: movies.length,
    results: movies 
  });
});

/**
 * Get movies by genre
 * GET /api/v1/movies/genre/:genre?page=1
 */
router.get("/genre/:genre", (req: Request, res: Response) => {
  const { genre } = req.params;
  const page = parseInt(req.query.page as string) || 1;

  if (!genre || genre.trim().length === 0) {
    return res.status(400).json({ error: "Genre parameter is required" });
  }

  if (page < 1) {
    return res.status(400).json({ error: "Page must be a positive integer" });
  }

  const movies = getMoviesByGenre(genre, page);
  
  if (!movies || movies.length === 0) {
    return res.status(404).json({ 
      error: `No movies found for genre "${genre}" on page ${page}` 
    });
  }

  res.json({ 
    genre, 
    page,
    count: movies.length,
    results: movies 
  });
});

export default router;