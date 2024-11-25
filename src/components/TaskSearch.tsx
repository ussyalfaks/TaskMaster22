import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface TaskSearchProps {
  onSearch: () => void;
}

export function TaskSearch({ onSearch }: TaskSearchProps) {
  const [query, setQuery] = useState('');
  const token = localStorage.getItem('token');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`https://taskmaster22.onrender.com/api/tasks/search?q=${query}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        onSearch();
      }
    } catch (error) {
      console.error('Error searching tasks:', error);
    }
  };

  return (
    <form onSubmit={handleSearch} className="mb-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tasks..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
    </form>
  );
}