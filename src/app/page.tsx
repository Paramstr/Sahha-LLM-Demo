"use client";

import Logo from '../../public/Sahha Logo Final.svg';
import Image from 'next/image';
import React, { useState, useEffect } from "react";
import { ScrollText } from "lucide-react"
import { DataColumn, SahhaLogo } from './components/DataComparisonComponents';
import { HealthDataGenerator } from './components/HealthDataGenerator';
import { RawData_LLM_PROMPT } from './components/utils/healthDataStore';
import { sahha_LLM_PROMPT } from './components/utils/healthDataStore';

export default function Home() {
  // State to check if the component is mounted
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set the mounted state to true when the component is mounted
    setIsMounted(true);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center bg-white">
      <div className="w-full max-w-7xl mx-auto p-10">
        <div className="mb-8 flex flex-col items-center">
          <Image src={Logo} alt="Sahha LLM Logo" width={250} height={250} />
          <p className="text-2xl mt-8 font-sans text-black text-center">
            An Exploration into Large Language Model assisted health insights and recommendations
          </p>
        </div>
        {/* Dataset Generation: Raw and Sahha Data */}
        <HealthDataGenerator />

        {/* LLM: Inference */}
        <div className="bg-[#F3F4ED] rounded-2xl p-4 md:p-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Ensure this part only renders on the client side */}
            {isMounted && (
              <>
                {/* LLM: Inference: Raw Data */}
                <DataColumn 
                  icon={<ScrollText className="h-6 w-6" />}
                  title="Raw Data"
                  systemPrompt={RawData_LLM_PROMPT}
                />
                {/* LLM: Inference: Sahha Data */}
                <DataColumn 
                  icon={<SahhaLogo />}
                  title='Sahha Data'
                  systemPrompt={sahha_LLM_PROMPT}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
