"""
ML Model Trainer for Aircraft Predictive Maintenance
Trains Random Forest classifier to predict component failures
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import (
    classification_report, 
    confusion_matrix, 
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
    roc_curve
)
import joblib
import json
import os
from datetime import datetime

class AircraftMaintenanceModel:
    def __init__(self):
        self.model = None
        self.scaler = StandardScaler()
        self.label_encoders = {}
        self.feature_names = []
        self.model_metadata = {}
        
    def load_data(self, data_path='../data/sensor_data.csv'):
        """Load sensor data"""
        print(f"Loading data from {data_path}...")
        df = pd.read_csv(data_path)
        print(f"Loaded {len(df)} records")
        return df
    
    def engineer_features(self, df):
        """
        Create engineered features from raw sensor data
        """
        print("Engineering features...")
        
        df = df.copy()
        
        # Encode categorical variables
        if 'component_type' not in self.label_encoders:
            self.label_encoders['component_type'] = LabelEncoder()
            df['component_type_encoded'] = self.label_encoders['component_type'].fit_transform(df['component_type'])
        else:
            df['component_type_encoded'] = self.label_encoders['component_type'].transform(df['component_type'])
        
        # Create interaction features
        df['vibration_temp_ratio'] = df['vibration_level'] / (df['temperature'] + 1)
        df['pressure_wear_product'] = df['pressure'] * df['wear_level']
        df['health_wear_ratio'] = df['health_score'] / (df['wear_level'] + 1)
        
        # Create polynomial features for critical sensors
        df['vibration_squared'] = df['vibration_level'] ** 2
        df['temperature_squared'] = df['temperature'] ** 2
        df['wear_squared'] = df['wear_level'] ** 2
        
        # Create degradation indicators
        df['critical_vibration'] = (df['vibration_level'] > df['vibration_level'].quantile(0.75)).astype(int)
        df['critical_temperature'] = (df['temperature'] > df['temperature'].quantile(0.75)).astype(int)
        df['critical_wear'] = (df['wear_level'] > df['wear_level'].quantile(0.75)).astype(int)
        df['low_oil_quality'] = (df['oil_quality'] < df['oil_quality'].quantile(0.25)).astype(int)
        
        # Aggregate risk score
        df['risk_score'] = (
            df['critical_vibration'] * 0.3 +
            df['critical_temperature'] * 0.25 +
            df['critical_wear'] * 0.25 +
            df['low_oil_quality'] * 0.2
        )
        
        # Operating condition features
        df['high_operating_hours'] = (df['operating_hours'] > df['operating_hours'].quantile(0.75)).astype(int)
        df['high_cycles'] = (df['cycles'] > df['cycles'].quantile(0.75)).astype(int)
        
        # Component-specific features
        df['engine_specific'] = ((df['component_type'] == 'engine') & (df['rpm'] > 0)).astype(int)
        
        print(f"Created {len(df.columns)} total features")
        
        return df
    
    def prepare_features(self, df):
        """
        Prepare feature matrix and target variable
        """
        # Select features for training
        feature_columns = [
            'component_type_encoded',
            'vibration_level',
            'temperature',
            'pressure',
            'wear_level',
            'oil_quality',
            'rpm',
            'fuel_flow',
            'health_score',
            'operating_hours',
            'cycles',
            'vibration_temp_ratio',
            'pressure_wear_product',
            'health_wear_ratio',
            'vibration_squared',
            'temperature_squared',
            'wear_squared',
            'critical_vibration',
            'critical_temperature',
            'critical_wear',
            'low_oil_quality',
            'risk_score',
            'high_operating_hours',
            'high_cycles',
            'engine_specific'
        ]
        
        self.feature_names = feature_columns
        
        X = df[feature_columns]
        y = df['failure_within_30_days']
        
        print(f"Feature matrix shape: {X.shape}")
        print(f"Target distribution: {y.value_counts().to_dict()}")
        
        return X, y
    
    def train_model(self, X_train, y_train, optimize=True):
        """
        Train Random Forest classifier
        """
        print("\nTraining Random Forest model...")
        
        if optimize:
            print("Performing hyperparameter optimization...")
            
            # Define parameter grid
            param_grid = {
                'n_estimators': [100, 200, 300],
                'max_depth': [10, 20, 30, None],
                'min_samples_split': [2, 5, 10],
                'min_samples_leaf': [1, 2, 4],
                'max_features': ['sqrt', 'log2']
            }
            
            # Create base model
            rf_base = RandomForestClassifier(random_state=42, class_weight='balanced')
            
            # Grid search with cross-validation
            grid_search = GridSearchCV(
                rf_base,
                param_grid,
                cv=5,
                scoring='f1',
                n_jobs=-1,
                verbose=1
            )
            
            grid_search.fit(X_train, y_train)
            
            self.model = grid_search.best_estimator_
            print(f"Best parameters: {grid_search.best_params_}")
            print(f"Best CV F1 score: {grid_search.best_score_:.4f}")
            
        else:
            # Train with default parameters
            self.model = RandomForestClassifier(
                n_estimators=200,
                max_depth=20,
                min_samples_split=5,
                min_samples_leaf=2,
                max_features='sqrt',
                random_state=42,
                class_weight='balanced',
                n_jobs=-1
            )
            
            self.model.fit(X_train, y_train)
        
        print("Model training completed!")
        
    def evaluate_model(self, X_test, y_test):
        """
        Evaluate model performance
        """
        print("\n" + "="*60)
        print("MODEL EVALUATION")
        print("="*60)
        
        # Make predictions
        y_pred = self.model.predict(X_test)
        y_pred_proba = self.model.predict_proba(X_test)[:, 1]
        
        # Calculate metrics
        accuracy = accuracy_score(y_test, y_pred)
        precision = precision_score(y_test, y_pred)
        recall = recall_score(y_test, y_pred)
        f1 = f1_score(y_test, y_pred)
        roc_auc = roc_auc_score(y_test, y_pred_proba)
        
        print(f"\nAccuracy:  {accuracy:.4f} ({accuracy*100:.2f}%)")
        print(f"Precision: {precision:.4f} ({precision*100:.2f}%)")
        print(f"Recall:    {recall:.4f} ({recall*100:.2f}%)")
        print(f"F1 Score:  {f1:.4f} ({f1*100:.2f}%)")
        print(f"ROC AUC:   {roc_auc:.4f}")
        
        # Confusion matrix
        cm = confusion_matrix(y_test, y_pred)
        print("\nConfusion Matrix:")
        print(f"                Predicted")
        print(f"              No Fail  Fail")
        print(f"Actual No Fail  {cm[0][0]:5d}  {cm[0][1]:5d}")
        print(f"       Fail     {cm[1][0]:5d}  {cm[1][1]:5d}")
        
        # Classification report
        print("\nDetailed Classification Report:")
        print(classification_report(y_test, y_pred, target_names=['No Failure', 'Failure']))
        
        # Feature importance
        feature_importance = pd.DataFrame({
            'feature': self.feature_names,
            'importance': self.model.feature_importances_
        }).sort_values('importance', ascending=False)
        
        print("\nTop 10 Most Important Features:")
        for idx, row in feature_importance.head(10).iterrows():
            print(f"  {row['feature']:30s}: {row['importance']:.4f}")
        
        # Store metadata
        self.model_metadata = {
            'training_date': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'model_type': 'RandomForestClassifier',
            'n_features': len(self.feature_names),
            'feature_names': self.feature_names,
            'metrics': {
                'accuracy': float(accuracy),
                'precision': float(precision),
                'recall': float(recall),
                'f1_score': float(f1),
                'roc_auc': float(roc_auc)
            },
            'confusion_matrix': cm.tolist(),
            'feature_importance': feature_importance.to_dict('records'),
            'model_parameters': self.model.get_params()
        }
        
        # Check if model meets requirements
        print("\n" + "="*60)
        if accuracy >= 0.85 and precision >= 0.80:
            print("✓ MODEL MEETS REQUIREMENTS (>85% accuracy, >80% precision)")
        else:
            print("✗ MODEL DOES NOT MEET REQUIREMENTS")
            print(f"  Required: Accuracy ≥85%, Precision ≥80%")
            print(f"  Achieved: Accuracy {accuracy*100:.1f}%, Precision {precision*100:.1f}%")
        print("="*60 + "\n")
        
        return self.model_metadata
    
    def save_model(self, output_dir='models'):
        """
        Save trained model and metadata
        """
        os.makedirs(output_dir, exist_ok=True)
        
        # Save model
        model_file = os.path.join(output_dir, 'random_forest_model.pkl')
        joblib.dump(self.model, model_file)
        print(f"✓ Model saved: {model_file}")
        
        # Save scaler
        scaler_file = os.path.join(output_dir, 'scaler.pkl')
        joblib.dump(self.scaler, scaler_file)
        print(f"✓ Scaler saved: {scaler_file}")
        
        # Save label encoders
        encoders_file = os.path.join(output_dir, 'label_encoders.pkl')
        joblib.dump(self.label_encoders, encoders_file)
        print(f"✓ Label encoders saved: {encoders_file}")
        
        # Save metadata
        metadata_file = os.path.join(output_dir, 'model_metadata.json')
        with open(metadata_file, 'w') as f:
            json.dump(self.model_metadata, f, indent=2)
        print(f"✓ Metadata saved: {metadata_file}")
        
    def train_pipeline(self, data_path='../data/sensor_data.csv', optimize=False):
        """
        Complete training pipeline
        """
        print("\n" + "="*60)
        print("AIRCRAFT PREDICTIVE MAINTENANCE - MODEL TRAINING")
        print("="*60 + "\n")
        
        # Load data
        df = self.load_data(data_path)
        
        # Engineer features
        df = self.engineer_features(df)
        
        # Prepare features
        X, y = self.prepare_features(df)
        
        # Split data
        print("\nSplitting data (80% train, 20% test)...")
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )
        print(f"Training set: {len(X_train)} samples")
        print(f"Test set: {len(X_test)} samples")
        
        # Scale features
        print("\nScaling features...")
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        # Train model
        self.train_model(X_train_scaled, y_train, optimize=optimize)
        
        # Evaluate model
        self.evaluate_model(X_test_scaled, y_test)
        
        # Save model
        self.save_model()
        
        print("\n✓ Training pipeline completed successfully!")
        
        return self.model


if __name__ == "__main__":
    trainer = AircraftMaintenanceModel()
    trainer.train_pipeline(optimize=False)  # Set to True for hyperparameter optimization
