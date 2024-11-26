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
    <div className="mt-6 px-4 sm:px-6 lg:px-8 space-y-4">
      {tasks.map((task) => (
        <div key={task._id} className="hover:shadow-md transition-shadow duration-200">
          <div className="p-6 w-96">
            <div className="flex flex-col items-start sm:items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex items-start space-x-4 w-96 flex-1">
                <button
                  onClick={() => toggleTaskStatus(task._id, !task.completed)}
                  className="mt-1"
                >
                  {task.completed ? (
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  ) : (
                    <Circle className="h-6 w-6 text-gray-400" />
                  )}
                  <span className="sr-only">
                    {task.completed ? 'Mark as incomplete' : 'Mark as complete'}
                  </span>
                </button>
                <div className="space-y-1 w-80 flex-1">
                  <h3 className={`text-lg  w-80 font-medium ${
                    task.completed ? 'line-through text-gray-500 w-80' : 'text-gray-900 w-80'
                  }`}>
                    {task.title}
                  </h3>
                  <p className="text-sm text-gray-500 break-words">{task.description}</p>
                </div>
              </div>
              <div className="flex items-center space-y-2 w-full sm:w-auto">
                <div className="flex items-center space-x-2">
                  {getPriorityIcon(task.priority)}
                  <span className="text-sm text-gray-500">{getPriorityText(task.priority)}</span>
                </div>
                {task.deadline && (
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>{new Date(task.deadline).toLocaleDateString()}</span>
                  </div>
                )}
                <button
                  onClick={() => deleteTask(task._id)}
                  className="w-full sm:w-auto"
                >
                  <Trash2 className="h-4 w-4 mr-2 text-red-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

