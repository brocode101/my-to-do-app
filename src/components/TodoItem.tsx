import React from 'react';
import { motion } from 'framer-motion';
import { Check, Trash2 } from 'lucide-react';
import { Todo } from '../types';
import { cn } from '../lib/utils';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.01 }}
      className={cn(
        "group flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/50",
        "transition-colors duration-200"
      )}
    >
      <button
        onClick={() => onToggle(todo.id)}
        className={cn(
          "flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200",
          todo.completed
            ? "bg-green-500 border-green-500 text-white"
            : "border-gray-300 dark:border-gray-600 hover:border-indigo-500"
        )}
        aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        <Check size={14} strokeWidth={3} className={cn("transition-transform", todo.completed ? "scale-100" : "scale-0")} />
      </button>

      <span
        className={cn(
          "flex-grow text-base transition-all duration-200 break-all",
          todo.completed ? "text-gray-400 line-through" : "text-gray-700 dark:text-gray-200"
        )}
      >
        {todo.text}
      </span>

      <button
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 focus:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
        aria-label="Delete task"
      >
        <Trash2 size={18} />
      </button>
    </motion.div>
  );
}
