import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createTaskSchema } from '@/domain/task/validation';
import { useCreateTask } from '@/domain/task/hooks/useCreateTask';
import { PRIORITIES } from '@/domain/task/constants';
import { Input } from '@/core/components/Input';
import { Button } from '@/core/components/Button';
import { Label } from '@/core/components/Label';
import { Textarea } from '@/core/components/Textarea';
import { Select } from '@/core/components/Select';
import type { TaskFormProps } from './types';

type CreateTaskFormData = z.infer<typeof createTaskSchema>;

export const TaskForm = ({ onSuccess, onCancel }: TaskFormProps) => {
  const { mutate: createTask, isPending } = useCreateTask();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskFormData>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      priority: 'Média',
    },
  });

  const onSubmit = (data: CreateTaskFormData) => {
    const payload = {
      ...data,
      due_date: data.due_date ? new Date(data.due_date).toISOString() : undefined,
    };
    createTask(payload, {
      onSuccess: () => {
        onSuccess();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register('title')} placeholder="e.g. Buy groceries" />
        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register('description')}
          placeholder="e.g. Milk, bread, eggs"
        />
        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="due_date">Due Date</Label>
          <Input id="due_date" type="datetime-local" {...register('due_date')} />
          {errors.due_date && <p className="text-sm text-red-500">{errors.due_date.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="priority">Priority</Label>
          <Select id="priority" {...register('priority')}>
            {PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </Select>
          {errors.priority && <p className="text-sm text-red-500">{errors.priority.message}</p>}
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Creating...' : 'Create Task'}
        </Button>
      </div>
    </form>
  );
};
