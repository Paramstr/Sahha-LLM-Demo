import React, { useMemo } from 'react';
import {
  LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";

interface DayData {
  date: string;
  metrics: {
    [key: string]: {
      [hour: string]: number;
    };
  };
}

type ProcessedHourData = {
  hour: number;
  steps: number;
  distance: number;
  energy: number;
  exercise: number;
  flights: number;
  normalizedSteps: number;
  normalizedDistance: number;
  normalizedEnergy: number;
  normalizedExercise: number;
  normalizedFlights: number;
};

const normalizeData = (data: number[]): number[] => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  return data.map(val => max === min ? 0 : (val - min) / (max - min));
};

const processDataForDay = (dayData: DayData): ProcessedHourData[] => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const rawData = hours.map(hour => ({
    hour,
    steps: dayData.metrics?.HKQuantityTypeIdentifierStepCount?.[hour] || 0,
    distance: dayData.metrics?.HKQuantityTypeIdentifierDistanceWalkingRunning?.[hour] || 0,
    energy: dayData.metrics?.HKQuantityTypeIdentifierActiveEnergyBurned?.[hour] || 0,
    exercise: dayData.metrics?.HKQuantityTypeIdentifierAppleExerciseTime?.[hour] || 0,
    flights: dayData.metrics?.HKQuantityTypeIdentifierFlightsClimbed?.[hour] || 0,
  }));

  const stepsArray = rawData.map(d => d.steps);
  const distanceArray = rawData.map(d => d.distance);
  const energyArray = rawData.map(d => d.energy);
  const exerciseArray = rawData.map(d => d.exercise);
  const flightsArray = rawData.map(d => d.flights);

  const normalizedSteps = normalizeData(stepsArray);
  const normalizedDistance = normalizeData(distanceArray);
  const normalizedEnergy = normalizeData(energyArray);
  const normalizedExercise = normalizeData(exerciseArray);
  const normalizedFlights = normalizeData(flightsArray);

  return rawData.map((data, i) => ({
    ...data,
    normalizedSteps: normalizedSteps[i],
    normalizedDistance: normalizedDistance[i],
    normalizedEnergy: normalizedEnergy[i],
    normalizedExercise: normalizedExercise[i],
    normalizedFlights: normalizedFlights[i],
  }));
};

interface HealthData {
  data: DayData[];
}

const calculateCorrelations = (data: HealthData) => {
  const metrics = ['steps', 'distance', 'energy', 'exercise', 'flights'];
  const correlationMatrix: number[][] = [];

  metrics.forEach((metric1, i) => {
    correlationMatrix[i] = metrics.map((metric2, j) => {
      if (i === j) return 1;
      
      const allDaysData = data.data.flatMap(day => {
        const processedDay = processDataForDay(day);
        return processedDay.map((hour: ProcessedHourData) => ({
          val1: hour['normalized' + metric1.charAt(0).toUpperCase() + metric1.slice(1) as keyof ProcessedHourData],
          val2: hour['normalized' + metric2.charAt(0).toUpperCase() + metric2.slice(1) as keyof ProcessedHourData]
        }));
      });

      const values1 = allDaysData.map(d => d.val1);
      const values2 = allDaysData.map(d => d.val2);

      const mean1 = values1.reduce((a, b) => a + b, 0) / values1.length;
      const mean2 = values2.reduce((a, b) => a + b, 0) / values2.length;

      const numerator = allDaysData.reduce((acc, curr) => {
        const diff1 = curr.val1 - mean1;
        const diff2 = curr.val2 - mean2;
        return acc + (diff1 * diff2);
      }, 0);

      const denominator = Math.sqrt(
        values1.reduce((a, b) => a + Math.pow(b - mean1, 2), 0) *
        values2.reduce((a, b) => a + Math.pow(b - mean2, 2), 0)
      );

      const correlation = numerator / denominator;

      return isNaN(correlation) ? 0 : correlation;
    });
  });

  return correlationMatrix.map((row, i) => ({
    metric: metrics[i],
    steps: row[0],
    distance: row[1],
    energy: row[2],
    exercise: row[3],
    flights: row[4],
  }));
};



interface DailyMetricsChartProps {
  data: ProcessedHourData[];
  date: string;
}

const DailyMetricsChart = ({ data, date }: DailyMetricsChartProps) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle>{date}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" interval={2} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="normalizedSteps" name="👣 Steps" stroke="#2563eb" dot={false} />
            <Line type="monotone" dataKey="normalizedDistance" name="🏃 Distance" stroke="#16a34a" dot={false} />
            <Line type="monotone" dataKey="normalizedEnergy" name="⚡ Energy" stroke="#dc2626" dot={false} />
            <Line type="monotone" dataKey="normalizedExercise" name="💪 Exercise" stroke="#9333ea" dot={false} />
            <Line type="monotone" dataKey="normalizedFlights" name="🏢 Flights" stroke="#ea580c" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

interface Correlation {
  metric: string;
  steps: number;
  distance: number;
  energy: number;
  exercise: number;
  flights: number;
}

interface CorrelationHeatmapProps {
  correlations: Correlation[];
}

const CorrelationHeatmap = ({ correlations }: CorrelationHeatmapProps) => {
  const metrics = ['steps', 'distance', 'energy', 'exercise', 'flights'];
  const metricIcons = {
    steps: '👣',
    distance: '🏃',
    energy: '⚡',
    exercise: '💪',
    flights: '🏢'
  };
  const getColor = (value: number) => {
    // Map value (-1 to 1) to hue (240 to 0 degrees)
    const hue = (1 - value) * 100; // Blue (240deg) to Green (120deg) to Red (0deg)
    return `hsl(${hue}, 75%, 50%)`;
  };

  const getTextColor = (value: number) => {
    return Math.abs(value) > 0.3 ? 'white' : 'black';
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative rounded-lg overflow-hidden border border-slate-200 bg-white shadow-sm">
        {/* Header row */}
        <div className="grid grid-cols-6 border-b border-slate-200">
          <div className="col-start-2 col-span-5 grid grid-cols-5">
            {metrics.map(metric => (
              <div key={metric} className="flex flex-col items-center justify-center p-2 text-sm font-medium text-slate-700 border-l border-slate-200">
                <span className="text-lg mb-1">{metricIcons[metric as keyof typeof metricIcons]}</span>
                <span className="capitalize">{metric}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Matrix body */}
        <div className="grid grid-cols-6">
          {correlations.map((row) => (
            <React.Fragment key={row.metric}>
              {/* Row header */}
              <div className="flex items-center justify-center p-2 text-sm font-medium text-slate-700 border-b border-slate-200">
                <span className="text-lg mr-2">{metricIcons[row.metric as keyof typeof metricIcons]}</span>
                <span className="capitalize">{row.metric}</span>
              </div>
              
              {/* Correlation cells */}
              {metrics.map(metric => {
                const value = row[metric as keyof Correlation] as number;
                return (
                  <div
                    key={metric}
                    className="aspect-square flex flex-col items-center justify-center border-l border-b border-slate-200 transition-all duration-200 hover:scale-105"
                    style={{ 
                      backgroundColor: getColor(value),
                      color: getTextColor(value)
                    }}
                  >
                    <span className="text-sm font-semibold">
                      {Math.abs(value).toFixed(2)}
                    </span>
                    {value !== 1 && (
                      <span className="text-xs opacity-75">
                        {value > 0 ? '+' : '-'}
                      </span>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-slate-600">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: '#3b82f6' }}></div>
          <span>Strong Negative (-1.0)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: '#cbd5e1' }}></div>
          <span>No Correlation (0.0)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: '#22c55e' }}></div>
          <span>Strong Positive (+1.0)</span>
        </div>
      </div>
    </div>
  );
};


interface HourlyPatternHeatmapProps {
  data: DayData[];
  metric: string;  // Changed from keyof DayData['metrics'] to string
  title: string;
}

const HourlyPatternHeatmap = ({ data, metric, title }: HourlyPatternHeatmapProps) => {
  console.log('Component Mounted with:', {
    dataLength: data?.length,
    metric,
    title,
    sampleDay: data?.[0]
  });

  const processedData = useMemo(() => {
    console.log('Processing data with metric:', metric);
    console.log('First day metrics:', data[0]?.metrics);
    
    return data.map(day => {
      const date = new Date(day.date).toLocaleDateString();
      // Access the metric values directly using the string key
      const metricValues = day.metrics[metric as keyof typeof day.metrics];
      
      console.log(`Processing day ${date}:`, {
        metricKey: metric,
        rawMetricValues: metricValues,
        metricValueType: typeof metricValues,
        isArray: Array.isArray(metricValues)
      });

      // Changed this line to handle object structure
      const hourlyValues = Array(24).fill(0).map((_, hour) => {
        const value = metricValues?.[hour] || 0;
        if (hour === 0) {
          console.log(`Hour ${hour} value:`, {
            raw: metricValues?.[hour],
            processed: value
          });
        }
        return value;
      });
      
      console.log(`Day ${date} processed values:`, {
        firstHour: hourlyValues[0],
        lastHour: hourlyValues[23],
        nonZeroCount: hourlyValues.filter(v => v > 0).length
      });
      
      return {
        date,
        values: hourlyValues
      };
    });
  }, [data, metric]);

  // Find the maximum value across all data for color scaling
  const maxValue = useMemo(() => {
    let max = 0;
    processedData.forEach(day => {
      const dayMax = Math.max(...day.values);
      if (dayMax > max) max = dayMax;
    });
    console.log('Calculated maxValue:', max);
    return max;
  }, [processedData]);

  // Log the first row of processed data before rendering
  console.log('First row to render:', processedData[0]);

  const getColor = (value: number) => {
    // Using a stronger color scale for better visibility
    const intensity = maxValue > 0 ? (value / maxValue) : 0;
    return `hsl(80, ${70 + (intensity * 30)}%, ${100 - (intensity * 80)}%)`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title} - Daily Patterns</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-x-auto">
          <div className="relative rounded-lg overflow-hidden border border-slate-200 bg-white shadow-sm min-w-[1200px]">
            {/* Hours header */}
            <div className="grid grid-cols-[120px_repeat(24,1fr)] border-b border-slate-200">
              <div className="flex items-center justify-center p-1 font-medium text-slate-700">Day</div>
              {Array.from({ length: 24 }, (_, i) => (
                <div key={i} className="flex items-center justify-center p-1 text-sm font-medium text-slate-700 border-l border-slate-200">
                  {i}
                </div>
              ))}
            </div>
            
            {/* Data rows */}
            {processedData.map(({ date, values }) => (
              <div key={date} className="grid grid-cols-[120px_repeat(24,1fr)]">
                <div className="flex items-center justify-center p-1 text-sm font-medium text-slate-700 border-b border-slate-200 whitespace-nowrap">
                  {date}
                </div>
                {values.map((value, hour) => (
                  <div
                    key={hour}
                    className="aspect-square flex items-center justify-center border-l border-b border-slate-200 transition-all duration-200 hover:scale-105 p-1"
                    style={{
                      backgroundColor: getColor(value),
                      color: value / maxValue > 0.5 ? 'white' : 'black'
                    }}
                  >
                    <span className="text-xs font-semibold">
                      {value > 0 ? value.toFixed(0) : ''}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-slate-600">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: getColor(0) }}></div>
              <span>0</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: getColor(maxValue/2) }}></div>
              <span>{(maxValue/2).toFixed(0)}</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: getColor(maxValue) }}></div>
              <span>{maxValue.toFixed(0)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};





interface HealthVisualisationProps {
  data: HealthData;
}

const HealthVisualisation = ({ data }: HealthVisualisationProps) => {
  const correlations = useMemo(() => calculateCorrelations(data), [data]);
  const metrics = [
    {
      key: 'HKQuantityTypeIdentifierStepCount',
      title: '👣 Steps'
    },
    {
      key: 'HKQuantityTypeIdentifierDistanceWalkingRunning',
      title: '🏃 Distance'
    },
    {
      key: 'HKQuantityTypeIdentifierActiveEnergyBurned',
      title: '⚡ Energy'
    },
    {
      key: 'HKQuantityTypeIdentifierAppleExerciseTime',
      title: '💪 Exercise'
    },
    {
      key: 'HKQuantityTypeIdentifierFlightsClimbed',
      title: '🏢 Flights'
    }
  ];

  return (
    <div className="space-y-8 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Health Metrics Correlation Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <CorrelationHeatmap correlations={correlations} />
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="text-center mb-4 py-5">
          <h2 className="text-xl font-bold">Normalised Daily Metrics</h2>
        </div>
        <hr className="my-4 border-t-2 border-gray-700 px-4" />
        {data.data.map((dayData) => {
          const processedData = processDataForDay(dayData);
          const date = new Date(dayData.date).toLocaleDateString();
          return (
            <DailyMetricsChart 
              key={dayData.date}
              data={processedData}
              date={date}
            />
          );
        })}
      </div>

      <div className="space-y-4">
        <div className="text-center mb-4 py-5">
          <h2 className="text-xl font-bold">Daily Activity Patterns</h2>
        </div>
        <hr className="my-4 border-t-2 border-gray-700 px-4" />
        {metrics.map(({ key, title }) => (
          <HourlyPatternHeatmap
            key={key}
            data={data.data}
            metric={key}
            title={title}
          />
        ))}
      </div>
    </div>
  );
};

export default HealthVisualisation;
