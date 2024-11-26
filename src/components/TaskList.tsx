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
        return <AlertCircle className="h-5 w-5 text-red-500" /> ;
      case 'medium':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-green-500" />;
    }
  };

  return (
    <div className="mt-6 mx-6 max-w-7xl bg-white shadow overflow-hidden rounded-md">
      <ul className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <li key={task._id} className="p-4 hover:bg-gray-50">
            <div className="flex flex-col items-center my-4 justify-between">
              <div className="flex w-4/6 items-center space-x-4">
                <button
                  onClick={() => toggleTaskStatus(task._id, !task.completed)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  {task.completed ? (
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  ) : (
                    <Circle className="h-6 w-6" />
                  )}
                </button>
                <div className=''>
                  <p className={`text-md font-medium text-gray-900 ${
                    task.completed ? 'line-through text-gray-500' : ''
                  }`}>
                    {task.title}
                  </p>
                  <p className="text-sm w-2/5 text-gray-500">{task.description}</p>
                </div>
              </div>
              <div className="flex w-2/5 items-center space-x-4">
                {getPriorityIcon(task.priority)}
                {task.deadline && (
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {new Date(task.deadline).toLocaleDateString()}
                  </div>
                )}
                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-red-500 hover:text-red-700"
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