# Movies API (TypeScript + Express + SQLite)

A Node.js + Express microservice written in TypeScript that provides movie data from a SQLite database.  
Supports pagination, filtering by year and genre, fetching movie details by IMDb ID, and includes Swagger API documentation.

---

## Prerequisites

- Node.js (v18 or later recommended)
- npm
- SQLite installed locally
- `movies.db` and `ratings.db` should be placed in the `db/` folder (project root)

---

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/harsha-pothireddy/movies-api-imdb.git
cd movies-api-imdb
npm install
```

## Compile and Run the Project

### 1. Compile TypeScript
```bash
npm run build
```

### 2. Start Server
```bash
npm start
```

### 3. Open Localhost And Test
```bash
Server will run at:
http://localhost:3000

Swagger UI will be available at:
http://localhost:3000/api-docs
```

### 4. Different Endpoints Created

```bash
GET /api/v1/movies/health
GET /api/v1/movies?page=1
GET /api/v1/movies/year/{year}?page=1
GET /api/v1/movies/genre/{genre}?page=1
GET /api/v1/movies/{imdbId}
```




