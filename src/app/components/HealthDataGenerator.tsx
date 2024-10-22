// components/HealthDataGenerator.tsx
import React, { useState } from 'react';
import { Calendar, Database, ChevronDown, ChevronUp } from "lucide-react";
import { Switch } from "../components/ui/switch";
import { Header } from './DataComparisonComponents';
import ReactJson from 'react-json-view';

const ConfigSection = () => {
  const [timePeriod, setTimePeriod] = useState('day');
  const [startDate, setStartDate] = useState('');
  const [activityLevel, setActivityLevel] = useState('active');
  const [mainExerciseType, setMainExerciseType] = useState('cardio');
  const [generatedData, setGeneratedData] = useState<any>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const generateData = () => {
    const mockData = {
      summary: `Generated synthetic HealthKit data for an ${activityLevel} individual for a ${timePeriod} starting ${startDate || 'today'}, focusing on ${mainExerciseType} exercise.`,
      synthetic_data: {
        "2024-07-20": {
          "HKQuantityTypeIdentifierFlightsClimbed": {
            "8": 1.0, "18": 2.0
          },
          "HKQuantityTypeIdentifierDistanceWalkingRunning": {
            "17": 7.2
          },
          "HKQuantityTypeIdentifierActiveEnergyBurned": {
            "12": 150,
            "15": 200,
            "18": 175
          },
          "HKQuantityTypeIdentifierStepCount": {
            "8": 1200,
            "12": 2500,
            "15": 3000,
            "18": 2800
          }
        }
      }
    };
    setGeneratedData(mockData);
    setIsExpanded(true);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">CONFIGURATION</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Time Period</label>
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="w-full p-2 bg-gray-100 rounded-lg border-0 text-sm"
          >
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Start Date</label>
          <div className="relative">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 bg-gray-100 rounded-lg border-0 text-sm"
            />
            <Calendar className="absolute right-2 top-2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Activity Level</label>
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
            className="w-full p-2 bg-gray-100 rounded-lg border-0 text-sm"
          >
            <option value="very_active">Very Active</option>
            <option value="active">Active</option>
            <option value="moderately_active">Moderately Active</option>
            <option value="sedentary_but_walking">Sedentary but Walking</option>
            <option value="sedentary">Sedentary</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Main Exercise Type</label>
          <select
            value={mainExerciseType}
            onChange={(e) => setMainExerciseType(e.target.value)}
            className="w-full p-2 bg-gray-100 rounded-lg border-0 text-sm"
          >
            <option value="strength_training">Strength Training</option>
            <option value="cardio">Cardio</option>
            <option value="pilates/yoga">Pilates/Yoga</option>
            <option value="hiit">HIIT</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>

      <button
        onClick={generateData}
        className="w-full bg-black text-white p-3 rounded-xl hover:bg-gray-800 transition-colors mt-4"
      >
        Generate Data
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