import React, { useMemo } from 'react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/app/components/ui/card";

interface DayData {
  date: string; // Add this line
  metrics: {
    HKQuantityTypeIdentifierStepCount?: number[];
    HKQuantityTypeIdentifierDistanceWalkingRunning?: number[];
    HKQuantityTypeIdentifierActiveEnergyBurned?: number[];
    HKQuantityTypeIdentifierAppleExerciseTime?: number[];
    HKQuantityTypeIdentifierFlightsClimbed?: number[];
  };
}

// Define a type for the processed data
type ProcessedHourData = {
  hour: number;
  steps: number;
  distance: number;
  energy: number;
  exercise: number;
  flights: number;
};

const processDataForDay = (dayData: DayData): ProcessedHourData[] => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  return hours.map(hour => ({
    hour,
    steps: dayData.metrics?.HKQuantityTypeIdentifierStepCount?.[hour] || 0,
    distance: dayData.metrics?.HKQuantityTypeIdentifierDistanceWalkingRunning?.[hour] || 0,
    energy: dayData.metrics?.HKQuantityTypeIdentifierActiveEnergyBurned?.[hour] || 0,
    exercise: dayData.metrics?.HKQuantityTypeIdentifierAppleExerciseTime?.[hour] || 0,
    flights: dayData.metrics?.HKQuantityTypeIdentifierFlightsClimbed?.[hour] || 0,
  }));
};

// Define the type for the data parameter
interface HealthData {
  data: DayData[];
}

const calculateCorrelations = (data: HealthData) => {
  const metrics = ['steps', 'distance', 'energy', 'exercise', 'flights'];
  const correlationMatrix: number[][] = []; // Explicitly define the type

  metrics.forEach((metric1, i) => {
    correlationMatrix[i] = metrics.map((metric2, j) => {
      if (i === j) return 1;
      
      const allDaysData = data.data.flatMap(day => {
        const processedDay = processDataForDay(day);
        return processedDay.map((hour: ProcessedHourData) => ({
          val1: hour[metric1 as keyof ProcessedHourData],
          val2: hour[metric2 as keyof ProcessedHourData]
        }));
      });

      const values1 = allDaysData.map(d => d.val1);
      const values2 = allDaysData.map(d => d.val2);

      const mean1 = values1.reduce((a, b) => a + b, 0) / values1.length;
      const mean2 = values2.reduce((a, b) => a + b, 0) / values2.length;

      const correlation = allDaysData.reduce((acc, curr) => {
        const diff1 = curr.val1 - mean1;
        const diff2 = curr.val2 - mean2;
        return acc + (diff1 * diff2);
      }, 0) / Math.sqrt(
        values1.reduce((a, b) => a + Math.pow(b - mean1, 2), 0) *
        values2.reduce((a, b) => a + Math.pow(b - mean2, 2), 0)
      );

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
  title: string;
  dataKey: keyof ProcessedHourData;
  color: string;
}

const DailyMetricsChart = ({ data, title, dataKey, color }: DailyMetricsChartProps) => (
  <div className="h-32">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="hour" interval={3} />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey={dataKey} stroke={color} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  </div>
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
  const getColor = (value: number) => {
    const intensity = Math.floor((value + 1) * 127.5); // Map -1 to 1 to 0 to 255
    return `rgb(${255 - intensity}, ${255 - intensity}, 255)`;
  };

  return (
    <div className="grid grid-cols-6 gap-1 text-xs">
      <div className="col-start-2 col-span-5 grid grid-cols-5 gap-1">
        {metrics.map(metric => (
          <div key={metric} className="text-center font-semibold">
            {metric}
          </div>
        ))}
      </div>
      {correlations.map((row, i) => (
        <React.Fragment key={row.metric}>
          <div className="font-semibold">{row.metric}</div>
          {metrics.map(metric => (
            <div
              key={metric}
              className="p-2 text-center"
              style={{ 
                backgroundColor: getColor(row[metric as keyof Correlation] as number),
                color: (row[metric as keyof Correlation] as number) > 0 ? 'white' : 'black'
              }}
            >
              {(row[metric as keyof Correlation] as number).toFixed(2)}
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

interface HealthVisualisationProps {
  data: HealthData;
}

const HealthVisualisation = ({ data }: HealthVisualisationProps) => {
  const correlations = useMemo(() => calculateCorrelations(data), [data]);

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data.data.map((dayData, index) => {
          const processedData = processDataForDay(dayData);
          const date = new Date(dayData.date).toLocaleDateString();

          return (
            <Card key={dayData.date} className="w-full">
              <CardHeader>
                <CardTitle>{date}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <DailyMetricsChart 
                  data={processedData} 
                  title="Steps" 
                  dataKey="steps" 
                  color="#2563eb" 
                />
                <DailyMetricsChart 
                  data={processedData} 
                  title="Distance" 
                  dataKey="distance" 
                  color="#16a34a" 
                />
                <DailyMetricsChart 
                  data={processedData} 
                  title="Energy" 
                  dataKey="energy" 
                  color="#dc2626" 
                />
                <DailyMetricsChart 
                  data={processedData} 
                  title="Exercise" 
                  dataKey="exercise" 
                  color="#9333ea" 
                />
                <DailyMetricsChart 
                  data={processedData} 
                  title="Flights" 
                  dataKey="flights" 
                  color="#ea580c" 
                />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default HealthVisualisation;
