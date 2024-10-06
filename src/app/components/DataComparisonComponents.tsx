import React from 'react'
import { Menu, Moon, Sun } from "lucide-react"
import { Switch } from "../components/ui/switch"
import Image from 'next/image'

interface DataColumnProps {
  icon: React.ReactNode;
  title: string;
  systemPrompt: string;
}

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

export const SystemPrompt = ({ content }: { content: string }) => (
  <div className="bg-gray-100 rounded-2xl p-4 mb-6">
    <h3 className="font-semibold mb-2">SYSTEM PROMPT</h3>
    <p className="text-sm text-gray-600">{content}</p>
  </div>
)

export const OutputToggle = () => (
  <div className="flex items-center justify-between mb-4">
    <span className="font-bold">Explain</span>
    <Switch />
    <span>Recommend</span>
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

export const DataColumn: React.FC<DataColumnProps> = ({ icon, title, systemPrompt }) => (
  <div className="bg-white font-mono rounded-2xl shadow-md overflow-hidden">
    <div className="p-6">
      <Header icon={icon} title={title} />
      <SystemPrompt content={systemPrompt} />
      <div className="mb-6">
        <h3 className="font-semibold mb-2">LLM OUTPUT</h3>
        <OutputToggle />
        <div className="space-y-4">
          <OutputSection icon={<Moon className="h-5 w-5 mr-2" />} title="Sleep" />
          <div className="bg-gray-200 h-24 rounded-2xl"></div>
          <div className="bg-gray-200 h-24 rounded-2xl"></div>
          <OutputSection icon={<Sun className="h-5 w-5 mr-2" />} title="Activity" />
        </div>
      </div>
    </div>
  </div>
)

export const SahhaLogo = () => (
  <svg width={30} height={30}>
    <image href={'../Sahha Vector.svg'} width={30} height={30} />
  </svg>
)

