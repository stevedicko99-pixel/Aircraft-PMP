"""
Real-time Prediction Service for Aircraft Maintenance
Loads trained model and makes predictions on new sensor data
"""

import joblib
import pandas as pd
import numpy as np
import json
import os
from datetime import datetime

class MaintenancePredictor:
    def __init__(self, model_dir='models'):
        self.model_dir = model_dir
        self.model = None
        self.scaler = None
        self.label_encoders = None
        self.metadata = None
        self.feature_names = []
        
    def load_model(self):
        """Load trained model and preprocessing objects"""
        try:
            # Load model
            model_file = os.path.join(self.model_dir, 'random_forest_model.pkl')
            self.model = joblib.load(model_file)
            print(f"✓ Model loaded from {model_file}")
            
            # Load scaler
            scaler_file = os.path.join(self.model_dir, 'scaler.pkl')
            self.scaler = joblib.load(scaler_file)
            print(f"✓ Scaler loaded from {scaler_file}")
            
            # Load label encoders
            encoders_file = os.path.join(self.model_dir, 'label_encoders.pkl')
            self.label_encoders = joblib.load(encoders_file)
            print(f"✓ Label encoders loaded from {encoders_file}")
            
            # Load metadata
            metadata_file = os.path.join(self.model_dir, 'model_metadata.json')
            with open(metadata_file, 'r') as f:
                self.metadata = json.load(f)
            self.feature_names = self.metadata['feature_names']
            print(f"✓ Metadata loaded from {metadata_file}")
            
            print(f"\nModel Info:")
            print(f"  Type: {self.metadata['model_type']}")
            print(f"  Training Date: {self.metadata['training_date']}")
            print(f"  Accuracy: {self.metadata['metrics']['accuracy']*100:.2f}%")
            print(f"  Precision: {self.metadata['metrics']['precision']*100:.2f}%")
            
            return True
            
        except Exception as e:
            print(f"✗ Error loading model: {str(e)}")
            return False
    
    def engineer_features(self, data):
        """
        Apply same feature engineering as training
        """
        df = pd.DataFrame([data]) if isinstance(data, dict) else data.copy()
        
        # Encode component type
        if 'component_type' in df.columns:
            df['component_type_encoded'] = self.label_encoders['component_type'].transform(df['component_type'])
        
        # Create interaction features
        df['vibration_temp_ratio'] = df['vibration_level'] / (df['temperature'] + 1)
        df['pressure_wear_product'] = df['pressure'] * df['wear_level']
        df['health_wear_ratio'] = df['health_score'] / (df['wear_level'] + 1)
        
        # Create polynomial features
        df['vibration_squared'] = df['vibration_level'] ** 2
        df['temperature_squared'] = df['temperature'] ** 2
        df['wear_squared'] = df['wear_level'] ** 2
        
        # Create degradation indicators
        df['critical_vibration'] = (df['vibration_level'] > 6.0).astype(int)
        df['critical_temperature'] = (df['temperature'] > 600).astype(int)
        df['critical_wear'] = (df['wear_level'] > 75).astype(int)
        df['low_oil_quality'] = (df['oil_quality'] < 80).astype(int)
        
        # Aggregate risk score
        df['risk_score'] = (
            df['critical_vibration'] * 0.3 +
            df['critical_temperature'] * 0.25 +
            df['critical_wear'] * 0.25 +
            df['low_oil_quality'] * 0.2
        )
        
        # Operating condition features
        df['high_operating_hours'] = (df['operating_hours'] > 7500).astype(int)
        df['high_cycles'] = (df['cycles'] > 3750).astype(int)
        
        # Component-specific features
        df['engine_specific'] = ((df['component_type'] == 'engine') & (df['rpm'] > 0)).astype(int)
        
        return df
    
    def predict(self, sensor_data):
        """
        Make prediction on new sensor data
        
        Args:
            sensor_data: dict or DataFrame with sensor readings
            
        Returns:
            dict with prediction results
        """
        if self.model is None:
            raise ValueError("Model not loaded. Call load_model() first.")
        
        # Engineer features
        df = self.engineer_features(sensor_data)
        
        # Select features in correct order
        X = df[self.feature_names]
        
        # Scale features
        X_scaled = self.scaler.transform(X)
        
        # Make prediction
        prediction = self.model.predict(X_scaled)[0]
        prediction_proba = self.model.predict_proba(X_scaled)[0]
        
        # Get confidence score
        confidence = float(prediction_proba[1] if prediction == 1 else prediction_proba[0])
        
        # Determine alert level based on confidence
        if prediction == 1:
            if confidence >= 0.90:
                alert_level = 'critical'
            elif confidence >= 0.85:
                alert_level = 'high'
            else:
                alert_level = 'medium'
        else:
            alert_level = 'none'
        
        # Calculate time to failure estimate (if failure predicted)
        if prediction == 1:
            # Estimate based on health score and risk factors
            health_score = sensor_data.get('health_score', 50)
            risk_score = df['risk_score'].values[0]
            
            # Simple heuristic: lower health and higher risk = sooner failure
            days_to_failure = int(30 * (health_score / 100) * (1 - risk_score))
            days_to_failure = max(1, min(30, days_to_failure))
        else:
            days_to_failure = None
        
        # Get feature contributions (top 5)
        feature_importance = self.metadata['feature_importance'][:5]
        feature_values = {feat['feature']: float(X[feat['feature']].values[0]) 
                         for feat in feature_importance}
        
        result = {
            'prediction': 'failure' if prediction == 1 else 'no_failure',
            'confidence': round(confidence * 100, 2),
            'alert_level': alert_level,
            'days_to_failure': days_to_failure,
            'health_score': sensor_data.get('health_score', 0),
            'risk_score': round(float(df['risk_score'].values[0]) * 100, 2),
            'timestamp': datetime.now().isoformat(),
            'aircraft_id': sensor_data.get('aircraft_id', 'unknown'),
            'component_type': sensor_data.get('component_type', 'unknown'),
            'top_risk_factors': self._identify_risk_factors(sensor_data, df),
            'feature_contributions': feature_values,
            'recommendation': self._generate_recommendation(prediction, confidence, alert_level, days_to_failure)
        }
        
        return result
    
    def _identify_risk_factors(self, sensor_data, df):
        """Identify top risk factors"""
        risk_factors = []
        
        if df['critical_vibration'].values[0] == 1:
            risk_factors.append({
                'factor': 'High Vibration',
                'value': sensor_data['vibration_level'],
                'severity': 'high'
            })
        
        if df['critical_temperature'].values[0] == 1:
            risk_factors.append({
                'factor': 'High Temperature',
                'value': sensor_data['temperature'],
                'severity': 'high'
            })
        
        if df['critical_wear'].values[0] == 1:
            risk_factors.append({
                'factor': 'Excessive Wear',
                'value': sensor_data['wear_level'],
                'severity': 'high'
            })
        
        if df['low_oil_quality'].values[0] == 1:
            risk_factors.append({
                'factor': 'Low Oil Quality',
                'value': sensor_data['oil_quality'],
                'severity': 'medium'
            })
        
        if df['high_operating_hours'].values[0] == 1:
            risk_factors.append({
                'factor': 'High Operating Hours',
                'value': sensor_data['operating_hours'],
                'severity': 'medium'
            })
        
        return risk_factors[:3]  # Return top 3
    
    def _generate_recommendation(self, prediction, confidence, alert_level, days_to_failure):
        """Generate maintenance recommendation"""
        if prediction == 0:
            return "Component is operating normally. Continue routine monitoring."
        
        if alert_level == 'critical':
            return f"CRITICAL: Schedule immediate inspection. Predicted failure within {days_to_failure} days. Consider grounding aircraft for maintenance."
        elif alert_level == 'high':
            return f"HIGH PRIORITY: Schedule maintenance within {days_to_failure} days. Monitor closely for deterioration."
        else:
            return f"MEDIUM PRIORITY: Plan maintenance within {days_to_failure} days. Increase monitoring frequency."
    
    def predict_batch(self, sensor_data_list):
        """
        Make predictions on multiple sensor readings
        
        Args:
            sensor_data_list: list of dicts with sensor readings
            
        Returns:
            list of prediction results
        """
        results = []
        for sensor_data in sensor_data_list:
            try:
                result = self.predict(sensor_data)
                results.append(result)
            except Exception as e:
                results.append({
                    'error': str(e),
                    'aircraft_id': sensor_data.get('aircraft_id', 'unknown')
                })
        
        return results
    
    def get_model_info(self):
        """Get model information"""
        if self.metadata is None:
            return None
        
        return {
            'model_type': self.metadata['model_type'],
            'training_date': self.metadata['training_date'],
            'metrics': self.metadata['metrics'],
            'n_features': self.metadata['n_features']
        }


# Example usage
if __name__ == "__main__":
    # Initialize predictor
    predictor = MaintenancePredictor()
    
    # Load model
    if predictor.load_model():
        # Example sensor data
        test_data = {
            'aircraft_id': 'AC001',
            'component_type': 'engine',
            'vibration_level': 8.5,
            'temperature': 750,
            'pressure': 35,
            'wear_level': 85,
            'oil_quality': 65,
            'rpm': 4500,
            'fuel_flow': 1200,
            'health_score': 45,
            'operating_hours': 8500,
            'cycles': 4200
        }
        
        print("\n" + "="*60)
        print("PREDICTION TEST")
        print("="*60)
        print(f"\nInput Data:")
        for key, value in test_data.items():
            print(f"  {key}: {value}")
        
        # Make prediction
        result = predictor.predict(test_data)
        
        print(f"\nPrediction Results:")
        print(f"  Prediction: {result['prediction']}")
        print(f"  Confidence: {result['confidence']}%")
        print(f"  Alert Level: {result['alert_level']}")
        print(f"  Days to Failure: {result['days_to_failure']}")
        print(f"  Health Score: {result['health_score']}")
        print(f"  Risk Score: {result['risk_score']}%")
        
        print(f"\nTop Risk Factors:")
        for factor in result['top_risk_factors']:
            print(f"  - {factor['factor']}: {factor['value']} ({factor['severity']})")
        
        print(f"\nRecommendation:")
        print(f"  {result['recommendation']}")
        print("="*60)
