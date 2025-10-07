import request from "supertest";
import express, { Application } from "express";
import moviesRoutes from "../routes/v1/moviesRoutes";  // <-- your TS route file

const app: Application = express();
app.use(express.json());
app.use("/api/v1/movies", moviesRoutes);

describe("IMDB Movies API Test Suite", () => {
  // ----------------- HEALTH -----------------
  it("TEST 1 : Should return health check", async () => {
    const res = await request(app).get("/api/v1/movies/health");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("status", "ok");
    expect(res.body).toHaveProperty("apiVersion", "v1");
  });

  // ----------------- YEAR -----------------
  it("TEST 2 : Should return movies for a valid year", async () => {
    const res = await request(app).get("/api/v1/movies/year/2020?page=1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("results");
    expect(res.body.results).toBeInstanceOf(Array);
    expect(res.body.results.length).toBeGreaterThan(0);

    res.body.results.forEach((movie: any) => {
      expect(movie).toHaveProperty("title");
    });
  });

  it("TEST 3: Should return 400 for invalid year", async () => {
  const res = await request(app).get("/api/v1/movies/year/abcd");
  expect(res.statusCode).toBe(400);
  expect(res.body).toHaveProperty("error", "Invalid year. Must be between 1800 and 2100");
});

 it("TEST 4: Should return 404 for year with no movies", async () => {
  const res = await request(app).get("/api/v1/movies/year/1800");
  expect(res.statusCode).toBe(404);
  expect(res.body).toHaveProperty(
    "error",
    "No movies found for year 1800 on page 1"
  );
});

  // ----------------- GENRE -----------------
  it("TEST 5 : Should return movies for a valid genre", async () => {
    const res = await request(app).get("/api/v1/movies/genre/Action");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("results");
    expect(res.body.results).toBeInstanceOf(Array);
    expect(res.body.results.length).toBeGreaterThan(0);

    res.body.results.forEach((movie: any) => {
      expect(movie).toHaveProperty("title");
    });
  });

it("TEST 6: Should return 404 for genre with no movies", async () => {
  const res = await request(app).get("/api/v1/movies/genre/UnknownGenre");
  expect(res.statusCode).toBe(404);
  expect(res.body).toHaveProperty(
    "error",
    "No movies found for genre \"UnknownGenre\" on page 1"
  );
});

  // ----------------- PAGINATION -----------------
  it("TEST 7 : Should return paginated movies", async () => {
    const res = await request(app).get("/api/v1/movies?page=1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("results");
    expect(res.body.results).toBeInstanceOf(Array);
    expect(res.body.results.length).toBeGreaterThan(0);

    res.body.results.forEach((movie: any) => {
      expect(movie).toHaveProperty("title");
    });
  });

 it("TEST 8: Should return 404 for page with no movies", async () => {
  const res = await request(app).get("/api/v1/movies?page=9999");
  expect(res.statusCode).toBe(404);
  expect(res.body).toHaveProperty("error", "No movies found for page 9999");  
});

  // ----------------- MOVIE DETAILS -----------------
  it("TEST 9 : Should return movie details for a valid imdbId", async () => {
    const res = await request(app).get("/api/v1/movies/tt0111161"); // Shawshank Redemption
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("title", "The Shawshank Redemption");
    expect(res.body).toHaveProperty("imdbId", "tt0111161");
    expect(res.body).toHaveProperty("averageRating");
  });

  it("TEST 10a: Should return 400 for invalid IMDb ID format", async () => {
  const res = await request(app).get("/api/v1/movies/invalidImdbId");
  expect(res.statusCode).toBe(400);
  expect(res.body).toHaveProperty("error", "Invalid IMDb ID format. Expected format: tt1234567");
});

it("TEST 10b: Should return 404 for non-existent movie", async () => {
  const res = await request(app).get("/api/v1/movies/tt9999999");  // ← Valid format, doesn't exist
  expect(res.statusCode).toBe(404);
  expect(res.body).toHaveProperty("error", "Movie not found");
});

});
