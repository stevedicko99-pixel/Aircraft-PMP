"""
Synthetic Dataset Generator for Aircraft Predictive Maintenance
Generates realistic sensor data, maintenance history, and failure scenarios
"""

import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import json
import os

# Set random seed for reproducibility
np.random.seed(42)

class AircraftDataGenerator:
    def __init__(self):
        self.aircraft_ids = [f"AC{str(i).zfill(3)}" for i in range(1, 51)]  # 50 aircraft
        self.component_types = ['engine', 'landing_gear', 'hydraulic_system']
        self.start_date = datetime(2022, 1, 1)
        self.end_date = datetime(2024, 12, 31)
        
    def generate_sensor_data(self, n_records=10000):
        """
        Generate 10,000 sensor readings with realistic patterns
        """
        print("Generating sensor data...")
        
        data = []
        
        for i in range(n_records):
            aircraft_id = np.random.choice(self.aircraft_ids)
            component_type = np.random.choice(self.component_types)
            
            # Generate timestamp
            days_offset = np.random.randint(0, (self.end_date - self.start_date).days)
            timestamp = self.start_date + timedelta(days=days_offset, 
                                                   hours=np.random.randint(0, 24),
                                                   minutes=np.random.randint(0, 60))
            
            # Generate sensor readings based on component type
            if component_type == 'engine':
                # Engine sensors
                vibration = self._generate_vibration(component_type)
                temperature = self._generate_temperature(component_type)
                pressure = self._generate_pressure(component_type)
                wear_level = self._generate_wear()
                oil_quality = np.random.uniform(70, 100)  # Percentage
                rpm = np.random.uniform(2000, 5000)
                fuel_flow = np.random.uniform(800, 1500)  # kg/h
                
            elif component_type == 'landing_gear':
                # Landing gear sensors
                vibration = self._generate_vibration(component_type)
                temperature = self._generate_temperature(component_type)
                pressure = self._generate_pressure(component_type)
                wear_level = self._generate_wear()
                oil_quality = np.random.uniform(75, 100)
                rpm = 0  # Not applicable
                fuel_flow = 0  # Not applicable
                
            else:  # hydraulic_system
                # Hydraulic system sensors
                vibration = self._generate_vibration(component_type)
                temperature = self._generate_temperature(component_type)
                pressure = self._generate_pressure(component_type)
                wear_level = self._generate_wear()
                oil_quality = np.random.uniform(80, 100)
                rpm = 0
                fuel_flow = 0
            
            # Determine if this is a failure precursor (10% of data)
            is_failure_precursor = np.random.random() < 0.10
            
            if is_failure_precursor:
                # Add anomalies for failure precursors
                vibration *= np.random.uniform(1.5, 2.5)
                temperature *= np.random.uniform(1.2, 1.5)
                pressure *= np.random.uniform(0.7, 0.9)
                wear_level *= np.random.uniform(1.3, 1.8)
                oil_quality *= np.random.uniform(0.6, 0.8)
            
            # Calculate health score (0-100)
            health_score = self._calculate_health_score(
                vibration, temperature, pressure, wear_level, oil_quality
            )
            
            # Determine failure status
            failure_within_30_days = 1 if (is_failure_precursor and health_score < 60) else 0
            
            record = {
                'record_id': f"REC{str(i+1).zfill(6)}",
                'aircraft_id': aircraft_id,
                'component_type': component_type,
                'timestamp': timestamp.strftime('%Y-%m-%d %H:%M:%S'),
                'vibration_level': round(vibration, 2),  # mm/s
                'temperature': round(temperature, 2),  # Celsius
                'pressure': round(pressure, 2),  # PSI
                'wear_level': round(wear_level, 2),  # Percentage
                'oil_quality': round(oil_quality, 2),  # Percentage
                'rpm': round(rpm, 2),
                'fuel_flow': round(fuel_flow, 2),
                'health_score': round(health_score, 2),
                'failure_within_30_days': failure_within_30_days,
                'operating_hours': np.random.randint(100, 10000),
                'cycles': np.random.randint(50, 5000)
            }
            
            data.append(record)
        
        df = pd.DataFrame(data)
        print(f"Generated {len(df)} sensor records")
        print(f"Failure cases: {df['failure_within_30_days'].sum()} ({df['failure_within_30_days'].sum()/len(df)*100:.1f}%)")
        
        return df
    
    def _generate_vibration(self, component_type):
        """Generate vibration levels based on component type"""
        base_values = {
            'engine': (2.0, 8.0),
            'landing_gear': (1.0, 5.0),
            'hydraulic_system': (0.5, 3.0)
        }
        low, high = base_values[component_type]
        return np.random.uniform(low, high)
    
    def _generate_temperature(self, component_type):
        """Generate temperature readings based on component type"""
        base_values = {
            'engine': (400, 800),
            'landing_gear': (50, 150),
            'hydraulic_system': (60, 120)
        }
        low, high = base_values[component_type]
        return np.random.uniform(low, high)
    
    def _generate_pressure(self, component_type):
        """Generate pressure readings based on component type"""
        base_values = {
            'engine': (30, 50),
            'landing_gear': (2000, 3000),
            'hydraulic_system': (2500, 3500)
        }
        low, high = base_values[component_type]
        return np.random.uniform(low, high)
    
    def _generate_wear(self):
        """Generate wear level (0-100%)"""
        return np.random.uniform(0, 100)
    
    def _calculate_health_score(self, vibration, temperature, pressure, wear, oil_quality):
        """Calculate overall health score based on sensor readings"""
        # Normalize values (inverse for negative indicators)
        vibration_score = max(0, 100 - (vibration * 5))
        temp_score = max(0, 100 - (temperature / 10))
        pressure_score = min(100, pressure / 30)
        wear_score = max(0, 100 - wear)
        oil_score = oil_quality
        
        # Weighted average
        health_score = (
            vibration_score * 0.25 +
            temp_score * 0.20 +
            pressure_score * 0.15 +
            wear_score * 0.25 +
            oil_score * 0.15
        )
        
        return max(0, min(100, health_score))
    
    def generate_maintenance_history(self, n_events=500):
        """
        Generate 500 maintenance events
        """
        print("Generating maintenance history...")
        
        maintenance_types = [
            'scheduled_inspection',
            'component_replacement',
            'repair',
            'overhaul',
            'preventive_maintenance'
        ]
        
        data = []
        
        for i in range(n_events):
            aircraft_id = np.random.choice(self.aircraft_ids)
            component_type = np.random.choice(self.component_types)
            maintenance_type = np.random.choice(maintenance_types)
            
            # Generate date
            days_offset = np.random.randint(0, (self.end_date - self.start_date).days)
            maintenance_date = self.start_date + timedelta(days=days_offset)
            
            # Generate costs based on maintenance type
            cost_ranges = {
                'scheduled_inspection': (5000, 15000),
                'component_replacement': (50000, 200000),
                'repair': (10000, 80000),
                'overhaul': (100000, 500000),
                'preventive_maintenance': (3000, 10000)
            }
            
            min_cost, max_cost = cost_ranges[maintenance_type]
            cost = np.random.uniform(min_cost, max_cost)
            
            # Downtime hours
            downtime_ranges = {
                'scheduled_inspection': (4, 12),
                'component_replacement': (24, 72),
                'repair': (8, 48),
                'overhaul': (120, 480),
                'preventive_maintenance': (2, 8)
            }
            
            min_hours, max_hours = downtime_ranges[maintenance_type]
            downtime_hours = np.random.uniform(min_hours, max_hours)
            
            record = {
                'maintenance_id': f"MNT{str(i+1).zfill(5)}",
                'aircraft_id': aircraft_id,
                'component_type': component_type,
                'maintenance_type': maintenance_type,
                'maintenance_date': maintenance_date.strftime('%Y-%m-%d'),
                'cost_usd': round(cost, 2),
                'downtime_hours': round(downtime_hours, 2),
                'technician_id': f"TECH{np.random.randint(1, 51):03d}",
                'parts_replaced': np.random.randint(0, 10),
                'severity': np.random.choice(['low', 'medium', 'high'], p=[0.5, 0.3, 0.2])
            }
            
            data.append(record)
        
        df = pd.DataFrame(data)
        print(f"Generated {len(df)} maintenance events")
        
        return df
    
    def generate_failure_scenarios(self, n_scenarios=50):
        """
        Generate 50 failure scenarios with precursors
        """
        print("Generating failure scenarios...")
        
        failure_types = [
            'bearing_failure',
            'seal_degradation',
            'fatigue_crack',
            'corrosion',
            'overheating',
            'pressure_loss',
            'oil_contamination',
            'electrical_fault'
        ]
        
        data = []
        
        for i in range(n_scenarios):
            aircraft_id = np.random.choice(self.aircraft_ids)
            component_type = np.random.choice(self.component_types)
            failure_type = np.random.choice(failure_types)
            
            # Failure date
            days_offset = np.random.randint(0, (self.end_date - self.start_date).days)
            failure_date = self.start_date + timedelta(days=days_offset)
            
            # Precursor period (days before failure when anomalies started)
            precursor_days = np.random.randint(7, 45)
            precursor_start = failure_date - timedelta(days=precursor_days)
            
            # Generate precursor indicators
            precursors = {
                'vibration_increase': np.random.uniform(50, 200),  # Percentage increase
                'temperature_increase': np.random.uniform(20, 100),
                'pressure_decrease': np.random.uniform(10, 40),
                'wear_acceleration': np.random.uniform(30, 150),
                'oil_quality_drop': np.random.uniform(20, 50)
            }
            
            # Economic impact
            repair_cost = np.random.uniform(100000, 1000000)
            aog_hours = np.random.uniform(24, 168)  # 1-7 days
            revenue_loss = aog_hours * np.random.uniform(10000, 50000)  # Per hour
            
            record = {
                'scenario_id': f"FAIL{str(i+1).zfill(3)}",
                'aircraft_id': aircraft_id,
                'component_type': component_type,
                'failure_type': failure_type,
                'failure_date': failure_date.strftime('%Y-%m-%d'),
                'precursor_start_date': precursor_start.strftime('%Y-%m-%d'),
                'precursor_days': precursor_days,
                'vibration_increase_pct': round(precursors['vibration_increase'], 2),
                'temperature_increase_pct': round(precursors['temperature_increase'], 2),
                'pressure_decrease_pct': round(precursors['pressure_decrease'], 2),
                'wear_acceleration_pct': round(precursors['wear_acceleration'], 2),
                'oil_quality_drop_pct': round(precursors['oil_quality_drop'], 2),
                'repair_cost_usd': round(repair_cost, 2),
                'aog_hours': round(aog_hours, 2),
                'revenue_loss_usd': round(revenue_loss, 2),
                'total_cost_usd': round(repair_cost + revenue_loss, 2),
                'root_cause': self._generate_root_cause(failure_type),
                'preventable': np.random.choice([True, False], p=[0.8, 0.2])
            }
            
            data.append(record)
        
        df = pd.DataFrame(data)
        print(f"Generated {len(df)} failure scenarios")
        print(f"Preventable failures: {df['preventable'].sum()} ({df['preventable'].sum()/len(df)*100:.1f}%)")
        
        return df
    
    def _generate_root_cause(self, failure_type):
        """Generate root cause description"""
        root_causes = {
            'bearing_failure': 'Insufficient lubrication and excessive load',
            'seal_degradation': 'Material aging and thermal cycling',
            'fatigue_crack': 'Cyclic stress and material defect',
            'corrosion': 'Environmental exposure and inadequate protection',
            'overheating': 'Cooling system malfunction and high ambient temperature',
            'pressure_loss': 'Seal failure and system leak',
            'oil_contamination': 'Filter bypass and external contamination',
            'electrical_fault': 'Wire insulation breakdown and connector corrosion'
        }
        return root_causes.get(failure_type, 'Unknown cause')
    
    def save_datasets(self, output_dir='../data'):
        """
        Generate and save all datasets
        """
        # Create output directory if it doesn't exist
        os.makedirs(output_dir, exist_ok=True)
        
        print("\n" + "="*60)
        print("AIRCRAFT PREDICTIVE MAINTENANCE - DATASET GENERATION")
        print("="*60 + "\n")
        
        # Generate datasets
        sensor_data = self.generate_sensor_data(10000)
        maintenance_history = self.generate_maintenance_history(500)
        failure_scenarios = self.generate_failure_scenarios(50)
        
        # Save to CSV
        sensor_file = os.path.join(output_dir, 'sensor_data.csv')
        maintenance_file = os.path.join(output_dir, 'maintenance_history.csv')
        failure_file = os.path.join(output_dir, 'failure_scenarios.csv')
        
        sensor_data.to_csv(sensor_file, index=False)
        maintenance_history.to_csv(maintenance_file, index=False)
        failure_scenarios.to_csv(failure_file, index=False)
        
        print(f"\n✓ Datasets saved successfully!")
        print(f"  - Sensor data: {sensor_file}")
        print(f"  - Maintenance history: {maintenance_file}")
        print(f"  - Failure scenarios: {failure_file}")
        
        # Generate summary statistics
        self._generate_summary(sensor_data, maintenance_history, failure_scenarios, output_dir)
        
        return sensor_data, maintenance_history, failure_scenarios
    
    def _generate_summary(self, sensor_data, maintenance_history, failure_scenarios, output_dir):
        """Generate summary statistics"""
        summary = {
            'generation_date': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'sensor_data': {
                'total_records': len(sensor_data),
                'aircraft_count': sensor_data['aircraft_id'].nunique(),
                'component_types': sensor_data['component_type'].value_counts().to_dict(),
                'failure_cases': int(sensor_data['failure_within_30_days'].sum()),
                'date_range': {
                    'start': sensor_data['timestamp'].min(),
                    'end': sensor_data['timestamp'].max()
                },
                'health_score_stats': {
                    'mean': float(sensor_data['health_score'].mean()),
                    'min': float(sensor_data['health_score'].min()),
                    'max': float(sensor_data['health_score'].max())
                }
            },
            'maintenance_history': {
                'total_events': len(maintenance_history),
                'maintenance_types': maintenance_history['maintenance_type'].value_counts().to_dict(),
                'total_cost_usd': float(maintenance_history['cost_usd'].sum()),
                'total_downtime_hours': float(maintenance_history['downtime_hours'].sum()),
                'avg_cost_per_event': float(maintenance_history['cost_usd'].mean())
            },
            'failure_scenarios': {
                'total_scenarios': len(failure_scenarios),
                'failure_types': failure_scenarios['failure_type'].value_counts().to_dict(),
                'preventable_count': int(failure_scenarios['preventable'].sum()),
                'total_cost_usd': float(failure_scenarios['total_cost_usd'].sum()),
                'avg_precursor_days': float(failure_scenarios['precursor_days'].mean())
            }
        }
        
        summary_file = os.path.join(output_dir, 'dataset_summary.json')
        with open(summary_file, 'w') as f:
            json.dump(summary, f, indent=2)
        
        print(f"  - Summary: {summary_file}")
        print("\n" + "="*60)
        print("DATASET SUMMARY")
        print("="*60)
        print(f"\nSensor Data:")
        print(f"  - Total records: {summary['sensor_data']['total_records']:,}")
        print(f"  - Aircraft: {summary['sensor_data']['aircraft_count']}")
        print(f"  - Failure cases: {summary['sensor_data']['failure_cases']:,}")
        print(f"\nMaintenance History:")
        print(f"  - Total events: {summary['maintenance_history']['total_events']:,}")
        print(f"  - Total cost: ${summary['maintenance_history']['total_cost_usd']:,.2f}")
        print(f"  - Total downtime: {summary['maintenance_history']['total_downtime_hours']:,.1f} hours")
        print(f"\nFailure Scenarios:")
        print(f"  - Total scenarios: {summary['failure_scenarios']['total_scenarios']}")
        print(f"  - Preventable: {summary['failure_scenarios']['preventable_count']}")
        print(f"  - Total cost: ${summary['failure_scenarios']['total_cost_usd']:,.2f}")
        print("="*60 + "\n")


if __name__ == "__main__":
    generator = AircraftDataGenerator()
    generator.save_datasets()
