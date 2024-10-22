"use client";

import Logo from '../../public/Sahha Logo Final.svg';
import Image from 'next/image';
import React, { useState, useEffect } from "react";
import { ScrollText } from "lucide-react"
import { DataColumn, SahhaLogo } from './components/DataComparisonComponents';
import { HealthDataGenerator } from './components/HealthDataGenerator';

export default function Home() {
  const [Sahha_healthData, setHealthData] = useState<string>("");

  // For retrieving Sahha Health Data
  useEffect(() => {
    fetch("/api/health-data")
      .then((response) => response.json())
      .then((data) => setHealthData(data.data))
      .catch((error) => console.error("Error loading health data:", error));
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

            {/* LLM: Inference: Raw Data */}
            <DataColumn 
              icon={<ScrollText className="h-6 w-6" />}
              title="Raw Data"
              systemPrompt="You are an AI assistant specialised in analysing raw health data and providing clear, informative explanations. Your primary function is to interpret various types of health data, identify patterns or anomalies, and explain their potential significance in easy-to-understand terms..."
            />
            {/* LLM: Inference: Sahha Data */}
            <DataColumn 
              icon={<SahhaLogo />}
              title="Sahha Data"
            
              systemPrompt="You are an AI assistant specialised in analysing Sahha health data and providing clear, informative explanations. Your primary function is to interpret various types of health data, identify patterns or anomalies, and explain their potential significance in easy-to-understand terms..."
            />
          </div>
        </div>
      </div>
    </main>
  );
}
