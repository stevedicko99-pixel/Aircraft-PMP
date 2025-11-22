# Installation Guide

Complete guide to set up and run the Aircraft Predictive Maintenance Platform.

## Prerequisites

### Required Software
- **Docker** (v20.10+) and **Docker Compose** (v2.0+)
- **Node.js** (v18+) - for local development
- **Python** (v3.10+) - for local development
- **PostgreSQL** (v15+) - for local development
- **Git**

### System Requirements
- **RAM**: Minimum 8GB (16GB recommended)
- **Storage**: 10GB free space
- **OS**: Windows 10/11, macOS 10.15+, or Linux

## Quick Start with Docker (Recommended)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd aeronautics-predictive-maintenance
```

### 2. Generate Dataset and Train ML Model
```bash
# Navigate to ML service
cd ml-service

# Install Python dependencies
pip install -r requirements.txt

# Generate synthetic dataset
python data_generator.py

# Train the ML model
python model_trainer.py

# Go back to root
cd ..
```

### 3. Start All Services with Docker
```bash
# Build and start all containers
docker-compose up -d

# View logs
docker-compose logs -f

# Check service status
docker-compose ps
```

### 4. Access the Application
- **Frontend Dashboard**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api-docs
- **ML Service**: http://localhost:8000

### 5. Stop Services
```bash
docker-compose down

# To remove volumes as well
docker-compose down -v
```

## Local Development Setup

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Start PostgreSQL**
```bash
# Using Docker
docker run -d \
  --name postgres \
  -e POSTGRES_DB=aircraft_maintenance \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  postgres:15-alpine
```

5. **Run backend**
```bash
npm run dev
```

### ML Service Setup

1. **Navigate to ML service directory**
```bash
cd ml-service
```

2. **Create virtual environment**
```bash
python -m venv venv

# Activate virtual environment
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Generate data and train model**
```bash
# Generate dataset
python data_generator.py

# Train model
python model_trainer.py
```

5. **Run ML service**
```bash
python api.py
```

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000" > .env
echo "REACT_APP_WS_URL=http://localhost:5000" >> .env
```

4. **Run frontend**
```bash
npm start
```

## Database Setup

### Initialize Database Schema

The backend automatically creates tables on first run. To manually initialize:

```bash
cd backend
node -e "require('./src/config/database').sequelize.sync({ force: true })"
```

### Seed Sample Data

```bash
# Run seed script (if available)
npm run seed
```

## Verification

### 1. Check Backend Health
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "healthy",
  "service": "Aircraft Maintenance Backend API",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 2. Check ML Service
```bash
curl http://localhost:8000/health
```

### 3. Test ML Prediction
```bash
curl -X POST http://localhost:8000/api/predict \
  -H "Content-Type: application/json" \
  -d '{
    "aircraft_id": "AC001",
    "component_type": "engine",
    "vibration_level": 8.5,
    "temperature": 750,
    "pressure": 35,
    "wear_level": 85,
    "oil_quality": 65,
    "rpm": 4500,
    "fuel_flow": 1200,
    "health_score": 45,
    "operating_hours": 8500,
    "cycles": 4200
  }'
```

## Troubleshooting

### Port Already in Use
```bash
# Check what's using the port
# Windows
netstat -ano | findstr :5000

# macOS/Linux
lsof -i :5000

# Kill the process or change port in .env
```

### Docker Issues
```bash
# Remove all containers and volumes
docker-compose down -v

# Rebuild containers
docker-compose build --no-cache

# Start fresh
docker-compose up -d
```

### Database Connection Issues
```bash
# Check PostgreSQL is running
docker ps | grep postgres

# Check connection
psql -h localhost -U postgres -d aircraft_maintenance
```

### ML Model Not Found
```bash
# Ensure model is trained
cd ml-service
python model_trainer.py

# Check if model files exist
ls -la models/
```

### Frontend Build Issues
```bash
cd frontend

# Clear cache
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Clear build cache
npm run build
```

## Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=aircraft_maintenance
DB_USER=postgres
DB_PASSWORD=postgres
ML_SERVICE_URL=http://localhost:8000
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_WS_URL=http://localhost:5000
```

### ML Service
```env
PORT=8000
DEBUG=False
```

## Production Deployment

### Build for Production
```bash
# Build all services
docker-compose -f docker-compose.prod.yml build

# Start in production mode
docker-compose -f docker-compose.prod.yml up -d
```

### Security Checklist
- [ ] Change all default passwords
- [ ] Set strong JWT_SECRET
- [ ] Enable HTTPS
- [ ] Configure firewall rules
- [ ] Set up monitoring
- [ ] Enable database backups
- [ ] Configure rate limiting
- [ ] Review CORS settings

## Updating

### Pull Latest Changes
```bash
git pull origin main
```

### Update Dependencies
```bash
# Backend
cd backend && npm install

# Frontend
cd frontend && npm install

# ML Service
cd ml-service && pip install -r requirements.txt
```

### Rebuild Docker Images
```bash
docker-compose build
docker-compose up -d
```

## Support

For issues and questions:
- Check the [API Documentation](http://localhost:5000/api-docs)
- Review logs: `docker-compose logs -f`
- Open an issue on GitHub

## Next Steps

After installation:
1. Explore the dashboard at http://localhost:3000
2. Review API documentation at http://localhost:5000/api-docs
3. Test predictions with sample data
4. Configure alerts and notifications
5. Set up automated maintenance scheduling
