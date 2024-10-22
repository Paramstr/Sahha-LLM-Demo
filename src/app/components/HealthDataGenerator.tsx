import React, { useState } from 'react';
import { Calendar, Database, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { Switch } from "../components/ui/switch";
import { Header } from './DataComparisonComponents';
import ReactJson from 'react-json-view';

// Add this type definition at the top of your file or in a separate types file
type ActivityLevel = 'very_active' | 'active' | 'moderately_active' | 'sedentary_but_walking' | 'sedentary';

const ConfigSection = () => {
  const today = new Date().toISOString().split('T')[0];
  
  const [timePeriod, setTimePeriod] = useState('day');
  const [startDate, setStartDate] = useState(today);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('active');
  const [mainExerciseType, setMainExerciseType] = useState('cardio');
  const [generatedData, setGeneratedData] = useState<any>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const processHealthData = async (config: {
    activityLevel: ActivityLevel;
    timePeriod: string;
    startDate: string;
    mainExerciseType: string;
  }) => {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Example processing logic based on activity level
    const baseSteps = {
      'very_active': 12000,
      'active': 8000,
      'moderately_active': 6000,
      'sedentary_but_walking': 4000,
      'sedentary': 2000
    }[config.activityLevel];

    const baseCalories: Record<ActivityLevel, number> = {
      'very_active': 800,
      'active': 600,
      'moderately_active': 400,
      'sedentary_but_walking': 200,
      'sedentary': 100
    };

    const baseCaloriesValue = baseCalories[config.activityLevel];

    // Generate hourly data with some variation
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const stepData: Record<number, number> = {};
    const calorieData: Record<number, number> = {};
    const distanceData: Record<number, number> = {};
    const flightsData: Record<number, number> = {};

    hours.forEach(hour => {
      // Add random variation to base values
      const variation = 0.2; // 20% variation
      const timeOfDayFactor = Math.sin((hour - 6) * Math.PI / 12) * 0.5 + 0.5; // Peak at midday
      
      const hourlySteps = Math.round(
        (baseSteps / 24) * timeOfDayFactor * (1 + (Math.random() - 0.5) * variation)
      );
      
      const hourlyCalories = Math.round(
        (baseCaloriesValue / 24) * timeOfDayFactor * (1 + (Math.random() - 0.5) * variation)
      );

      if (hourlySteps > 0) stepData[hour] = hourlySteps;
      if (hourlyCalories > 0) calorieData[hour] = hourlyCalories;
      
      // Generate distance data (roughly 0.7m per step)
      if (hourlySteps > 0) {
        distanceData[hour] = parseFloat((hourlySteps * 0.0007).toFixed(2));
      }

      // Random flights of stairs (more likely during active hours)
      if (timeOfDayFactor > 0.5 && Math.random() > 0.7) {
        flightsData[hour] = Math.round(Math.random() * 3 + 1);
      }
    });

    return {
      summary: `Generated synthetic HealthKit data for an ${config.activityLevel} individual for a ${config.timePeriod} starting ${config.startDate}, focusing on ${config.mainExerciseType} exercise.`,
      synthetic_data: {
        [config.startDate]: {
          "HKQuantityTypeIdentifierStepCount": stepData,
          "HKQuantityTypeIdentifierActiveEnergyBurned": calorieData,
          "HKQuantityTypeIdentifierDistanceWalkingRunning": distanceData,
          "HKQuantityTypeIdentifierFlightsClimbed": flightsData
        }
      }
    };
  };

  const generateData = async () => {
    setIsGenerating(true);
    try {
      const config = {
        timePeriod,
        startDate,
        activityLevel,
        mainExerciseType
      };
      
      const processedData = await processHealthData(config);
      setGeneratedData(processedData);
      setIsExpanded(true);
    } catch (error) {
      console.error('Error generating data:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsGenerating(false);
    }
  };


  return (
    <div className="space-y-4">
      <h3 className="font-semibold">CONFIGURATION</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Time Period</label>
          <div className="relative">
            <select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="w-full p-2 pr-12 bg-gray-100 rounded-lg border-0 text-sm appearance-none"
            >
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Start Date</label>
          <div className="relative">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 pr-4 bg-gray-100 rounded-lg border-0 text-sm"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Activity Level</label>
          <div className="relative">
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
              className="w-full p-2 pr-12 bg-gray-100 rounded-lg border-0 text-sm appearance-none"
            >
              <option value="very_active">Very Active <span className="text-gray-500">(5-7 days/week)</span></option>
              <option value="active">Active <span className="text-gray-500">(3-5 days/week)</span></option>
              <option value="moderately_active">Moderately Active <span className="text-gray-500">(2-3 days/week)</span></option>
              <option value="sedentary_but_walking">Sedentary but Walking <span className="text-gray-500">(Light walking, 1-2 days/week)</span></option>
              <option value="sedentary">Sedentary <span className="text-gray-500">(Minimal activity)</span></option>
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Main Exercise Type</label>
          <div className="relative">
            <select
              value={mainExerciseType}
              onChange={(e) => setMainExerciseType(e.target.value)}
              className="w-full p-2 pr-12 bg-gray-100 rounded-lg border-0 text-sm appearance-none"
            >
              <option value="strength_training">Strength Training</option>
              <option value="cardio">Cardio</option>
              <option value="pilates/yoga">Pilates/Yoga</option>
              <option value="hiit">HIIT</option>
              <option value="none">None</option>
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={generateData}
        disabled={isGenerating}
        className="w-full bg-black text-white p-3 rounded-xl hover:bg-gray-800 transition-colors mt-4 flex items-center justify-center"
      >
        {isGenerating ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          'Generate Data'
        )}
      </button>

      {generatedData && (
        <div className="mt-8">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-2 text-sm font-medium mb-2"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
            <span>Raw Data View</span>
          </button>

          {isExpanded && (
            <div className="grid md:grid-cols-2 gap-6 bg-gray-100 p-4 rounded-xl">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Summary</h4>
                <div className="bg-white rounded-lg p-4 h-[400px] overflow-y-auto">
                  <ReactJson
                    src={generatedData}
                    theme="rjv-default"
                    displayDataTypes={false}
                    name={false}
                    collapsed={1}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Synthetic Data</h4>
                <div className="bg-white rounded-lg p-4 h-[400px] overflow-y-auto">
                  <ReactJson
                    src={generatedData.synthetic_data}
                    theme="rjv-default"
                    displayDataTypes={false}
                    name={false}
                    collapsed={1}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const HealthDataGenerator = () => {
  return (
    <div className="bg-[#333332] rounded-2xl p-4 md:p-8 mb-8">
      <div className="bg-white font-mono rounded-2xl shadow-md overflow-hidden">
        <div className="p-6">
          <Header icon={<Database className="h-6 w-6" />} title="Dataset Generator" />
          <ConfigSection />
        </div>
      </div>
    </div>
  );
};
