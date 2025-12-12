import React from 'react';
import { FilterType } from '../types';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeCount: number;
}

export function TodoFilter({ currentFilter, onFilterChange, activeCount }: TodoFilterProps) {
  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
      <span>{activeCount} {activeCount === 1 ? 'task' : 'tasks'} remaining</span>
      
      <div className="flex p-1 bg-gray-100 dark:bg-gray-800/50 rounded-lg">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className="relative px-4 py-1.5 rounded-md transition-colors duration-200"
          >
            {currentFilter === filter.value && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 bg-white dark:bg-gray-700 shadow-sm rounded-md"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className={cn("relative z-10", currentFilter === filter.value && "text-indigo-600 dark:text-indigo-400 font-medium")}>
              {filter.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
