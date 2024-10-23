import { Anthropic } from '@anthropic-ai/sdk';
import { type } from 'os';

// Types for raw and processed data
type RawHealthData = {
  date: string;
  metrics: {
    [key: string]: {
      [hour: string]: number;
    };
  };
};

type SahhaAnalysis = {
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

type SahhaScore = {
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

// Main processing function
export async function generateSahha(rawData: RawHealthData[]) {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const sahhaScores: SahhaScore[] = [];
  const analyses: SahhaAnalysis = {};

  // Process each day's data
  for (const dayData of rawData) {
    // Generate analysis prompt
    const analysisPrompt = `Analyze this HealthKit data for ${dayData.date} and explain how it maps to Sahha activity score factors. Format response as JSON with raw_data_processing and score_justification sections: ${JSON.stringify(dayData.metrics)}`;

    // Get analysis from Claude
    const analysisResponse = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1000,
      messages: [{ role: 'user', content: analysisPrompt }],
    });
    console.log(analysisResponse);

    const responseText = analysisResponse.content[0]

    // const parsedResponse = JSON.parse(responseText) as SahhaAnalysis;
    // analyses[dayData.date] = parsedResponse;



    // Generate Sahha score prompt using analysis
    // const scorePrompt = `Based on this analysis, generate a Sahha activity score JSON following this format but with appropriate values based on the analysis: ${JSON.stringify({
    //   id: 'example',
    //   factors: [
    //     { name: 'steps', goal: 10000 },
    //     { name: 'active_hours', goal: 12 },
    //     { name: 'active_calories', goal: 500 },
    //     { name: 'intense_activity_duration', goal: 30 },
    //     { name: 'extended_inactivity', goal: 240 },
    //     { name: 'floors_climbed', goal: 10 }
    //   ]
    // })}. Analysis: ${JSON.stringify(analysis)}`;

    // Get Sahha score from Claude
    // const scoreResponse = await anthropic.messages.create({
    //   model: 'claude-3-sonnet-20240229',
    //   max_tokens: 1000,
    //   messages: [{ role: 'user', content: scorePrompt }],
    // });

    // const sahhaScore = JSON.parse(scoreResponse.content[0].text);
    // sahhaScores.push(sahhaScore);
  }

  return {
    sahhaScores: {
      scores: sahhaScores,
      metadata: {
        generated_at: new Date().toISOString(),
        data_range: {
          start: rawData[0].date,
          end: rawData[rawData.length - 1].date
        }
      }
    },
    analyses
  };
}
