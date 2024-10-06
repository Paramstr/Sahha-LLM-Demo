import React, { useState } from 'react'
import { Moon, Sun } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

interface DataColumnProps {
  icon: React.ReactNode;
  title: string;
  initialSystemPrompt: string;
}

export const Header = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center space-x-2">
      {icon}
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
  </div>
)

export const SystemPrompt = ({ content, onChange }: { content: string; onChange: (value: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="bg-gray-100 rounded-2xl p-4 mb-6 cursor-pointer hover:bg-gray-200 transition-colors">
          <h3 className="font-semibold mb-2">SYSTEM PROMPT</h3>
          <p className="text-sm text-gray-600 line-clamp-3">{content}</p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] w-full">
        <ScrollArea className="h-[70vh] w-full p-6">
          <h3 className="text-2xl font-semibold mb-4">SYSTEM PROMPT</h3>
          <textarea
            value={content}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-[50vh] p-4 border rounded text-base"
          />
          <Button onClick={() => setIsOpen(false)} className="mt-6">
            Save and Close
          </Button>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

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

export const DataColumn: React.FC<DataColumnProps> = ({ icon, title, initialSystemPrompt }) => {
  const [systemPrompt, setSystemPrompt] = useState(initialSystemPrompt);

  return (
    <div className="bg-white font-mono rounded-2xl shadow-md overflow-hidden">
      <div className="p-6">
        <Header icon={icon} title={title} />
        <SystemPrompt content={systemPrompt} onChange={setSystemPrompt} />
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
}

export const SahhaLogo = () => (
  <svg width={30} height={30}>
    <image href="/Sahha_Vector.svg" width={30} height={30} />
  </svg>
)

export default function SahhaDataColumnComponent() {
  return (
    <div className="flex space-x-4">
      <DataColumn
        icon={<SahhaLogo />}
        title="Sahha-enabled LLM"
        initialSystemPrompt="Consider the raw device data alongside the Sahha scores, score-factors, and biomarkers of the same time/date period before outputting a recommendation."
      />
      <DataColumn
        icon={<Sun className="h-6 w-6" />}
        title="Standard LLM"
        initialSystemPrompt="Consider only the raw device data before outputting a recommendation."
      />
    </div>
  )
}