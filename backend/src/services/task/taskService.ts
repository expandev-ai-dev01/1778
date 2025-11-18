import { randomUUID } from 'crypto';
import { Task, TaskCreatePayload } from './taskTypes';

// In-memory store (replaces a database for now, as per architecture guidelines)
const tasks: Task[] = [];

/**
 * @summary Creates a new task and saves it to the in-memory store.
 * @param {TaskCreatePayload} taskData The data for the new task.
 * @returns {Promise<Task>} The newly created task.
 */
export async function createTask(taskData: TaskCreatePayload): Promise<Task> {
  const newTask: Task = {
    taskId: randomUUID(),
    userId: taskData.userId, // In a real app, this would come from auth middleware
    title: taskData.title,
    description: taskData.description ?? null,
    dueDate: taskData.dueDate ? new Date(taskData.dueDate) : null,
    priority: taskData.priority ?? 'Média',
    status: 'Pendente',
    createdAt: new Date(),
  };

  tasks.push(newTask);

  // For debugging purposes in a non-persistent environment
  console.log('Task created. Current tasks in memory:', tasks);

  return newTask;
}
