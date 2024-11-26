import { Task } from '../types';
import { CheckCircle2, Circle, Trash2, Clock, AlertCircle } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onTaskUpdate: () => void;
}

export function TaskList({ tasks, onTaskUpdate }: TaskListProps) {
  const token = localStorage.getItem('token');

  const toggleTaskStatus = async (taskId: string, completed: boolean) => {
    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ completed }),
      });

      if (response.ok) {
        onTaskUpdate();
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`https://taskmaster22.onrender.com/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        onTaskUpdate();
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'medium':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-green-500" />;
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'High';
      case 'medium':
        return 'Medium';
      default:
        return 'Low';
    }
  };

  return (
    <div className="mt-6 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <ul className="divide-y divide-gray-200 bg-white shadow overflow-hidden sm:rounded-md">
        {tasks.map((task) => (
          <li key={task._id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex items-start min-w-0 space-x-4">
                <button
                  onClick={() => toggleTaskStatus(task._id, !task.completed)}
                  className="flex-shrink-0 text-gray-400 hover:text-gray-500 mt-1"
                >
                  {task.completed ? (
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  ) : (
                    <Circle className="h-6 w-6" />
                  )}
                </button>
                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-medium text-gray-900 ${
                    task.completed ? 'line-through text-gray-500' : ''
                  }`}>
                    {task.title}
                  </p>
                  <p className="text-sm text-gray-500 break-words">{task.description}</p>
                  {task.deadline && (
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Clock className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span>{new Date(task.deadline).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <div className="flex items-center space-x-1">
                  {getPriorityIcon(task.priority)}
                  <span className="text-sm text-gray-500">{getPriorityText(task.priority)}</span>
                </div>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-red-500 hover:text-red-700 flex-shrink-0"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

