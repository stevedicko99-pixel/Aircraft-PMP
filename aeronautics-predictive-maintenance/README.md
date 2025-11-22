# 🛩️ Aeronautics Predictive Maintenance Platform

> AI-powered predictive maintenance system for aircraft fleet management to prevent costly AOG (Aircraft On Ground) situations.

## 🎯 Overview

This application uses machine learning to predict critical component failures before they occur, helping airlines save millions in unplanned downtime. The system monitors real-time sensor data from aircraft components and provides intelligent alerts with economic impact analysis.

## ✨ Key Features

- **Real-time Fleet Monitoring**: Live dashboard with fleet availability metrics
- **Predictive Analytics**: ML-powered failure prediction with >85% confidence
- **Component Health Tracking**: Monitor engines, landing gear, and hydraulic systems
- **Intelligent Alerts**: Prioritized alerts (Critical, High, Medium)
- **Economic Impact Simulation**: Compare proactive vs reactive maintenance costs
- **Automated Reporting**: Generate and export PDF reports
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark/Light Mode**: User preference support

## 🏗️ Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Frontend      │────▶│   Backend API   │────▶│   ML Service    │
│  React + TS     │◀────│  Node.js + WS   │◀────│  Python + ML    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                               │
                               ▼
                        ┌─────────────────┐
                        │   PostgreSQL    │
                        │    Database     │
                        └─────────────────┘
```

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Chart.js / Recharts** for data visualization
- **Socket.io Client** for real-time updates
- **jsPDF** for report generation

### Backend
- **Node.js** with Express
- **Socket.io** for WebSocket communication
- **Sequelize ORM** for database management
- **Swagger** for API documentation
- **JWT** for authentication

### ML Service
- **Python 3.10+**
- **Scikit-learn** for Random Forest model
- **Flask** for ML API
- **Pandas** for data processing
- **NumPy** for numerical operations

### Database
- **PostgreSQL 15+**

### DevOps
- **Docker** & Docker Compose
- **AWS/Azure** ready deployment

## 📊 Dataset

The system uses a synthetic dataset with:
- **10,000** sensor readings (vibrations, temperature, pressure, wear)
- **500** maintenance events
- **50** failure scenarios with precursors
- **50** aircraft IDs
- **3** component types (engines, landing_gear, hydraulic_systems)

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local development)
- Python 3.10+ (for local development)
- PostgreSQL 15+ (for local development)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd aeronautics-predictive-maintenance
```

2. **Start with Docker** (Recommended)
```bash
docker-compose up -d
```

3. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- ML Service: http://localhost:8000
- API Documentation: http://localhost:5000/api-docs

### Local Development Setup

See [INSTALLATION.md](docs/INSTALLATION.md) for detailed setup instructions.

## 📁 Project Structure

```
aeronautics-predictive-maintenance/
├── frontend/              # React TypeScript application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   ├── hooks/        # Custom hooks
│   │   └── utils/        # Utility functions
│   └── package.json
├── backend/              # Node.js Express API
│   ├── src/
│   │   ├── routes/       # API routes
│   │   ├── controllers/  # Business logic
│   │   ├── models/       # Database models
│   │   ├── services/     # Services
│   │   └── middleware/   # Middleware
│   └── package.json
├── ml-service/           # Python ML service
│   ├── data_generator.py # Dataset generation
│   ├── model_trainer.py  # ML model training
│   ├── predictor.py      # Prediction service
│   ├── api.py           # Flask API
│   └── requirements.txt
├── database/             # Database schemas
│   ├── migrations/       # Migration scripts
│   └── seeds/           # Seed data
├── docker/              # Docker configurations
│   ├── docker-compose.yml
│   └── Dockerfiles
├── docs/                # Documentation
│   ├── INSTALLATION.md
│   ├── API_DOCUMENTATION.md
│   ├── ARCHITECTURE.md
│   └── USER_GUIDE.md
└── data/                # Generated datasets
```

## 📖 Documentation

- [Installation Guide](docs/INSTALLATION.md)
- [API Documentation](docs/API_DOCUMENTATION.md)
- [Architecture Overview](docs/ARCHITECTURE.md)
- [User Guide](docs/USER_GUIDE.md)

## 🔌 API Endpoints

### Aircraft Management
- `GET /api/aircraft` - List all aircraft
- `GET /api/aircraft/:id` - Get aircraft details
- `GET /api/aircraft/:id/health` - Get health status

### Sensor Data
- `POST /api/sensors/data` - Submit sensor readings
- `GET /api/sensors/:aircraftId` - Get sensor history

### Predictions
- `GET /api/predictions` - Get all predictions
- `GET /api/predictions/:aircraftId` - Get aircraft predictions
- `POST /api/predictions/analyze` - Analyze sensor data

### Alerts
- `GET /api/alerts` - Get all alerts
- `GET /api/alerts/critical` - Get critical alerts
- `PUT /api/alerts/:id/acknowledge` - Acknowledge alert

### Reports
- `GET /api/reports/export` - Generate PDF report
- `GET /api/reports/economic-impact` - Get cost analysis

### WebSocket Events
- `sensor:update` - Real-time sensor data
- `alert:new` - New alert notification
- `prediction:update` - Prediction update

## 🧪 ML Model Details

### Algorithm
- **Random Forest Classifier**
- **Features**: 20+ engineered features from sensor data
- **Target**: Binary classification (failure/no_failure)
- **Confidence Threshold**: 85%

### Performance Metrics
- Accuracy: >85%
- Precision: >80%
- Recall: >75%
- F1-Score: >77%

### Training Data
- Training Set: 80% (8,000 records)
- Test Set: 20% (2,000 records)
- Cross-validation: 5-fold

## 🎨 UI Features

- **Dashboard**: Real-time metrics and KPIs
- **Fleet Overview**: Visual fleet status
- **Component Trends**: Interactive degradation charts
- **Alert Panel**: Prioritized alert management
- **Economic Simulator**: Cost-benefit analysis
- **Report Generator**: Automated PDF reports
- **Dark/Light Mode**: Theme toggle
- **Responsive**: Mobile-friendly design

## 🔒 Security

- JWT-based authentication
- Role-based access control (RBAC)
- API rate limiting
- Input validation and sanitization
- HTTPS encryption (production)

## 🌐 Deployment

### Docker Deployment
```bash
docker-compose up -d
```

### AWS Deployment
See [docs/DEPLOYMENT_AWS.md](docs/DEPLOYMENT_AWS.md)

### Azure Deployment
See [docs/DEPLOYMENT_AZURE.md](docs/DEPLOYMENT_AZURE.md)

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines.

## 📄 License

MIT License - see LICENSE file for details

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Aeronautics industry standards
- Open-source ML community
- React and Node.js communities

## 📞 Support

For support, email support@example.com or open an issue.

---

**Built with ❤️ for safer skies**
