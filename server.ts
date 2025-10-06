import express, { Application } from "express";
import { swaggerUi, specs } from "./swagger";
import moviesRoutesV1 from "./routes/v1/moviesRoutes";

const app: Application = express();
const port: number = 3000;

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// v1 routes
app.use("/api/v1/movies", moviesRoutesV1);

// Start server (skip if running in test mode)
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
  });
}

export default app;
