'use client';
// DataComparisonComponents.tsx
import React, { useState } from 'react'
import { Menu, Moon, Sun } from "lucide-react"
import { Switch } from "../components/ui/switch"
import Image from 'next/image'
import { runLLM } from '../components/utils/llm';
import {Loader2, Check } from "lucide-react";
import dynamic from 'next/dynamic'


// Import the modal component from shadcn
import { Dialog, DialogHeader, DialogFooter, DialogContent, DialogTitle, DialogDescription, DialogTrigger, DialogClose } from  "../components/ui/dialog"

interface DataColumnProps {
  icon: React.ReactNode;
  title: string;
  systemPrompt: string;
}

const ReactJson = dynamic(() => import('react-json-view'), {
  ssr: false, // This will disable server-side rendering for this component
})
export const Header = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center space-x-2">
      {icon}
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
    {/* <div className="bg-gray-200 rounded-full p-1">
      <Sun className="h-5 w-5 text-gray-600" />
    </div> */}
  </div>
)

export const SystemPrompt = ({ content }: { content: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableContent, setEditableContent] = useState(content);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableContent(e.target.value);
  };

  return (
    <div className="bg-gray-100 rounded-2xl p-4 mb-6">
      <h3 className="font-semibold mb-2">SYSTEM PROMPT</h3>
      <p className="text-sm text-gray-600 line-clamp-6 overflow-hidden">
        {editableContent}
      </p>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <button onClick={openModal} className="text-[#898121] underline pt-2">Edit</button>
        </DialogTrigger>
        <DialogContent className="w-full max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit System Prompt</DialogTitle>
            <DialogDescription>
              Modify the system prompt content below.
            </DialogDescription>
            {/* Ensure the DialogClose component is used for the built-in "X" button */}
          </DialogHeader>
          <div>
            <textarea
              value={editableContent}
              onChange={handleContentChange}
              className="w-full h-[40rem] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#898121]"
            />
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <button onClick={closeModal} className="mt-2 text-white bg-[#898121] p-2 rounded">Save</button>
            </DialogClose>
            <DialogClose asChild>
              <button onClick={closeModal} className="mt-2 text-gray-500 p-2 rounded">Cancel</button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export const OutputToggle = () => (
  <div className="flex items-center justify-between mb-4">
    {/* Removed Analysis, Switch, and Recommend */}
  </div>
)

export const OutputSection = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
  <div>
    <div className="flex items-center mb-2">
      {icon}
      <span className="font-semibold">{title}</span>
    </div>
    <div className="bg-gray-200 h-24 rounded-2xl"></div>
  </div>
)

export const DataColumn: React.FC<DataColumnProps> = ({ icon, title, systemPrompt }) => {
  const [LLMresponseData, setLLMResponseData] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false); // Add loading state

  const startLLM = async () => {
    setIsRunning(true); // Set loading state to true
    let additionalData = '';

    // Determine the column type and append data accordingly
    if (title === 'Raw Data') {
      additionalData = 'raw'; // Replace with actual raw data
      console.log("RunLLM: Raw Data")
    } else if (title === 'Sahha Data') {
      additionalData = 'sahha'; // Replace with actual sahha data
      console.log("RunLLM: Sahha Data")
    }

    try {
      const result = await runLLM({ systemPrompt, type: additionalData }); // Pass the object directly
      setLLMResponseData(result.data);
    } catch (error) {
      console.error('Error running LLM:', error);
      setLLMResponseData({ error: 'Failed to fetch data from LLM' });
    } finally {
      setIsRunning(false); // Reset loading state
    }
  };

  return (
    <div className="bg-white font-mono rounded-2xl shadow-md overflow-hidden">
      <div className="p-6">
        <Header icon={icon} title={title} />
        <SystemPrompt content={systemPrompt} />
        <div className="mb-6">
          <div className="flex justify-center">
            <button
              onClick={startLLM}
              disabled={isRunning}
              className={`mb-4 rounded-full transition-colors flex items-center justify-center h-full border-2 ${
                isRunning ? 'bg-white border-[#898121] text-black w-1/2' : LLMresponseData ? 'bg-[#898121] text-white w-1/2' : 'bg-black text-white hover:bg-gray-800 w-1/4'
              }`}
              style={{
                padding: isRunning ? '0.75rem 3.6rem' : '0.75rem 1.8rem',
              }}
            >
              {isRunning ? (
                <>
                  <Loader2 className="h-4 w-3 mr-2 animate-spin text-black" />
                  Processing...
                </>
              ) : LLMresponseData ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  <span>Done</span>
                </>
              ) : (
                <span>Run</span>
              )}
            </button>
          </div>
          {/* Render ReactJson with the response data or placeholder data */}
          <OutputToggle />
          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-xl">
              <ReactJson
                src={LLMresponseData || {
                  Sample_Data: {
                    dataPoint1: "Value1",
                    dataPoint2: "Value2",
                    dataPoint3: "Value3",
                    analysis: "This is a dummy inference analysis."
                  }
                }}
                theme="rjv-default"
                displayDataTypes={false}
                name={false}
                collapsed={1}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const SahhaLogo = () => (
  <svg width={30} height={30}>
    <image href={'../Sahha Vector.svg'} width={30} height={30} />
  </svg>
)
