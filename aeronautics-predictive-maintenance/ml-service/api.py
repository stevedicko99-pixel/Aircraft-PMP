"""
Flask API for ML Prediction Service
Provides REST endpoints for aircraft maintenance predictions
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from predictor import MaintenancePredictor
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Initialize predictor
predictor = MaintenancePredictor()

# Load model on startup
@app.before_first_request
def load_model():
    """Load ML model before first request"""
    success = predictor.load_model()
    if not success:
        print("WARNING: Model not loaded. Please train the model first.")

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'ML Prediction Service',
        'timestamp': datetime.now().isoformat(),
        'model_loaded': predictor.model is not None
    })

@app.route('/api/model/info', methods=['GET'])
def get_model_info():
    """Get model information"""
    try:
        info = predictor.get_model_info()
        if info is None:
            return jsonify({'error': 'Model not loaded'}), 503
        
        return jsonify({
            'success': True,
            'data': info
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/predict', methods=['POST'])
def predict():
    """
    Make prediction on sensor data
    
    Expected JSON body:
    {
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
    }
    """
    try:
        if predictor.model is None:
            return jsonify({'error': 'Model not loaded'}), 503
        
        # Get sensor data from request
        sensor_data = request.get_json()
        
        if not sensor_data:
            return jsonify({'error': 'No data provided'}), 400
        
        # Validate required fields
        required_fields = [
            'aircraft_id', 'component_type', 'vibration_level', 
            'temperature', 'pressure', 'wear_level', 'oil_quality',
            'rpm', 'fuel_flow', 'health_score', 'operating_hours', 'cycles'
        ]
        
        missing_fields = [field for field in required_fields if field not in sensor_data]
        if missing_fields:
            return jsonify({
                'error': 'Missing required fields',
                'missing_fields': missing_fields
            }), 400
        
        # Make prediction
        result = predictor.predict(sensor_data)
        
        return jsonify({
            'success': True,
            'data': result
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/predict/batch', methods=['POST'])
def predict_batch():
    """
    Make predictions on multiple sensor readings
    
    Expected JSON body:
    {
        "data": [
            {sensor_data_1},
            {sensor_data_2},
            ...
        ]
    }
    """
    try:
        if predictor.model is None:
            return jsonify({'error': 'Model not loaded'}), 503
        
        # Get data from request
        request_data = request.get_json()
        
        if not request_data or 'data' not in request_data:
            return jsonify({'error': 'No data provided'}), 400
        
        sensor_data_list = request_data['data']
        
        if not isinstance(sensor_data_list, list):
            return jsonify({'error': 'Data must be a list'}), 400
        
        # Make predictions
        results = predictor.predict_batch(sensor_data_list)
        
        # Count predictions by type
        summary = {
            'total': len(results),
            'failures_predicted': sum(1 for r in results if r.get('prediction') == 'failure'),
            'critical_alerts': sum(1 for r in results if r.get('alert_level') == 'critical'),
            'high_alerts': sum(1 for r in results if r.get('alert_level') == 'high'),
            'medium_alerts': sum(1 for r in results if r.get('alert_level') == 'medium')
        }
        
        return jsonify({
            'success': True,
            'summary': summary,
            'data': results
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/analyze', methods=['POST'])
def analyze_component():
    """
    Analyze component health and provide detailed insights
    
    Expected JSON body: Same as /api/predict
    """
    try:
        if predictor.model is None:
            return jsonify({'error': 'Model not loaded'}), 503
        
        sensor_data = request.get_json()
        
        if not sensor_data:
            return jsonify({'error': 'No data provided'}), 400
        
        # Make prediction
        result = predictor.predict(sensor_data)
        
        # Add detailed analysis
        analysis = {
            'prediction': result,
            'health_assessment': _assess_health(sensor_data),
            'maintenance_priority': _calculate_priority(result),
            'cost_estimate': _estimate_costs(result, sensor_data),
            'historical_context': _get_historical_context(sensor_data)
        }
        
        return jsonify({
            'success': True,
            'data': analysis
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def _assess_health(sensor_data):
    """Assess component health"""
    health_score = sensor_data.get('health_score', 50)
    
    if health_score >= 80:
        status = 'excellent'
        description = 'Component is in excellent condition'
    elif health_score >= 60:
        status = 'good'
        description = 'Component is in good condition'
    elif health_score >= 40:
        status = 'fair'
        description = 'Component shows signs of wear'
    elif health_score >= 20:
        status = 'poor'
        description = 'Component requires attention'
    else:
        status = 'critical'
        description = 'Component is in critical condition'
    
    return {
        'status': status,
        'score': health_score,
        'description': description
    }

def _calculate_priority(result):
    """Calculate maintenance priority"""
    alert_level = result.get('alert_level', 'none')
    confidence = result.get('confidence', 0)
    days_to_failure = result.get('days_to_failure')
    
    if alert_level == 'critical':
        priority = 1
        urgency = 'immediate'
    elif alert_level == 'high':
        priority = 2
        urgency = 'urgent'
    elif alert_level == 'medium':
        priority = 3
        urgency = 'scheduled'
    else:
        priority = 4
        urgency = 'routine'
    
    return {
        'priority': priority,
        'urgency': urgency,
        'confidence': confidence,
        'days_to_failure': days_to_failure
    }

def _estimate_costs(result, sensor_data):
    """Estimate maintenance costs"""
    component_type = sensor_data.get('component_type', 'unknown')
    alert_level = result.get('alert_level', 'none')
    
    # Base costs by component type
    base_costs = {
        'engine': 150000,
        'landing_gear': 80000,
        'hydraulic_system': 50000
    }
    
    base_cost = base_costs.get(component_type, 50000)
    
    # Adjust based on alert level
    if alert_level == 'critical':
        # Emergency maintenance costs more
        maintenance_cost = base_cost * 1.5
        downtime_hours = 72
    elif alert_level == 'high':
        maintenance_cost = base_cost * 1.2
        downtime_hours = 48
    elif alert_level == 'medium':
        maintenance_cost = base_cost
        downtime_hours = 24
    else:
        maintenance_cost = base_cost * 0.3  # Preventive maintenance
        downtime_hours = 8
    
    # Calculate revenue loss (assuming $25,000 per hour)
    revenue_loss = downtime_hours * 25000
    
    # Total cost
    total_cost = maintenance_cost + revenue_loss
    
    # Savings from proactive maintenance
    reactive_cost = base_cost * 2.5 + (downtime_hours * 2) * 25000
    savings = reactive_cost - total_cost if result.get('prediction') == 'failure' else 0
    
    return {
        'maintenance_cost': round(maintenance_cost, 2),
        'downtime_hours': downtime_hours,
        'revenue_loss': round(revenue_loss, 2),
        'total_cost': round(total_cost, 2),
        'potential_savings': round(savings, 2) if savings > 0 else 0,
        'cost_breakdown': {
            'parts': round(maintenance_cost * 0.6, 2),
            'labor': round(maintenance_cost * 0.3, 2),
            'overhead': round(maintenance_cost * 0.1, 2)
        }
    }

def _get_historical_context(sensor_data):
    """Get historical context (placeholder)"""
    return {
        'similar_cases': 15,
        'average_resolution_time': '36 hours',
        'success_rate': 92.5,
        'common_issues': [
            'Bearing wear',
            'Seal degradation',
            'Lubrication issues'
        ]
    }

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    debug = os.environ.get('DEBUG', 'False').lower() == 'true'
    
    print("\n" + "="*60)
    print("ML PREDICTION SERVICE")
    print("="*60)
    print(f"Starting server on port {port}...")
    print(f"Debug mode: {debug}")
    print("\nAvailable endpoints:")
    print("  GET  /health              - Health check")
    print("  GET  /api/model/info      - Model information")
    print("  POST /api/predict         - Single prediction")
    print("  POST /api/predict/batch   - Batch predictions")
    print("  POST /api/analyze         - Detailed analysis")
    print("="*60 + "\n")
    
    app.run(host='0.0.0.0', port=port, debug=debug)
