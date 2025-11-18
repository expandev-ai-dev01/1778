export const priorities = ['Baixa', 'Média', 'Alta'] as const;
export type Priority = (typeof priorities)[number];

export const statuses = ['Pendente', 'Em Andamento', 'Concluída'] as const;
export type Status = (typeof statuses)[number];

export interface Task {
  taskId: string;
  userId: string;
  title: string;
  description: string | null;
  dueDate: Date | null;
  priority: Priority;
  status: Status;
  createdAt: Date;
}

export interface TaskCreatePayload {
  userId: string;
  title: string;
  description?: string | null;
  dueDate?: string | null; // Received from request as string
  priority?: Priority;
}
