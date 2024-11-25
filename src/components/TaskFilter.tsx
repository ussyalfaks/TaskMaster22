import React, { useState } from 'react';
import { Filter } from 'lucide-react';

interface TaskFilterProps {
  onFilter: () => void;
}

export function TaskFilter({ onFilter }: TaskFilterProps) {
  const [priority, setPriority] = useState('');
  const [deadline, setDeadline] = useState('');
  const token = localStorage.getItem('token');

  const handleFilter = async () => {
    const params = new URLSearchParams();
    if (priority) params.append('priority', priority);
    if (deadline) params.append('deadline', deadline);

    try {
      const response = await fetch(`'https://taskmaster22.onrender.com/api/tasks/filter?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        onFilter();
      }
    } catch (error) {
      console.error('Error filtering tasks:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center mb-4">
        <Filter className="h-5 w-5 text-gray-400 mr-2" />
        <h3 className="text-lg font-medium text-gray-900">Filters</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="priority-filter" className="block text-sm font-medium text-gray-700">
            Priority
          </label>
          <select
            id="priority-filter"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label htmlFor="deadline-filter" className="block text-sm font-medium text-gray-700">
            Deadline Before
          </label>
          <input
            type="date"
            id="deadline-filter"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <button
          onClick={handleFilter}
          className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}