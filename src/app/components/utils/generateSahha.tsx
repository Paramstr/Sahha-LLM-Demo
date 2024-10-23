// /app/components/generateSahha.tsx
export async function generateSahha(rawData: RawHealthData[]) {
    try {
      console.log('Sending raw data:', rawData); // Debug log
  
      const response = await fetch('/api/Anthropic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rawData),
      });
  
      // Get the response text first
      const responseText = await response.text();
      console.log("Response text:", response);
      //to parse it as JSON

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse response as JSON:', responseText);
        throw new Error(
          'Server returned invalid JSON. This might be a server error. Check the console for details.'
        );
      }
  
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
  
      // For debugging purposes
      console.log('Sahha data generated:', data);
      
      return {
        success: true,
        data: data
      };
  
    } catch (error) {
      console.error('Error processing request:', error);
      if (error instanceof Error) {
        console.error('Error details:', {
          message: error.message,
          stack: error.stack
        });
      }
      return { 
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred processing health data'
      };
    }
  }
  
  // Types
  export type RawHealthData = {
    date: string;
    metrics: {
      [key: string]: {
        [hour: string]: number;
      };
    };
  };
  
  export type SahhaAnalysis = {
    [date: string]: {
      raw_data_processing: {
        steps: { calculation: string; key_observations: string[] };
        active_calories: { calculation: string; key_observations: string[] };
        exercise_time: { calculation: string; key_observations: string[] };
        flights_climbed: { calculation: string; key_observations: string[] };
        activity_distribution: { calculation: string; key_observations: string[] };
      };
      score_justification: {
        overall_score: string;
        key_influences: string[];
      };
    };
  };
  
  export type SahhaScore = {
    id: string;
    profileId: string;
    accountId: string;
    externalId: string;
    type: string;
    score: number;
    state: string;
    factors: Array<{
      name: string;
      value: number;
      goal: number;
      unit: string;
      score: number;
      state: string;
    }>;
    dataSources: string[];
    scoreDateTime: string;
    createdAt: string;
    version: number;
  };
