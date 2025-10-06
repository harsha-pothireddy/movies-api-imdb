const express = require('express');
const { swaggerUi, specs } = require("./swagger");

const app = express();
const port = 3000;



app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// v1 routes
const moviesRoutesV1 = require('./routes/v1/moviesRoutes');
app.use('/api/v1/movies', moviesRoutesV1);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
});
