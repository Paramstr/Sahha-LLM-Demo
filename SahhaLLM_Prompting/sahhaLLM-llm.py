import os
import anthropic
from openai import OpenAI
from dotenv import load_dotenv
import random
from datetime import datetime, timedelta
import json
from typing import List, Dict, Union, Optional, Literal
from pydantic import BaseModel, Field, ConfigDict
import logging
from pathlib import Path
from enum import Enum

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv(dotenv_path='.env.local')
openai_api_key = os.getenv('OPENAI_API_KEY')
if not openai_api_key:
    raise ValueError("OPENAI_API_KEY not found in environment variables")

# Initialize ELL with versioning
import ell
ell.init(store='./SahhaLLM_Prompting/logdir', autocommit=True, verbose=True)

# Enums for type safety
class TimePeriod(str, Enum):
    DAY = "Day"
    WEEK = "Week"
    MONTH = "Month"

class ActivityLevel(str, Enum):
    VERY_ACTIVE = "Very Active"
    ACTIVE = "Active"
    MODERATELY_ACTIVE = "Moderately Active"
    SEDENTARY_WALKING = "Sedentary but Walking"
    SEDENTARY = "Sedentary"

class ExerciseType(str, Enum):
    STRENGTH = "Strength Training"
    CARDIO = "Cardio"
    PILATES_YOGA = "Pilates/Yoga"
    HIIT = "HIIT"
    NONE = "None"

# Activity level parameters
ACTIVITY_LEVEL_PARAMS = {
    ActivityLevel.VERY_ACTIVE: {
        "active_days_range": (5, 7),
        "daily_step_range": (12000, 20000),
        "exercise_minutes_range": (45, 120),
        "active_energy_range": (600, 1000),
        "flights_range": (8, 20)
    },
    ActivityLevel.ACTIVE: {
        "active_days_range": (3, 5),
        "daily_step_range": (8000, 12000),
        "exercise_minutes_range": (30, 60),
        "active_energy_range": (400, 700),
        "flights_range": (5, 15)
    },
    ActivityLevel.MODERATELY_ACTIVE: {
        "active_days_range": (2, 3),
        "daily_step_range": (5000, 8000),
        "exercise_minutes_range": (15, 30),
        "active_energy_range": (200, 400),
        "flights_range": (3, 8)
    },
    ActivityLevel.SEDENTARY_WALKING: {
        "active_days_range": (1, 2),
        "daily_step_range": (3000, 5000),
        "exercise_minutes_range": (5, 15),
        "active_energy_range": (100, 200),
        "flights_range": (1, 5)
    },
    ActivityLevel.SEDENTARY: {
        "active_days_range": (0, 1),
        "daily_step_range": (1000, 3000),
        "exercise_minutes_range": (0, 5),
        "active_energy_range": (50, 100),
        "flights_range": (0, 3)
    }
}

# Exercise type impact factors
EXERCISE_IMPACTS = {
    ExerciseType.STRENGTH: {
        "steps_factor": 0.7,
        "energy_factor": 1.3,
        "exercise_factor": 1.2,
        "flights_factor": 1.1
    },
    ExerciseType.CARDIO: {
        "steps_factor": 1.4,
        "energy_factor": 1.2,
        "exercise_factor": 1.3,
        "flights_factor": 0.8
    },
    ExerciseType.PILATES_YOGA: {
        "steps_factor": 0.5,
        "energy_factor": 0.9,
        "exercise_factor": 1.1,
        "flights_factor": 0.6
    },
    ExerciseType.HIIT: {
        "steps_factor": 1.2,
        "energy_factor": 1.5,
        "exercise_factor": 1.4,
        "flights_factor": 1.2
    },
    ExerciseType.NONE: {
        "steps_factor": 1.0,
        "energy_factor": 1.0,
        "exercise_factor": 1.0,
        "flights_factor": 1.0
    }
}

# Pydantic models
class HealthMetrics(BaseModel):
    """Pydantic model for health metrics with specific ranges"""
    model_config = ConfigDict(frozen=False)
    
    steps: float = Field(description="Number of steps taken (0-3000 per hour)", ge=0, le=3000)
    distance: float = Field(description="Distance walked/run in kilometers (calculated from steps)", ge=0)
    energy: float = Field(description="Active energy burned in calories (0-200 per hour)", ge=0, le=200)
    exercise: float = Field(description="Exercise time in minutes (0-60 per hour)", ge=0, le=60)
    flights: float = Field(description="Number of flights climbed (0-20 per hour)", ge=0, le=20)

class DailyHealthData(BaseModel):
    """Pydantic model for daily health data"""
    model_config = ConfigDict(frozen=False)
    
    date: str = Field(description="Date in YYYY-MM-DD format")
    metrics: Dict[str, Dict[str, float]] = Field(description="Health metrics by hour")

class HourlyMetrics(BaseModel):
    """Model for single hour metrics"""
    steps: float = Field(description="Number of steps taken (0-3000 per hour)", ge=0, le=3000)
    distance: float = Field(description="Distance walked/run in kilometers", ge=0)
    energy: float = Field(description="Active energy burned in calories", ge=0, le=200)
    exercise: float = Field(description="Exercise time in minutes", ge=0, le=60)
    flights: float = Field(description="Number of flights climbed", ge=0, le=20)

class MetricsGenerator(BaseModel):
    """Model for LLM-generated daily metrics"""
    model_config = ConfigDict(
        json_schema_extra={
            "properties": {
                "hours": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "hour": {"type": "integer", "minimum": 0, "maximum": 23},
                            "metrics": {"$ref": "#/definitions/HourlyMetrics"}
                        },
                        "required": ["hour", "metrics"]
                    }
                }
            },
            "required": ["hours"]
        }
    )
    
    hours: List[Dict[str, Union[int, Dict[str, float]]]] = Field(
        description="List of 24 hourly metrics",
        min_items=24,
        max_items=24
    )


class GenerationParams(BaseModel):
    """Parameters for health data generation"""
    time_period: TimePeriod
    start_date: datetime
    activity_level: ActivityLevel
    main_exercise_type: ExerciseType


@ell.complex(model="gpt-4o", client=OpenAI(api_key=openai_api_key))
def generate_daily_metrics(
    date: str,
    activity_params: Dict,
    exercise_impacts: Dict,
    is_active_day: bool,
    weather: str = "normal"
    ) -> List[ell.Message]:
        """Generate realistic daily health metrics using LLM."""
        
        # Create system prompt
        system_prompt = """You are an expert in human activity patterns and health data. Generate realistic hourly health metrics 
                        that reflect natural human behavior and adhere to specific activity parameters.
                        
                        Respond with an array of 24 hourly entries, each containing the hour (0-23) and its metrics."""
        
        # Create parameter section
        params_section = f"""Generate 24 hours of health metrics for a person with the following parameters:
    Date: {date}
    Activity Parameters: {json.dumps(activity_params, indent=2)}
    Exercise Impact Factors: {json.dumps(exercise_impacts, indent=2)}
    Active Exercise Day: {is_active_day}
    Weather Conditions: {weather}"""
        
        # Create metrics section
        metrics_section = """For each hour (0-23), generate these metrics:
    - steps: Steps taken (0-3000 per hour, following daily pattern)
    - distance: Distance in km (steps * 0.0007, adjusted for stride)
    - energy: Active calories burned (based on activity intensity)
    - exercise: Exercise minutes (0-60, concentrated during workout times)
    - flights: Flights of stairs (0-20, based on location and activity)"""
        
        # Create format example section
        format_example = """{
        "hours": [
            {
                "hour": 0,
                "metrics": {
                    "steps": 100,
                    "distance": 0.07,
                    "energy": 10,
                    "exercise": 0,
                    "flights": 0
                }
            },
            ...
        ]
    }"""
        
        # Create patterns section
        patterns_section = """Consider these patterns:
    1. Sleep hours (22:00-06:00): Minimal activity
    2. Morning routine (06:00-09:00): Gradual increase
    3. Work hours (09:00-17:00): Consistent moderate activity
    4. Exercise time: High intensity during typical workout hours
    5. Evening (17:00-22:00): Gradual decrease"""
        
        # Create considerations section
        considerations = """Include:
    - Realistic breaks and peaks in activity
    - Weather impact on outdoor activities
    - Proper correlation between metrics
    - Natural variability within ranges"""
        
        # Combine all sections
        user_prompt = "\n\n".join([
            params_section,
            metrics_section,
            "Response format example:",
            format_example,
            patterns_section,
            considerations
        ])
        
        return [
            ell.system(system_prompt),
            ell.user(user_prompt)
        ]


# Add these after GenerationParams class and before generate_daily_metrics:

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
    activity_level: ActivityLevel,
    exercise_type: ExerciseType
) -> List[ell.Message]:
    """Generate structured health recommendations based on the analysis."""
    return [
        ell.system("""You are an expert health coach. Provide structured recommendations 
                    following the HealthRecommendation schema."""),
        ell.user(f"""Based on this analysis for a {activity_level.value} person doing {exercise_type.value}, 
                    provide specific recommendations:
                    
                    Analysis:
                    {json.dumps(analysis.model_dump(), indent=2)}""")
    ]

    
class LLMHealthKitDataGenerator:
    """LLM-based HealthKit data generator with specific parameters"""
    
    def __init__(self):
        self.client = OpenAI(api_key=openai_api_key)
    
    def _determine_active_day(self, date: datetime, activity_level: ActivityLevel) -> bool:
        """Determine if this is an active exercise day based on activity level"""
        active_days_min, active_days_max = ACTIVITY_LEVEL_PARAMS[activity_level]["active_days_range"]
        # Use date to ensure consistent results for the same date
        random.seed(date.toordinal())
        return random.randint(1, 7) <= random.randint(active_days_min, active_days_max)
    
    def _get_weather_condition(self, date: datetime) -> str:
        """Simple weather generation for context"""
        random.seed(date.toordinal())
        conditions = ["sunny", "rainy", "cloudy", "hot", "cold", "windy", "normal"]
        return random.choice(conditions)
    
    def _transform_metrics(self, metrics_response: Dict) -> Dict[str, Dict[str, float]]:
        """Transform LLM response into HealthKit format"""
        formatted_metrics = {
            'HKQuantityTypeIdentifierStepCount': {},
            'HKQuantityTypeIdentifierDistanceWalkingRunning': {},
            'HKQuantityTypeIdentifierActiveEnergyBurned': {},
            'HKQuantityTypeIdentifierAppleExerciseTime': {},
            'HKQuantityTypeIdentifierFlightsClimbed': {}
        }
        
        for hour_data in metrics_response["hours"]:
            hour = str(hour_data["hour"])
            metrics = hour_data["metrics"]
            
            formatted_metrics['HKQuantityTypeIdentifierStepCount'][hour] = metrics['steps']
            formatted_metrics['HKQuantityTypeIdentifierDistanceWalkingRunning'][hour] = metrics['distance']
            formatted_metrics['HKQuantityTypeIdentifierActiveEnergyBurned'][hour] = metrics['energy']
            formatted_metrics['HKQuantityTypeIdentifierAppleExerciseTime'][hour] = metrics['exercise']
            formatted_metrics['HKQuantityTypeIdentifierFlightsClimbed'][hour] = metrics['flights']
        
        return formatted_metrics
    
    def generate_daily_data(
        self,
        params: GenerationParams,
        date: datetime
        ) -> DailyHealthData:
        """Generate synthetic data for a single day using LLM"""
        try:
            # Determine if this is an active day and get weather
            is_active_day = self._determine_active_day(date, params.activity_level)
            weather = self._get_weather_condition(date)
            
            # Get activity parameters and exercise impacts
            activity_params = ACTIVITY_LEVEL_PARAMS[params.activity_level]
            exercise_impacts = EXERCISE_IMPACTS[params.main_exercise_type]
            
            # Generate metrics using LLM
            date_str = date.strftime("%Y-%m-%d")
            message = generate_daily_metrics(
                date_str,
                activity_params,
                exercise_impacts,
                is_active_day,
                weather
            )
            
            # Transform metrics into HealthKit format
            formatted_metrics = self._transform_metrics(message.parsed)
            
            return DailyHealthData(
                date=date_str,
                metrics=formatted_metrics
            )
            
        except Exception as e:
            logger.error(f"Error generating daily data: {str(e)}")
            raise

class HealthKitAnalyzer:
    """Main class for analyzing HealthKit data"""
    
    def __init__(self, output_dir: Union[str, Path] = './SahhaLLM_Prompting/output'):
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.generator = LLMHealthKitDataGenerator()
    
    def generate_and_analyze(
        self,
        params: GenerationParams
    ) -> Dict:
        """Generate and analyze HealthKit data for the specified period"""
        logger.info(f"Generating data for {params.time_period.value} starting from {params.start_date}")
        
        # Calculate number of days based on time period
        days_mapping = {
            TimePeriod.DAY: 1,
            TimePeriod.WEEK: 7,
            TimePeriod.MONTH: 30
        }
        num_days = days_mapping[params.time_period]
        
        # Generate synthetic data
        synthetic_data = []
        current_date = params.start_date
        for _ in range(num_days):
            try:
                daily_data = self.generator.generate_daily_data(
                    params=params,
                    date=current_date
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
            params.activity_level,
            params.main_exercise_type
        )
        recommendations = rec_message.parsed
        
        # Prepare results
        results = {
            'data': [d.model_dump() for d in synthetic_data],
            'analysis': analysis.model_dump(),
            'recommendations': recommendations.model_dump(),
            'metadata': {
                'generated_at': datetime.now().isoformat(),
                'activity_level': params.activity_level.value,
                'exercise_type': params.main_exercise_type.value,
                'time_period': params.time_period.value,
                'date_range': {
                    'start': params.start_date.isoformat(),
                    'end': (params.start_date + timedelta(days=num_days-1)).isoformat()
                }
            }
        }
        
        # Save results
        output_file = self.output_dir / f'healthkit_analysis_{params.start_date.strftime("%Y%m%d")}.json'
        with open(output_file, 'w') as f:
            json.dump(results, f, indent=2)
        
        logger.info(f"Analysis complete! Results saved to {output_file}")
        return results

def main():
    """Main entry point"""
    try:
        analyzer = HealthKitAnalyzer()
        
        # Example usage with specific parameters
        params = GenerationParams(
            time_period=TimePeriod.WEEK,
            start_date=datetime.now(),
            activity_level=ActivityLevel.ACTIVE,
            main_exercise_type=ExerciseType.CARDIO
        )
        
        results = analyzer.generate_and_analyze(params)
        
        # Print summary
        print("\nAnalysis Summary:")
        print(json.dumps(results, indent=2))
        
    except Exception as e:
        logger.error(f"Error in main execution: {str(e)}")
        raise

if __name__ == "__main__":
    main()