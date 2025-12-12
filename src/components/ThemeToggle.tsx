import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "p-2.5 rounded-xl transition-all duration-200",
        "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
        "text-gray-500 dark:text-gray-400",
        "hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-indigo-600 dark:hover:text-indigo-400",
        "active:scale-95 shadow-sm"
      )}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: theme === 'dark' ? 180 : 0,
          scale: 1
        }}
        whileTap={{ scale: 0.8 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
      >
        {theme === 'dark' ? (
          <Moon size={20} className="fill-current" />
        ) : (
          <Sun size={20} className="fill-current" />
        )}
      </motion.div>
    </button>
  );
}
