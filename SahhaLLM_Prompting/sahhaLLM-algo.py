import os
import anthropic
from openai import OpenAI
from dotenv import load_dotenv
import ell
import random
from datetime import datetime, timedelta
import json
from typing import List, Dict, Union, Optional
from pydantic import BaseModel, Field, ConfigDict
import logging
from pathlib import Path
import numpy as np
import sys
from datetime import datetime

# Load environment variables from the .env.local file
load_dotenv(dotenv_path='.env.local')

# Load environment variables from the .env.local file
load_dotenv(dotenv_path='.env.local')



# Access the API key from the loaded environment variables
#anthropic_api_key = os.getenv('ANTHROPIC_API_KEY')
openai_api_key = os.getenv('OPENAI_API_KEY')

# if not anthropic_api_key:
#     raise ValueError("ANTHROPIC_API_KEY not found in environment variables")

if not openai_api_key:
    raise ValueError("OPENAI_API_KEY not found in environment variables")

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize ELL with versioning
ell.init(store='./SahhaLLM_Prompting/logdir', autocommit=True, verbose=True)

class HealthMetrics(BaseModel):
    """Pydantic model for health metrics"""
    model_config = ConfigDict(frozen=False)
    
    steps: float = Field(description="Number of steps taken")
    distance: float = Field(description="Distance walked/run in kilometers")
    energy: float = Field(description="Active energy burned in calories")
    exercise: float = Field(description="Exercise time in minutes")
    flights: float = Field(description="Number of flights climbed")

class DailyHealthData(BaseModel):
    """Pydantic model for daily health data"""
    model_config = ConfigDict(frozen=False)
    
    date: str = Field(description="Date in YYYY-MM-DD format")
    metrics: Dict[str, Dict[str, float]] = Field(description="Health metrics by hour")

class AnalysisResult(BaseModel):
    """Pydantic model for analysis results"""
    model_config = ConfigDict(frozen=False)
    
    activity_patterns: str = Field(description="Analysis of activity patterns")
    consistency: str = Field(description="Analysis of consistency")
    improvements: str = Field(description="Suggested improvements")

class HealthRecommendation(BaseModel):
    """Pydantic model for health recommendations"""
    model_config = ConfigDict(frozen=False)
    
    timing: str = Field(description="Optimal activity timing")
    intensity: str = Field(description="Exercise intensity recommendations")
    recovery: str = Field(description="Recovery and rest periods")
    progression: str = Field(description="Progressive improvement steps")
    habits: str = Field(description="Habit formation strategies")

## Main class to finetune
class HealthKitDataGenerator:
    """Enhanced helper class to generate realistic HealthKit data with improved metric correlations"""
    
    ACTIVITY_LEVELS = {
        'very_active': {
            'base_steps': (14000, 20000),
            'stride_length': (0.7, 0.85),  # meters per step
            'energy_per_step': (0.05, 0.07),  # calories per step
            'exercise_ratio': (0.3, 0.4),  # portion of day in exercise
            'flights_per_step': (0.0012, 0.0015)  # flights per step
        },
        'active': {
            'base_steps': (9000, 15000),
            'stride_length': (0.65, 0.8),
            'energy_per_step': (0.045, 0.065),
            'exercise_ratio': (0.2, 0.3),
            'flights_per_step': (0.0008, 0.0012)
        },
        'moderately_active': {
            'base_steps': (6000, 10000),
            'stride_length': (0.6, 0.75),
            'energy_per_step': (0.04, 0.06),
            'exercise_ratio': (0.1, 0.2),
            'flights_per_step': (0.0005, 0.0009)
        },
        'sedentary': {
            'base_steps': (1500, 6000),
            'stride_length': (0.55, 0.7),
            'energy_per_step': (0.035, 0.055),
            'exercise_ratio': (0.05, 0.15),
            'flights_per_step': (0.0001, 0.0003)  # Reduced from (0.0002, 0.0006)
        }
    }
    
    EXERCISE_MODIFIERS = {
        'strength_training': {
            'steps_mod': (0.6, 0.8),      # Lower step count
            'stride_mod': (0.8, 0.9),      # Shorter strides during lifting
            'energy_mod': (1.3, 1.6),      # Higher energy burn
            'exercise_mod': (1.2, 1.4),    # More exercise minutes counted
            'flights_mod': (1.4, 1.8)      # More flights due to intensity
        },
        'cardio': {
            'steps_mod': (1.2, 1.4),       # Higher step count
            'stride_mod': (1.1, 1.2),      # Longer strides during running
            'energy_mod': (1.1, 1.3),      # Moderate energy increase
            'exercise_mod': (1.0, 1.2),    # Standard exercise minutes
            'flights_mod': (1.2, 1.5)      # Increased from (0.8, 1.0) to reflect more stair usage
        },
        'pilates_yoga': {
            'steps_mod': (0.4, 0.6),       # Much lower step count
            'stride_mod': (0.7, 0.8),      # Shorter movements
            'energy_mod': (0.9, 1.1),      # Moderate energy burn
            'exercise_mod': (1.3, 1.5),    # More exercise minutes
            'flights_mod': (0.3, 0.5)      # Reduced from (0.4, 0.6) to reflect minimal stair usage
        },
        'hiit': {
            'steps_mod': (0.8, 1.0),       # Moderate step count
            'stride_mod': (0.9, 1.1),      # Variable stride length
            'energy_mod': (1.4, 1.7),      # Highest energy burn
            'exercise_mod': (1.1, 1.3),    # More exercise minutes
            'flights_mod': (1.4, 1.8)      # Increased from (1.2, 1.6) to reflect highest stair usage
        }
    }

    def __init__(self):
        self.weather_impact = random.uniform(0.8, 1.2)
        self.motivation_factor = random.uniform(0.9, 1.1)
        
    def _apply_time_based_variation(self, base_value: float, hour: int) -> float:
        """Apply realistic time-based variations to metrics"""
        # Early morning boost (5AM-8AM)
        if 5 <= hour <= 8:
            return base_value * random.uniform(1.1, 1.3)
        # Lunch time activity (11AM-2PM)
        elif 11 <= hour <= 14:
            return base_value * random.uniform(0.9, 1.2)
        # Evening exercise (5PM-8PM)
        elif 17 <= hour <= 20:
            return base_value * random.uniform(1.0, 1.4)
        # Late night reduction (10PM-4AM)
        elif hour >= 22 or hour <= 4:
            return base_value * random.uniform(0.1, 0.3)
        else:
            return base_value * random.uniform(0.7, 1.0)

    def _generate_correlated_metrics(self, activity_level: str, exercise_type: str) -> HealthMetrics:
        """Generate metrics with realistic correlations"""
        if activity_level not in self.ACTIVITY_LEVELS:
            raise ValueError(f"Unknown activity level: {activity_level}")
        
        base = self.ACTIVITY_LEVELS[activity_level]
        mods = self.EXERCISE_MODIFIERS.get(exercise_type, {})
        
        # Generate base steps first
        base_steps = random.uniform(*base['base_steps'])
        steps = base_steps * random.uniform(*mods['steps_mod']) * self.motivation_factor * self.weather_impact
        
        # Calculate distance based on steps and stride length
        stride_length = random.uniform(*base['stride_length']) * random.uniform(*mods['stride_mod'])
        distance = (steps * stride_length) / 1000  # Convert to kilometers
        
        # Calculate energy based on steps and activity-specific modifiers
        base_energy = steps * random.uniform(*base['energy_per_step'])
        energy = base_energy * random.uniform(*mods['energy_mod']) * self.motivation_factor
        
        # Calculate exercise minutes based on activity level and modifiers
        base_exercise = steps * random.uniform(*base['exercise_ratio'])
        exercise = base_exercise * random.uniform(*mods['exercise_mod']) * self.motivation_factor
        
        # Calculate flights based on steps and activity-specific modifiers
        base_flights = steps * random.uniform(*base['flights_per_step'])
        flights = base_flights * random.uniform(*mods['flights_mod']) * self.motivation_factor
        
        return HealthMetrics(
            steps=float(steps),
            distance=float(distance),
            energy=float(energy),
            exercise=float(exercise),
            flights=float(flights)
        )

    def _distribute_daily_value(self, total: float, num_periods: int = 24) -> Dict[str, float]:
        """Distribute a daily value across hours with enhanced realism"""
        # Generate random peak hours with some variance
        morning_peak = random.randint(5, 9)
        evening_peak = random.randint(16, 21)
        
        # Create a more natural distribution using numpy
        hours = np.arange(24)
        
        # Morning activity pattern
        morning_pattern = np.exp(-((hours - morning_peak) ** 2) / 8)
        
        # Evening activity pattern
        evening_pattern = np.exp(-((hours - evening_peak) ** 2) / 10)
        
        # Combine patterns with random weights
        morning_weight = random.uniform(0.4, 0.6)
        weights = morning_weight * morning_pattern + (1 - morning_weight) * evening_pattern
        
        # Add random noise
        noise = np.random.normal(0, 0.1, 24)
        weights = weights + noise
        
        # Ensure non-negative weights
        weights = np.maximum(weights, 0)
        
        # Normalize weights
        weights = weights / weights.sum()
        
        # Distribute the total value
        distributed = {}
        remaining = float(total)
        
        for hour in range(24):
            if hour == 23:  # Last hour gets remaining value
                value = remaining
            else:
                value = total * weights[hour]
                remaining -= value
            
            # Apply time-based variation
            value = self._apply_time_based_variation(value, hour)
            
            if value > 0:  # Only include non-zero values
                distributed[str(hour)] = float(round(value, 6))
        
        return distributed

    def generate_daily_data(
        self, 
        activity_level: str, 
        exercise_type: str, 
        date: datetime
    ) -> DailyHealthData:
        """Generate synthetic data for a single day with improved metric correlations"""
        try:
            # Reset daily factors
            self.weather_impact = random.uniform(0.8, 1.2)
            self.motivation_factor = random.uniform(0.9, 1.1)
            
            # Weekend modifier
            if date.weekday() >= 5:  # Weekend
                self.motivation_factor *= random.uniform(0.7, 1.3)
            
            metrics = self._generate_correlated_metrics(activity_level, exercise_type)
            
            daily_data = {
                'date': date.strftime("%Y-%m-%d"),
                'metrics': {
                    'HKQuantityTypeIdentifierStepCount': 
                        self._distribute_daily_value(metrics.steps),
                    'HKQuantityTypeIdentifierDistanceWalkingRunning':
                        self._distribute_daily_value(metrics.distance),
                    'HKQuantityTypeIdentifierActiveEnergyBurned':
                        self._distribute_daily_value(metrics.energy),
                    'HKQuantityTypeIdentifierAppleExerciseTime':
                        self._distribute_daily_value(metrics.exercise),
                    'HKQuantityTypeIdentifierFlightsClimbed':
                        self._distribute_daily_value(metrics.flights)
                }
            }
            
            return DailyHealthData(**daily_data)
            
        except Exception as e:
            logger.error(f"Error generating daily data: {str(e)}")
            raise

# ELL Language Model Programs (LMPs)
@ell.complex(model="gpt-4o", client=OpenAI(api_key=openai_api_key), response_format=AnalysisResult)
def analyze_activity_patterns(data: List[DailyHealthData]) -> List[ell.Message]:
    """Analyze activity patterns in the HealthKit data."""
    return [
        ell.system("""You are an expert health data analyst. Analyze the provided HealthKit data 
                     and provide a structured analysis following the AnalysisResult schema. Be detailed, calculate daily averages and technical trends 
                     and use them to guide your reasoning"""),
        ell.user(f"""Analyze the following health data and provide insights about patterns, 
                    consistency, and improvements:
                    
                    Data:
                    {json.dumps([d.model_dump() for d in data], indent=2)}""")
    ]

@ell.complex(model="gpt-4o", client=OpenAI(api_key=openai_api_key), response_format=HealthRecommendation)
def generate_health_recommendations(
    analysis: AnalysisResult,
    activity_level: str,
    exercise_type: str
) -> List[ell.Message]:
    """Generate structured health recommendations based on the analysis."""
    return [
        ell.system("""You are an expert health coach. Provide structured recommendations 
                     following the HealthRecommendation schema."""),
        ell.user(f"""Based on this analysis for a {activity_level} person doing {exercise_type}, 
                    provide specific recommendations:
                    
                    Analysis:
                    {json.dumps(analysis.model_dump(), indent=2)}""")
    ]

class HealthKitAnalyzer:
    """Main class for analyzing HealthKit data"""
    
    def __init__(self, output_dir: Union[str, Path] = './SahhaLLM_Prompting/output'):
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.generator = HealthKitDataGenerator()
        
    def generate_and_analyze(
        self,
        start_date: datetime,
        days: int,
        activity_level: str,
        exercise_type: str
    ) -> Dict:
        """Generate and analyze HealthKit data"""
        logger.info(f"Generating {days} days of data starting from {start_date}")
        
        # Generate synthetic data
        synthetic_data = []
        current_date = start_date
        for _ in range(days):
            try:
                daily_data = self.generator.generate_daily_data(
                    activity_level,
                    exercise_type,
                    current_date
                )
                synthetic_data.append(daily_data)
                current_date += timedelta(days=1)
            except Exception as e:
                logger.error(f"Error generating data for {current_date}: {str(e)}")
                continue
        
        # Analyze patterns
        message = analyze_activity_patterns(synthetic_data)
        analysis = message.parsed
        
        # Generate recommendations
        rec_message = generate_health_recommendations(
            analysis,
            activity_level,
            exercise_type
        )
        recommendations = rec_message.parsed
        
        
        # Prepare results
        results = {
            'data': [d.model_dump() for d in synthetic_data],
            'analysis': analysis.model_dump(),
            'recommendations': recommendations.model_dump(),
            'metadata': {
                'generated_at': datetime.now().isoformat(),
                'activity_level': activity_level,
                'exercise_type': exercise_type,
                'date_range': {
                    'start': start_date.isoformat(),
                    'end': (start_date + timedelta(days=days-1)).isoformat()
                }
            }
        }
        
        # Save results
        period = 'week' if days <= 7 else 'month'
        output_file = self.output_dir / f'{activity_level}_{period}_{exercise_type}.json'
        with open(output_file, 'w') as f:
            json.dump(results, f, indent=2)
        
        logger.info(f"Analysis complete! Results saved to {output_file}")
        return results



def main():
    """Main entry point"""
    try:

        activity_levels = ["very_active", "active", "moderately_active", "sedentary"]
        exercise_types = ["strength_training", "cardio", "pilates_yoga", "hiit"]

        analyzer = HealthKitAnalyzer()
        for activity_level in activity_levels:
            if activity_level == "very_active":
                continue
            for exercise_type in exercise_types:
                results = analyzer.generate_and_analyze(
                    start_date=datetime.now(),
                    days=7,
                    activity_level=activity_level,
                
                    exercise_type=exercise_type
                )


        
    except Exception as e:
        logger.error(f"Error in main execution: {str(e)}")
        raise

if __name__ == "__main__":
    main()
