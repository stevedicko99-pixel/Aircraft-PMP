# 🚀 Quick Start Guide

Get the Aircraft Predictive Maintenance Platform running in **5 minutes**!

## Prerequisites

- Docker Desktop installed and running
- Python 3.10+ (for initial data generation)
- 8GB RAM minimum

## Step-by-Step Setup

### 1️⃣ Generate Training Data (2 minutes)

```bash
# Navigate to project
cd aeronautics-predictive-maintenance/ml-service

# Install Python dependencies
pip install pandas numpy scikit-learn

# Generate synthetic dataset (10,000 records)
python data_generator.py
```

**Expected Output:**
```
Generating sensor data...
Generated 10000 sensor records
Failure cases: 1000 (10.0%)
✓ Datasets saved successfully!
```

### 2️⃣ Train ML Model (2 minutes)

```bash
# Still in ml-service directory
python model_trainer.py
```

**Expected Output:**
```
Training Random Forest model...
Model training completed!
Accuracy: 87.5%
✓ MODEL MEETS REQUIREMENTS (>85% accuracy)
```

### 3️⃣ Start All Services (1 minute)

```bash
# Go back to root directory
cd ..

# Start with Docker Compose
docker-compose up -d
```

**Services Starting:**
- ✅ PostgreSQL Database (port 5432)
- ✅ ML Service (port 8000)
- ✅ Backend API (port 5000)
- ✅ Frontend Dashboard (port 3000)

### 4️⃣ Access the Application

Open your browser and navigate to:

🌐 **Dashboard**: http://localhost:3000

📚 **API Docs**: http://localhost:5000/api-docs

🤖 **ML Service**: http://localhost:8000/health

## Verify Installation

### Check All Services

```bash
# View running containers
docker-compose ps

# Check logs
docker-compose logs -f
```

### Test ML Prediction

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

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "prediction": "failure",
    "confidence": 92.5,
    "alert_level": "critical",
    "days_to_failure": 7,
    "recommendation": "CRITICAL: Schedule immediate inspection..."
  }
}
```

### Test Backend API

```bash
# Health check
curl http://localhost:5000/health

# Get aircraft list
curl http://localhost:5000/api/aircraft
```

## What's Next?

### 1. Explore the Dashboard
- View real-time fleet metrics
- Monitor component health
- Review active alerts
- Analyze economic impact

### 2. Test Predictions
- Submit sensor data via API
- Watch real-time alerts
- Review prediction history

### 3. Generate Reports
- Export PDF reports
- Analyze cost savings
- Review maintenance history

## Common Commands

```bash
# Stop all services
docker-compose down

# Restart services
docker-compose restart

# View logs for specific service
docker-compose logs -f backend
docker-compose logs -f ml-service
docker-compose logs -f frontend

# Rebuild after code changes
docker-compose build
docker-compose up -d
```

## Troubleshooting

### Port Already in Use
```bash
# Change ports in docker-compose.yml
# Or stop conflicting services
```

### ML Model Not Found
```bash
# Retrain the model
cd ml-service
python model_trainer.py
```

### Database Connection Error
```bash
# Restart PostgreSQL
docker-compose restart postgres

# Check database logs
docker-compose logs postgres
```

### Frontend Not Loading
```bash
# Check if backend is running
curl http://localhost:5000/health

# Restart frontend
docker-compose restart frontend
```

## Sample Data

The system generates:
- **10,000** sensor readings
- **500** maintenance events
- **50** failure scenarios
- **50** aircraft in fleet

## Key Features to Try

1. **Real-time Monitoring**
   - Live sensor data updates
   - WebSocket notifications
   - Health score tracking

2. **Predictive Alerts**
   - Critical failure warnings
   - Confidence scores >85%
   - Maintenance recommendations

3. **Economic Analysis**
   - Cost comparison (proactive vs reactive)
   - ROI calculations
   - Downtime impact

4. **Reporting**
   - PDF export
   - Historical analysis
   - Trend visualization

## Architecture Overview

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Frontend   │────▶│  Backend    │────▶│ ML Service  │
│  React      │◀────│  Node.js    │◀────│  Python     │
│  Port 3000  │     │  Port 5000  │     │  Port 8000  │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │ PostgreSQL  │
                    │  Port 5432  │
                    └─────────────┘
```

## Need Help?

- 📖 Full documentation: [INSTALLATION.md](docs/INSTALLATION.md)
- 🔧 API reference: http://localhost:5000/api-docs
- 📝 Check logs: `docker-compose logs -f`

## Stop the Application

```bash
# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

---

**🎉 Congratulations!** Your predictive maintenance platform is now running!

Start exploring the dashboard at http://localhost:3000
