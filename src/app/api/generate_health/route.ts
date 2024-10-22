// src/app/api/generate_health/route.ts
import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { activity_level = "moderately_active", exercise_type = "cardio", days = 7 } = body;
    
    console.log('\n--- API Route Debug Info ---');
    console.log('Received request with body:', body);

    const pythonScriptPath = path.resolve('./SahhaLLM_Prompting/sahhaLLM-algo.py');
    const absolutePath = path.resolve(pythonScriptPath);
    console.log('Python script absolute path:', absolutePath);

    // Check if file exists
    if (!fs.existsSync(absolutePath)) {
      console.error('Python script not found at path:', absolutePath);
      return NextResponse.json(
        { error: 'Python script not found' },
        { status: 500 }
      );
    }

    console.log('Python script exists at specified path');
    console.log('Current working directory:', process.cwd());

    return new Promise((resolve, reject) => {
      console.log('\nSpawning Python process...');
      console.log('Command:', 'python3', [pythonScriptPath, activity_level, exercise_type, String(days)]);
      
      const pythonProcess = spawn('python3', [pythonScriptPath, activity_level, exercise_type, String(days)]);

      let result = '';
      let errorMessage = '';
      let debugLog: {
        stdout: string[];
        stderr: string[];
        exitCode: number | null;
        startTime: string;
        endTime: string | null;
      } = {
        stdout: [],
        stderr: [],
        exitCode: null,
        startTime: new Date().toISOString(),
        endTime: null
      };

      pythonProcess.stdout.on('data', (data) => {
        const output = data.toString();
        console.log('Python stdout:', output);
        result += output;
        debugLog.stdout.push(output);
      });

      pythonProcess.stderr.on('data', (data) => {
        const error = data.toString();
        console.log('Python stderr:', error);
        errorMessage += error;
        debugLog.stderr.push(error);
      });

      pythonProcess.on('error', (error) => {
        console.error('Failed to start Python process:', error);

        resolve(NextResponse.json(
          {
            error: 'Failed to start Python process',
            details: error.message,
            debug: debugLog
          },
          { status: 500 }
        ));
      });

      pythonProcess.on('close', (code) => {

        console.log('\n--- Python Process Completed ---');
        console.log('Exit code:', code);
        console.log('Total stdout:', result);
        console.log('Total stderr:', errorMessage);

        if (code !== 0) {
          resolve(NextResponse.json(
            {
              error: `Python script exited with error (code ${code})`,
              errorDetails: errorMessage,
              debug: debugLog
            },
            { status: 500 }
          ));
          return;
        }

        try {
          const jsonResponse = JSON.parse(result);
          resolve(NextResponse.json({
            ...jsonResponse,
            debug: debugLog
          }));
        } catch (e) {
          const error = e as Error; // Type assertion
          console.error('Failed to parse Python output as JSON:', error);
          resolve(NextResponse.json(
            {
              error: 'Failed to parse JSON output from Python script',
              rawOutput: result,
              parseError: error.message,
              debug: debugLog
            },
            { status: 500 }
          ));
        }
      });
    });
  } catch (error) {
    const err = error as Error; // Type assertion
    console.error('API route error:', err);
    return NextResponse.json(
      { 
        error: 'API route error',
        details: err.message
      },
      { status: 500 }
    );
  }
}
