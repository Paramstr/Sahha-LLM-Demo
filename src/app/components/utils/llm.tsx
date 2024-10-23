// /app/components/llm.tsx
import { getterRawData , getterSahhaData} from './healthDataStore';


export async function runLLM(input: { systemPrompt: string, type: string }) {

    let dataToLoad;

    if (input.type === 'raw') {
        // Load raw JSON data
        let rawData = await getterRawData(); // Fetch raw data using the generateRawData function
        if (!rawData) {
            const response = await fetch('/raw_generated/moderately_active_week_cardio.json');
            if (!response.ok) {
                throw new Error('Failed to load raw data from JSON');
            }
            rawData = await response.json();
        }
        dataToLoad = rawData.data; // Extract the "data" section from the JSON
        console.log('Loaded raw data:', dataToLoad);


    } else if (input.type === 'sahha') {
        // Load Sahha JSON data
        let sahhaData = await getterSahhaData(); // Fetch Sahha data using the getter function
        if (!sahhaData) {
            console.log('No Sahha data found, loading from JSON: sahha_mod_active_cardio');
            const response = await fetch('/sahha_generated/sahha_mod_active_cardio.json');
            if (!response.ok) {
                throw new Error('Failed to load Sahha data');
            }
            sahhaData = await response.json();
        }
        dataToLoad = sahhaData.scores; // Extract the "scores" section from the JSON
        console.log('Loaded Sahha data:', dataToLoad);
    } else {
        throw new Error('Invalid type specified. Expected "raw" or "sahha".');
    }

    // Form the input for LLM as a JSON object with a 'data' key
    const llmInput = {
        data: [`${input.systemPrompt} + Data: ${JSON.stringify(dataToLoad)}`]
    };
    console.log('Formed LLM input:', llmInput);

    try {
      console.log('LLM Inference: Sending data:', llmInput); // Debug log
  
      const response = await fetch('/api/llm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(llmInput), // Ensure the payload is a JSON string
      });
  

      // Get the response text first
      const responseText = await response.text();
      console.log("Response text:", responseText); // Corrected log to show responseText
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
      console.log('LLM Inference generated:', data);
      
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
