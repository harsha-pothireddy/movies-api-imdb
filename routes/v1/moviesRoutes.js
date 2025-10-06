const express = require('express');
const router = express.Router();

const { getAllMovies, getMovieDetails, getMoviesByYear, getMoviesByGenre } = require('../../services/moviesService');


router.get('/health', (req, res) => {
  res.json({ status: 'ok', apiVersion: 'v1' });
});

/**
 * @swagger
 * /movies/year/{year}:
 *   get:
 *     summary: Get movies released in a specific year
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: Release year of the movies
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: A list of movies released in the given year
 *         content:
 *           application/json:
 *             example:
 *               year: 1994
 *               page: 1
 *               results:
 *                 - imdbId: tt0111161
 *                   title: The Shawshank Redemption
 *                   genres: Drama
 *                   releaseDate: 1994-09-23
 *                   budget: 25000000
 *       400:
 *         description: Invalid year parameter
 *       404:
 *         description: No movies found for the given year
 */
router.get('/year/:year', (req, res) => {
  const year = req.params.year;
  const page = parseInt(req.query.page) || 1;

  if (isNaN(year) || year < 1800) {
    return res.status(400).json({ error: 'Invalid year parameter' });
  }

  const movies = getMoviesByYear(year, page);
  if (!movies || movies.length === 0) {
    return res.status(404).json({ error: `No movies found for year ${year}, page ${page}` });
  }

  res.json({ year, page, results: movies });
});

router.get('/genre/:genre', (req, res) => {
  const genre = req.params.genre;
  const page = parseInt(req.query.page) || 1;

  if (!genre) {
    return res.status(400).json({ error: 'Invalid genre parameter' });
  }

  const movies = getMoviesByGenre(genre, page);
  if (!movies || movies.length === 0) {
    return res.status(404).json({ error: `No movies found for genre ${genre}, page ${page}` });
  }

  res.json({ genre, page, results: movies });
});


router.get('/', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const movies = getAllMovies(page);

  if (!movies || movies.length === 0) {
    return res.status(404).json({
      status: 404,
      message: `No movies found for page ${page}`
    });
  }
  res.json({
    page,
    pageSize: 50,
    results: movies
  });
});


router.get('/:imdbId', (req, res) => {
  const imdbId = req.params.imdbId;
  const movie = getMovieDetails(imdbId);

  if (!movie) {
    return res.status(404).json({ error: 'Movie not found' });
  }
  res.json(movie);
});

module.exports = router;
