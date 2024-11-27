import { Task } from '../types';
import {  Trash2, Clock, AlertCircle } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onTaskUpdate: () => void;
}

export function TaskList({ tasks, onTaskUpdate }: TaskListProps) {
  const token = localStorage.getItem('token');

 

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
        <div key={task._id} className=" m-4">
          <div className="p-6 bg-white w-full hover:shadow-md transition-shadow duration-200">
            <div className="flex flex-col w-5/6 items-start sm:items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex w-full items-start flex-col">
                  <p className={`text-lg w-96 font-medium break-words`}>{task.title}</p>
                  <p className="text-sm w-96 text-gray-500 break-words">{task.description}</p>
              </div>
              <div className="flex items-center my-4 w-full sm:w-auto">
                <div className="flex items-center">
                  {getPriorityIcon(task.priority)}
                  <span className="text-sm mx-2 text-gray-500">{getPriorityText(task.priority)}</span>
                </div>
                {task.deadline && (
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>{new Date(task.deadline).toLocaleDateString()}</span>
                  </div>
                )}
                <button
                  onClick={() => deleteTask(task._id)}
                  className="w-full sm:w-auto">
                  <Trash2 className="h-4 w-4 mx-2 text-red-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

