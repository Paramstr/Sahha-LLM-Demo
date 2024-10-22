import os
import anthropic
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables from the .env.local file
load_dotenv(dotenv_path='.env.local')

# Access the API key from the loaded environment variables
anthropic_api_key = os.getenv('ANTHROPIC_API_KEY')
openai_api_key = os.getenv('OPENAI_API_KEY')

if not anthropic_api_key:
    raise ValueError("ANTHROPIC_API_KEY not found in environment variables")

if not openai_api_key:
    raise ValueError("OPENAI_API_KEY not found in environment variables")



# Initialize the Anthrop client using the API key
#client = anthropic.Client(api_key=anthropic_api_key)



import ell
import random
from datetime import datetime, timedelta
import json
from typing import List, Dict, Union, Optional
from dataclasses import dataclass
from pydantic import BaseModel, Field, ConfigDict
import logging
from pathlib import Path

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize ELL with versioning
ell.init(store='./SahhaLLM_Prompting/logdir', autocommit=True, verbose=True)

# Pydantic models with proper configuration
class HealthMetrics(BaseModel):
    """Pydantic model for health metrics"""
    model_config = ConfigDict(frozen=False)  # Allow attribute modification
    
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

class HealthKitDataGenerator:
    """Helper class to generate realistic HealthKit data"""
    
    ACTIVITY_LEVELS = {
        'very_active': {
            'steps': (15000, 18000),
            'distance': (10, 12),
            'energy': (700, 900),
            'exercise': (60, 90),
            'flights': (10, 15)
        },
        'active': {
            'steps': (10000, 13000),
            'distance': (5, 10),
            'energy': (500, 700),
            'exercise': (30, 60),
            'flights': (5, 10)
        },
        'moderately_active': {
            'steps': (7000, 9000),
            'distance': (3, 5),
            'energy': (300, 500),
            'exercise': (15, 30),
            'flights': (3, 7)
        },
        'sedentary': {
            'steps': (2000, 5000),
            'distance': (1, 3),
            'energy': (100, 300),
            'exercise': (0, 15),
            'flights': (0, 3)
        }
    }
    
    EXERCISE_MODIFIERS = {
        'strength_training': {
            'distance': 0.5,
            'energy': 1.2,
            'exercise': 1.3,
            'flights': (2, 5)
        },
        'cardio': {
            'distance': 1.3,
            'energy': 1.1,
            'exercise': 1.2,
            'flights': (0, 2)
        },
        'pilates_yoga': {
            'distance': 0.3,
            'energy': 0.9,
            'exercise': 1.4,
            'flights': (0, 1)
        },
        'hiit': {
            'distance': 0.7,
            'energy': 1.4,
            'exercise': 1.1,
            'flights': (3, 7)
        }
    }

    def _generate_base_metrics(self, activity_level: str, exercise_type: str) -> HealthMetrics:
        """Generate base metrics for a given activity level and exercise type"""
        if activity_level not in self.ACTIVITY_LEVELS:
            raise ValueError(f"Unknown activity level: {activity_level}")
        
        base = self.ACTIVITY_LEVELS[activity_level]
        mods = self.EXERCISE_MODIFIERS.get(exercise_type, {})
        
        # Generate base values with Pydantic model
        metrics = {
            'steps': float(random.randint(*base['steps'])),
            'distance': float(random.uniform(*base['distance'])),
            'energy': float(random.uniform(*base['energy'])),
            'exercise': float(random.uniform(*base['exercise'])),
            'flights': float(random.randint(*base['flights']))
        }
        
        # Apply exercise modifiers
        metrics['distance'] *= mods.get('distance', 1.0)
        metrics['energy'] *= mods.get('energy', 1.0)
        metrics['exercise'] *= mods.get('exercise', 1.0)
        if 'flights' in mods:
            metrics['flights'] += float(random.randint(*mods['flights']))
        
        # Create and return HealthMetrics instance
        return HealthMetrics(**metrics)

    def _distribute_daily_value(self, total: float, num_periods: int = 24) -> Dict[str, float]:
        """Distribute a daily value across hours realistically"""
        morning_peak = random.randint(6, 9)
        evening_peak = random.randint(17, 20)
        
        weights = []
        for i in range(24):
            if i in range(23, 5):  # Night hours
                weights.append(0.2)
            elif i in (morning_peak, evening_peak):  # Peak hours
                weights.append(3.0)
            elif i in range(9, 17):  # Working hours
                weights.append(1.5)
            else:  # Other hours
                weights.append(1.0)
        
        total_weight = sum(weights)
        normalized_weights = [w/total_weight for w in weights]
        
        distributed = {}
        remaining = float(total)
        for hour in range(num_periods):
            if hour == num_periods - 1:
                value = remaining
            else:
                value = total * normalized_weights[hour]
                remaining -= value
            if value > 0:  # Only include non-zero values
                distributed[str(hour)] = float(round(value, 6))
        
        return distributed

    def generate_daily_data(
        self, 
        activity_level: str, 
        exercise_type: str, 
        date: datetime
    ) -> DailyHealthData:
        """Generate synthetic data for a single day"""
        try:
            metrics = self._generate_base_metrics(activity_level, exercise_type)
            
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

# Rest of the code (ELL LMPs and HealthKitAnalyzer class) remains the same...

# ELL Language Model Programs (LMPs)
@ell.complex(model="gpt-4o", client=OpenAI(api_key=openai_api_key), response_format=AnalysisResult)
def analyze_activity_patterns(data: List[DailyHealthData]) -> List[ell.Message]:
    """Analyze activity patterns in the HealthKit data."""
    return [
        ell.system("""You are an expert health data analyst. Analyze the provided HealthKit data 
                     and provide a structured analysis following the AnalysisResult schema."""),
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
        
        # Analyze patterns (with tracing)
        message = analyze_activity_patterns(synthetic_data)
        analysis = message.parsed
        
        # Generate recommendations (with tracing)
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
        output_file = self.output_dir / f'healthkit_analysis_{start_date.strftime("%Y%m%d")}.json'
        with open(output_file, 'w') as f:
            json.dump(results, f, indent=2)
        
        logger.info(f"Analysis complete! Results saved to {output_file}")
        return results

def main():
    """Main entry point"""
    try:
        analyzer = HealthKitAnalyzer()
        results = analyzer.generate_and_analyze(
            start_date=datetime.now(),
            days=7,
            activity_level="active",
            exercise_type="cardio"
        )
        
        # Print summary in JSON format
        print("\nAnalysis Summary:")
        print(json.dumps(results, indent=2))
        
    except Exception as e:
        logger.error(f"Error in main execution: {str(e)}")
        raise

if __name__ == "__main__":
    main()