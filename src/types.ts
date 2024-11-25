export interface Task {
  _id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  deadline?: string;
  completed: boolean;
  user: string;
  createdAt: string;
  updatedAt: string;
}