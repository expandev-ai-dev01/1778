export type Priority = 'Baixa' | 'Média' | 'Alta';
export type Status = 'Pendente' | 'Em Andamento' | 'Concluída';

export interface Task {
  taskId: string;
  userId: string;
  title: string;
  description?: string;
  dueDate?: string; // ISO 8601 string
  priority: Priority;
  status: Status;
  createdAt: string; // ISO 8601 string
}

// Matches the backend API body for task creation
export interface CreateTaskPayload {
  title: string;
  description?: string;
  due_date?: string; // ISO 8601 string
  priority?: Priority;
}
