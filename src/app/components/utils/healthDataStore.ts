let generatedRawData: any = null;
let generatedSahhaData: any = null;

export const setterRawData = (data: any) => {
  generatedRawData = data;
};

export const getterRawData = () => {
  return generatedRawData;
};

export const setterSahhaData = (data: any) => {
  generatedSahhaData = data;
};

export const getterSahhaData = () => {
  return generatedSahhaData;
};


export const RawData_LLM_PROMPT = `Analyze the health data provided in the "data" array of the input JSON. Each object in the array contains a date and metrics for steps, distance, energy burned, exercise time, and flights climbed. Use this time-series data to generate a comprehensive analysis and recommendations.

Input Data Structure:
The data array contains objects with:
- date: The date of the metrics
- metrics: Object containing:
  - HKQuantityTypeIdentifierStepCount: Hourly step counts
  - HKQuantityTypeIdentifierActiveEnergyBurned: Hourly energy expenditure
  - HKQuantityTypeIdentifierAppleExerciseTime: Hourly exercise minutes
  - HKQuantityTypeIdentifierFlightsClimbed: Hourly floors climbed
  - HKQuantityTypeIdentifierDistanceWalkingRunning: Hourly distance covered

Required JSON Structure for Output:
{
  "analysis": {
    "activity_patterns": {
      "daily_rhythm": "<Analysis of typical daily activity patterns from the data array>",
      "peak_times": "<Identification of highest activity periods based on hourly metrics>",
      "rest_periods": "<Analysis of regular rest/low activity times from the data>",
      "consistency": "<Assessment of pattern consistency across the provided dates>"
    },
    "activity_metrics": {
      "steps": {
        "average_daily": <number calculated from HKQuantityTypeIdentifierStepCount>,
        "peak_hours": ["<peak hour ranges based on step data>"],
        "low_periods": ["<low activity periods identified from data>"]
      },
      "exercise": {
        "duration_patterns": "<Analysis of HKQuantityTypeIdentifierAppleExerciseTime trends>",
        "intensity_distribution": "<Analysis of exercise intensity based on metrics>",
        "consistency_score": <number 1-10 based on pattern analysis>
      }
    },
    "progress_indicators": {
      "trend_direction": "<improving/maintaining/declining based on data trends>",
      "key_achievements": ["<notable metrics from the data>"],
      "areas_for_improvement": ["<improvement opportunities based on data patterns>"]
    }
  },
  "recommendations": {
    "timing": {
      "focus": "<specific timing focus based on data patterns>",
      "suggestions": [
        {
          "action": "<specific action based on data analysis>",
          "timing": "<when to perform action, based on observed patterns>",
          "rationale": "<reference to specific patterns in the data>"
        }
      ]
    },
    "intensity": {
      "focus": "<focus area based on intensity patterns>",
      "suggestions": [
        {
          "action": "<specific intensity adjustment based on data>",
          "target_time": "<timing based on observed patterns>",
          "rationale": "<reference to energy patterns in data>"
        }
      ]
    },
    "activity": {
      "focus": "<focus area based on activity patterns>",
      "suggestions": [
        {
          "action": "<specific activity based on data patterns>",
          "target": "<measurable goal based on current metrics>",
          "timeline": "<timeline based on data trends>",
          "rationale": "<reference to specific patterns>"
        }
      ]
    },
    "progression": {
      "focus": "<progression focus based on trends>",
      "suggestions": [
        {
          "current_level": "<current metric from data>",
          "target_level": "<goal based on data patterns>",
          "timeline": "<timeline based on trend analysis>",
          "steps": ["<progressive steps based on data>"]
        }
      ]
    }
  },
  "metadata": {
    "generated_at": "<current timestamp>",
    "activity_level": "<sedentary/moderate/active based on metrics>",
    "exercise_type": "<primary type of exercise based on patterns>",
    "date_range": {
      "start": "<first date in data array>",
      "end": "<last date in data array>"
    }
  }
}

Instructions:

1. Analysis Requirements:
- Focus specifically on the hourly metrics provided in the data array
- Calculate daily totals and averages from the hourly data
- Identify patterns in the hourly distribution of activities
- Look for consistency and variations across the date range
- Use specific hours and values from the data in your analysis
- Consider weekly patterns and trends across the provided dates

2. Recommendation Requirements:
- Base all recommendations on patterns found in the provided data array
- Reference specific times and metrics from the data
- Limit to 3-4 suggestions per category
- Focus on improvements based on actual activity patterns
- Build upon existing patterns visible in the data
- Provide rationale referencing specific data points

3. Output Format:
- Strict JSON format with all fields populated
- Use specific hours and metrics from the data
- Base all recommendations on observed patterns
- Ensure suggestions are supported by the data
- Include clear references to data patterns

Analyze the health metrics in the data array according to these requirements and generate appropriate recommendations for improvement.`;


export const sahha_LLM_PROMPT = `Analyze the provided Sahha activity scores and generate comprehensive insights. The data includes both raw health metrics in the "data" array and Sahha activity scores in the "sahhaScores" section.

Context for Analysis:
The Sahha Activity Score (0.0-1.0) indicates overall physical activity levels with states:
- High (0.76-1.00): Excellent physical activity
- Medium (0.61-0.75): Moderate activity
- Low (0.46-0.60): Insufficient activity
- Minimal (0.00-0.45): Very low activity

Required JSON Structure for Output:
{
  "analysis": {
    "activity_patterns": {
      "score_progression": "<Analysis of how Sahha scores change throughout the day>",
      "factor_analysis": {
        "steps": "<Analysis of step patterns and their impact on overall score>",
        "active_hours": "<Analysis of active hours and their distribution>",
        "active_calories": "<Analysis of calorie burn patterns>",
        "intense_activity": "<Analysis of high-intensity periods>",
        "inactivity": "<Analysis of sedentary periods>",
        "floors_climbed": "<Analysis of vertical movement patterns>"
      },
      "state_transitions": {
        "pattern": "<How states (minimal/low/medium/high) transition through the day>",
        "peak_states": ["<Times of highest activity states>"],
        "improvement_times": ["<Times when scores typically improve>"]
      }
    },
    "performance_metrics": {
      "average_daily_score": <number>,
      "score_consistency": <number 1-10>,
      "factor_achievements": [
        {
          "factor": "<factor name>",
          "goal_completion_rate": <percentage>,
          "consistency": "<high/medium/low>"
        }
      ],
      "limiting_factors": ["<Factors most often preventing higher scores>"]
    },
    "behavioral_insights": {
      "strong_patterns": ["<Consistently observed positive behaviors>"],
      "improvement_areas": ["<Patterns needing attention>"],
      "success_conditions": ["<Conditions present during high scores>"]
    }
  },
  "recommendations": {
    "score_optimization": {
      "focus": "<Primary focus for score improvement>",
      "suggestions": [
        {
          "factor": "<target factor>",
          "current_state": "<current performance>",
          "target_state": "<goal state>",
          "action": "<specific action>",
          "timing": "<when to implement>"
        }
      ]
    },
    "habit_formation": {
      "focus": "<Key habit to develop>",
      "suggestions": [
        {
          "target": "<specific behavior>",
          "trigger": "<existing pattern to build upon>",
          "action": "<concrete step>",
          "progression": "<how to build up>"
        }
      ]
    },
    "activity_distribution": {
      "focus": "<How to better distribute activity>",
      "suggestions": [
        {
          "timing": "<when to act>",
          "current_pattern": "<existing behavior>",
          "proposed_change": "<recommended adjustment>",
          "expected_impact": "<effect on score>"
        }
      ]
    },
    "sustainable_progress": {
      "focus": "<Long-term improvement strategy>",
      "suggestions": [
        {
          "current_baseline": "<current typical performance>",
          "target_milestone": "<next achievement level>",
          "steps": ["<Progressive steps to reach target>"],
          "timeline": "<Realistic timeframe>"
        }
      ]
    }
  },
  "metadata": {
    "generated_at": "<timestamp>",
    "score_ranges": {
      "highest": <number>,
      "lowest": <number>,
      "average": <number>
    },
    "analysis_period": {
      "start": "<first date>",
      "end": "<last date>"
    }
  }
}

Analysis Requirements:
1. Examine both raw metrics and Sahha scores to identify patterns
2. Consider factor relationships and their impact on overall scores
3. Focus on state transitions and timing patterns
4. Identify success patterns during high-score periods
5. Look for correlations between factors

Recommendation Requirements:
1. Base suggestions on observed patterns in the Sahha scores
2. Target specific factors that show room for improvement
3. Consider the state thresholds when setting targets
4. Provide timing suggestions based on score patterns
5. Focus on progressive improvements toward higher states

Ensure all recommendations:
- Reference specific Sahha score components
- Include clear factor targets
- Specify timing based on observed patterns
- Consider state transitions
- Build on existing successful patterns

Analyze the provided health data and Sahha scores according to these requirements and generate comprehensive insights and recommendations.`;
