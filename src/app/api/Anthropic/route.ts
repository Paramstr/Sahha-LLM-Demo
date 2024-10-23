//src/app/api/Anthropic/route.ts
import { NextResponse } from 'next/server';
import { Anthropic } from '@anthropic-ai/sdk';
import { jsonrepair } from 'jsonrepair';


if (!process.env.ANTHROPIC_API_KEY) {
  throw new Error('Missing ANTHROPIC_API_KEY environment variable');
}

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

function extractTextFromContent(content: any[]): string {
  for (const block of content) {
    if ('text' in block) {
      return block.text;
    }
  }
  throw new Error('No text content found in response');
}



function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export async function POST(req: Request) {
  try {
    console.log("API: Received request");
    const body = await req.json();
    
    if (!body.data || !Array.isArray(body.data)) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }

    const healthData = body.data;
    const profileId = body.profileId || generateUUID();
    const accountId = body.accountId || generateUUID();

    //1.  Enhanced analysis prompt with more detailed requirements
    const analysisPrompt = `Analyze this health data and provide insights in JSON format. Include detailed sections for activity patterns, sleep quality, and mental wellbeing indicators.

    Here's the health data: ${JSON.stringify(healthData)}

    Format the response as valid JSON with these keys:
    {
      "analysis": {
        "daily_patterns": {
          "activity_level": string,
          "peak_hours": string[],
          "sedentary_periods": string[]
        },
        "weekly_trends": {
          "most_active_days": string[],
          "activity_consistency": number,
          "trend_direction": "increasing" | "decreasing" | "stable"
        },
        "notable_observations": string[]
      },
      "recommendations": {
        "activity": {
          "suggested_changes": string[],
          "target_goals": {
            "steps": number,
            "active_hours": number,
            "intense_activity_minutes": number
          }
        },
        "rest": {
          "suggestions": string[],
          "optimal_schedule": {
            "sleep_time": string,
            "wake_time": string
          }
        },
        "improvements": string[]
      },
      "metrics_summary": {
        "average_daily_steps": number,
        "active_hours_per_day": number,
        "activity_score": number,
        "sleep_quality_score": number,
        "stress_level": number
      }
    }`;

    const analysisResponse = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1500,
      messages: [{ role: 'user', content: analysisPrompt }],
      system: "Always respond with valid JSON.",
    });
    let analysisText = extractTextFromContent(analysisResponse.content);

    analysisText = analysisText.replace(/```json\n?|\n?```/g, '').trim();
    const repairedAnalysisJson = jsonrepair(analysisText);
    console.log("API LLM Analysis 1: ", repairedAnalysisJson);
    const analysis = JSON.parse(repairedAnalysisJson);

    // Enhanced Sahha scores prompt with more detailed structure
    //2. Sahha score generation
    const scorePrompt = `Based on this health data and analysis, generate 4 daily Sahha activity scores for each day in the data, following the official Sahha format. Include activity scores with detailed factors.

    Use this exact format:
    {
      "scores": [
        {
          "id": string (UUID),
          "profileId": string (UUID),
          "accountId": string (UUID),
          "type": "activity",
          "score": number (0.0 to 1.0),
          "state": "minimal" | "low" | "medium" | "high",
          "factors": [
            {
              "name": string,
              "value": number,
              "goal": number,
              "unit": string,
              "score": number (0.0 to 1.0),
              "state": "minimal" | "low" | "medium" | "high"
            }
          ],
          "dataSources": string[],
          "scoreDateTime": string (ISO datetime),
          "version": 1.0
        }
      ]
    }

    For each day, generate 4 activity scores at these times: 06:00, 12:00, 18:00, and 23:59.

    For activity scores, include these factors:
    - steps (unit: count, goal: 10000)
    - active_hours (unit: hour, goal: 12)
    - active_calories (unit: kcal, goal: 500)
    - intense_activity_duration (unit: minute, goal: 30)
    - extended_inactivity (unit: hour, goal: 240)
    - floors_climbed (unit: floor, goal: 10)

    Adjust the factor values and scores progressively throughout the day to reflect the raw health data provided.

    Health Data: ${JSON.stringify(healthData)}
    Analysis: ${JSON.stringify(analysis)}
    Profile ID: ${profileId}
    Account ID: ${accountId}`;

    const scoreResponse = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1500,
      messages: [{ role: 'user', content: scorePrompt }],
      system: "Always respond with valid JSON without any markdown formatting.",
    });

    let scores;
    let scoresText = extractTextFromContent(scoreResponse.content);
    console.log("API LLM Scores: ", scoresText);
    // Remove potential markdown code block formatting
    scoresText = scoresText.replace(/```json\n?|\n?```/g, '').trim();

    try {
      scores = JSON.parse(scoresText);
      console.log("API LLM Scores: ", JSON.stringify(scores));
    } catch (error) {
      console.error("Failed to parse JSON. Attempting repair.");
      const repairedScoresJson = jsonrepair(scoresText);
      console.log("API LLM Scores (repaired): ", repairedScoresJson);
      scores = JSON.parse(repairedScoresJson);
    }

    // Add biomarkers based on the analysis
    const biomarkersPrompt = `Based on the health data and analysis, generate digital biomarkers that indicate health patterns and risks. Format as JSON:
    {
      "biomarkers": [
        {
          "id": string (UUID),
          "profileId": string (UUID),
          "type": string,
          "value": number,
          "unit": string,
          "referenceRange": {
            "min": number,
            "max": number
          },
          "status": "normal" | "elevated" | "low",
          "confidence": number (0.0 to 1.0),
          "detectedAt": string (ISO datetime),
          "source": string,
          "metadata": {
            "algorithm_version": string,
            "data_quality": number (0.0 to 1.0)
          }
        }
      ]
    }

    Health Data: ${JSON.stringify(healthData)}
    Analysis: ${JSON.stringify(analysis)}`;

    // const biomarkersResponse = await anthropic.messages.create({
    //   model: 'claude-3-sonnet-20240229',
    //   max_tokens: 1000,
    //   messages: [{ role: 'user', content: biomarkersPrompt }],
    //   system: "Always respond with valid JSON without any markdown formatting.",
    // });

    // let biomarkersText = extractTextFromContent(analysisResponse.content);
    // biomarkersText = biomarkersText.replace(/```json\n?|\n?```/g, '').trim();
    // const repairedBiomarkersJson = jsonrepair(biomarkersText);
    // console.log("API LLM Biomarkers: ", repairedBiomarkersJson);
    // const biomarkers = JSON.parse(repairedBiomarkersJson);

    return NextResponse.json({
      sahhaScores: scores,
      // biomarkers: biomarkers,
      analysis: analysis,
      metadata: {
        generated_at: new Date().toISOString(),
        data_range: {
          start: healthData[0].date,
          end: healthData[healthData.length - 1].date
        },
        version: "1.0",
        data_quality: {
          completeness: analysis.metrics_summary.data_quality || 0.8,
          confidence: 0.85
        }
      }
    });

  } catch (error) {
    console.error('Error processing request:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack
      });
    }
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'An error occurred processing health data'
    }, { status: 500 });
  }
}
