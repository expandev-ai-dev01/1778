import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '@/domain/task/services/taskService';
import type { CreateTaskPayload } from '@/domain/task/types';

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskData: CreateTaskPayload) => taskService.create(taskData),
    onSuccess: () => {
      // Invalidate and refetch the tasks list query
      // This key should be consistent with the task list query hook
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error: Error) => {
      // Here you could show a toast notification for the error
      console.error('Failed to create task:', error);
    },
  });
};
