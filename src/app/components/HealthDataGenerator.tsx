import React, { useState } from 'react';
import { Database, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import ReactJson from 'react-json-view';
import { Header } from './DataComparisonComponents';

// Match exact values expected by Python script
type ActivityLevel = 'very_active' | 'active' | 'moderately_active' | 'sedentary';
type ExerciseType = 'strength_training' | 'cardio' | 'pilates_yoga' | 'hiit';

const ConfigSection = () => {
  const [activity_level, setActivityLevel] = useState<ActivityLevel>('moderately_active');
  const [exercise_type, setExerciseType] = useState<ExerciseType>('cardio');
  const [days, setDays] = useState(7);
  const [generatedData, setGeneratedData] = useState<any>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateData = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/generate_health', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          activity_level,
          exercise_type,
          days
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setGeneratedData(data);
      setIsExpanded(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate data');
      console.error('Error generating data:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">CONFIGURATION</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Activity Level</label>
          <div className="relative">
            <select
              value={activity_level}
              onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
              className="w-full p-2 bg-gray-100 rounded-lg border-0 text-sm appearance-none"
            >
              <option value="very_active">Very Active</option>
              <option value="active">Active</option>
              <option value="moderately_active">Moderately Active</option>
              <option value="sedentary">Sedentary</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Exercise Type</label>
          <div className="relative">
            <select
              value={exercise_type}
              onChange={(e) => setExerciseType(e.target.value as ExerciseType)}
              className="w-full p-2 bg-gray-100 rounded-lg border-0 text-sm appearance-none"
            >
              <option value="strength_training">Strength Training</option>
              <option value="cardio">Cardio</option>
              <option value="pilates_yoga">Pilates/Yoga</option>
              <option value="hiit">HIIT</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Number of Days</label>
          <input
            type="number"
            value={days}
            onChange={(e) => setDays(parseInt(e.target.value))}
            min="1"
            max="30"
            className="w-full p-2 bg-gray-100 rounded-lg border-0 text-sm"
          />
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

      {error && (
        <div className="text-red-500 text-sm mt-2">
          Error: {error}
        </div>
      )}

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
            <span>Generated Data</span>
          </button>

          {isExpanded && (
            <div className="bg-gray-100 p-4 rounded-xl">
              <ReactJson
                src={generatedData}
                theme="rjv-default"
                displayDataTypes={false}
                name={false}
                collapsed={1}
              />
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

export default HealthDataGenerator;