import React from 'react';

interface SystemPromptInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function SystemPromptInput({ label, value, onChange }: SystemPromptInputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={`prompt-${label}`} className="block text-sm font-medium text-gray-700">
        {label} System Prompt
      </label>
      <textarea
        id={`prompt-${label}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Enter ${label} system prompt...`}
        rows={4}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  );
}