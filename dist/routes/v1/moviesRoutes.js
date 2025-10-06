"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moviesService_1 = require("../../services/moviesService");
const router = express_1.default.Router();
// Health check
router.get("/health", (_req, res) => {
    res.json({ status: "ok", apiVersion: "v1" });
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
 *       400:
 *         description: Invalid year parameter
 *       404:
 *         description: No movies found for the given year
 */
router.get("/year/:year", (req, res) => {
    const year = parseInt(req.params.year, 10);
    const page = parseInt(req.query.page) || 1;
    if (isNaN(year) || year < 1800) {
        return res.status(400).json({ error: "Invalid year parameter" });
    }
    const movies = (0, moviesService_1.getMoviesByYear)(year, page);
    if (!movies || movies.length === 0) {
        return res
            .status(404)
            .json({ error: `No movies found for year ${year}, page ${page}` });
    }
    res.json({ year, page, results: movies });
});
// Movies by Genre
router.get("/genre/:genre", (req, res) => {
    const genre = req.params.genre;
    const page = parseInt(req.query.page) || 1;
    if (!genre) {
        return res.status(400).json({ error: "Invalid genre parameter" });
    }
    const movies = (0, moviesService_1.getMoviesByGenre)(genre, page);
    if (!movies || movies.length === 0) {
        return res
            .status(404)
            .json({ error: `No movies found for genre ${genre}, page ${page}` });
    }
    res.json({ genre, page, results: movies });
});
// All Movies
router.get("/", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const movies = (0, moviesService_1.getAllMovies)(page);
    if (!movies || movies.length === 0) {
        return res.status(404).json({
            status: 404,
            message: `No movies found for page ${page}`,
        });
    }
    res.json({
        page,
        pageSize: 50,
        results: movies,
    });
});
// Movie details by IMDb ID
router.get("/:imdbId", (req, res) => {
    const imdbId = req.params.imdbId;
    const movie = (0, moviesService_1.getMovieDetails)(imdbId);
    if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
    }
    res.json(movie);
});
exports.default = router;
