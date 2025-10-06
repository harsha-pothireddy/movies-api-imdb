import swaggerJsdoc, { Options } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Swagger options
const options: Options = {
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
  apis: ["./routes/v1/*.ts"],
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
