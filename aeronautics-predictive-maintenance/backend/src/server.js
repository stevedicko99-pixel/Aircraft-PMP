/**
 * Main Server File
 * Express server with Socket.io for real-time updates
 */

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const { sequelize } = require('./config/database');
const logger = require('./utils/logger');
const swaggerSetup = require('./config/swagger');

// Import routes
const aircraftRoutes = require('./routes/aircraft.routes');
const sensorRoutes = require('./routes/sensor.routes');
const predictionRoutes = require('./routes/prediction.routes');
const maintenanceRoutes = require('./routes/maintenance.routes');
const alertRoutes = require('./routes/alert.routes');
const reportRoutes = require('./routes/report.routes');

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Initialize Socket.io
const io = socketIo(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST']
  },
  pingTimeout: parseInt(process.env.SOCKET_PING_TIMEOUT) || 60000,
  pingInterval: parseInt(process.env.SOCKET_PING_INTERVAL) || 25000
});

// Make io accessible to routes
app.set('io', io);

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Aircraft Maintenance Backend API',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: sequelize.authenticate() ? 'connected' : 'disconnected'
  });
});

// API Routes
app.use('/api/aircraft', aircraftRoutes);
app.use('/api/sensors', sensorRoutes);
app.use('/api/predictions', predictionRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/reports', reportRoutes);

// Swagger documentation
swaggerSetup(app);

// Socket.io connection handling
io.on('connection', (socket) => {
  logger.info(`Client connected: ${socket.id}`);
  
  socket.on('subscribe:aircraft', (aircraftId) => {
    socket.join(`aircraft:${aircraftId}`);
    logger.info(`Client ${socket.id} subscribed to aircraft ${aircraftId}`);
  });
  
  socket.on('unsubscribe:aircraft', (aircraftId) => {
    socket.leave(`aircraft:${aircraftId}`);
    logger.info(`Client ${socket.id} unsubscribed from aircraft ${aircraftId}`);
  });
  
  socket.on('disconnect', () => {
    logger.info(`Client disconnected: ${socket.id}`);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`, { stack: err.stack });
  
  res.status(err.status || 500).json({
    success: false,
    error: {
      message: err.message || 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: 'Route not found'
    }
  });
});

// Database connection and server start
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    logger.info('Database connection established successfully');
    
    // Sync database models (use { force: false } in production)
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      logger.info('Database models synchronized');
    }
    
    // Start server
    server.listen(PORT, HOST, () => {
      logger.info('='.repeat(60));
      logger.info('AIRCRAFT PREDICTIVE MAINTENANCE - BACKEND API');
      logger.info('='.repeat(60));
      logger.info(`Server running on http://${HOST}:${PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
      logger.info(`API Documentation: http://${HOST}:${PORT}/api-docs`);
      logger.info(`Socket.io enabled for real-time updates`);
      logger.info('='.repeat(60));
    });
    
  } catch (error) {
    logger.error('Unable to start server:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  server.close(async () => {
    logger.info('HTTP server closed');
    await sequelize.close();
    logger.info('Database connection closed');
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  logger.info('SIGINT signal received: closing HTTP server');
  server.close(async () => {
    logger.info('HTTP server closed');
    await sequelize.close();
    logger.info('Database connection closed');
    process.exit(0);
  });
});

// Start the server
startServer();

module.exports = { app, server, io };
