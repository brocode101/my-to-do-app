import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '../lib/utils';

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative group">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        className={cn(
          "w-full px-6 py-4 bg-white dark:bg-gray-800 rounded-2xl",
          "text-gray-700 dark:text-gray-200 placeholder:text-gray-400",
          "shadow-sm border-2 border-transparent focus:border-indigo-500/50 focus:ring-0",
          "outline-none transition-all duration-300 ease-in-out",
          "pr-14" // Space for the button
        )}
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className={cn(
          "absolute right-2 top-2 bottom-2 aspect-square",
          "flex items-center justify-center rounded-xl",
          "bg-indigo-600 text-white shadow-md",
          "hover:bg-indigo-700 active:scale-95",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
          "transition-all duration-200"
        )}
        aria-label="Add task"
      >
        <Plus size={20} strokeWidth={3} />
      </button>
    </form>
  );
}
