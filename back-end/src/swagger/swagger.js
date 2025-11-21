const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Task Tracker API",
            version: "1.0.0",
            description: "API documentation for the Primetrade.ai assignment Task Tracker application"
        },

        // ⭐ ADD THIS BLOCK HERE ⭐
        components: {
            securitySchemes: {
                cookieAuth: {
                    type: "apiKey",
                    in: "cookie",
                    name: "jwt",
                },
            },
        },

        // ⭐ Global security for all endpoints ⭐
        security: [
            {
                cookieAuth: [],
            },
        ],

        servers: [
            {
                url: "http://localhost:8000",
            },
        ],
    },

    // Make sure Swagger reads routes correctly
    apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };
