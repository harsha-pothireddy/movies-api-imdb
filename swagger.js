const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movies API",
      version: "1.0.0",
      description: "API documentation for IMDB Movies Microservice",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
      },
    ],
  },
  apis: ["./routes/v1/*.js"], //Add paths to files/folders as and when we add more.......
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
