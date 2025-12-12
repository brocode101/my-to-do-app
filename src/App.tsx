import React, { useState, useEffect } from 'react';
import { TodoInput } from './components/TodoInput';
import { TodoItem } from './components/TodoItem';
import { TodoFilter } from './components/TodoFilter';
import { Todo, FilterType } from './types';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, CheckCircle2, ListTodo } from 'lucide-react';

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter(t => !t.completed).length;
  const progress = todos.length > 0 ? Math.round(((todos.length - activeCount) / todos.length) * 100) : 0;

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      <div className="max-w-2xl mx-auto px-4 py-12 sm:py-20">
        
        {/* Header Section */}
        <header className="mb-8 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
                <ListTodo className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600" />
                Tasks
              </h1>
              <p className="mt-2 text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <Calendar size={16} />
                {today}
              </p>
            </div>
            
            {/* Progress Circle (Mini) */}
            <div className="hidden sm:flex flex-col items-end">
               <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Daily Progress</div>
               <div className="text-2xl font-bold text-indigo-600">{progress}%</div>
            </div>
          </div>
        </header>

        {/* Input Section */}
        <section className="mb-8 z-10 relative">
          <TodoInput onAdd={addTodo} />
        </section>

        {/* List Section */}
        <main className="space-y-6">
          {todos.length > 0 && (
            <TodoFilter 
              currentFilter={filter} 
              onFilterChange={setFilter} 
              activeCount={activeCount} 
            />
          )}

          <div className="space-y-3 min-h-[200px]">
            <AnimatePresence mode="popLayout">
              {filteredTodos.length > 0 ? (
                filteredTodos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                  />
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center py-16 text-center text-gray-400 dark:text-gray-500"
                >
                  <div className="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-full mb-4">
                    {filter === 'completed' ? (
                       <CheckCircle2 size={48} className="text-gray-300 dark:text-gray-600" />
                    ) : (
                       <ListTodo size={48} className="text-gray-300 dark:text-gray-600" />
                    )}
                  </div>
                  <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
                    {filter === 'completed' ? "No completed tasks yet" : "No tasks found"}
                  </p>
                  <p className="text-sm mt-1">
                    {filter === 'completed' 
                      ? "Finish some tasks to see them here!" 
                      : "Add a new task above to get started."}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-gray-400 dark:text-gray-600">
          <p>Press <kbd className="font-sans px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">Enter</kbd> to add a task</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
