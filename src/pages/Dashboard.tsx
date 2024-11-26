import React, { useState, useEffect } from 'react';
import { TaskList } from '../components/TaskList';
import { TaskForm } from '../components/TaskForm';
import { TaskFilter } from '../components/TaskFilter';
import { TaskSearch } from '../components/TaskSearch';
import { useAuth } from '../context/AuthContext';
import { Plus } from 'lucide-react';

export function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { user } = useAuth();
  const token = localStorage.getItem('token');

  const fetchTasks = async () => {
    try {
      const response = await fetch('https://taskmaster22.onrender.com/api/tasks', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    if (user && token) {
      fetchTasks();
    }
  }, [user, token]);

  return (
    <div className="space-y-6 m-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Task
        </button>
      </div>

    <div className='block lg:hidden'>
    <div className="grid grid-cols-1   lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TaskSearch onSearch={fetchTasks} />
          <TaskFilter onFilter={fetchTasks} />
        </div>
        <div>
          <TaskList tasks={tasks} onTaskUpdate={fetchTasks} />
        </div>
      </div>
    </div>

    <div className='hidden lg:block'>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TaskSearch onSearch={fetchTasks} />
          <TaskList tasks={tasks} onTaskUpdate={fetchTasks}  />
        </div>
        <div>
        <TaskFilter onFilter={fetchTasks} />
        </div>
      </div>
    </div>

      {isFormOpen && (
        <TaskForm
          onClose={() => setIsFormOpen(false)}
          onTaskCreated={fetchTasks}
        />
      )}
    </div>
  );
}