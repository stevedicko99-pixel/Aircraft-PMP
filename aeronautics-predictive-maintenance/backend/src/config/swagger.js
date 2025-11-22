/**
 * Swagger Configuration
 * API documentation setup
 */

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Aircraft Predictive Maintenance API',
      version: '1.0.0',
      description: 'REST API for aircraft predictive maintenance system with ML-powered failure prediction',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    tags: [
      { name: 'Aircraft', description: 'Aircraft management endpoints' },
      { name: 'Sensors', description: 'Sensor data endpoints' },
      { name: 'Predictions', description: 'ML prediction endpoints' },
      { name: 'Maintenance', description: 'Maintenance management endpoints' },
      { name: 'Alerts', description: 'Alert management endpoints' },
      { name: 'Reports', description: 'Report generation endpoints' }
    ]
  },
  apis: ['./src/routes/*.js']
};

const specs = swaggerJsdoc(options);

const swaggerSetup = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Aircraft Maintenance API Docs'
  }));
};

module.exports = swaggerSetup;
