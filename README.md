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

