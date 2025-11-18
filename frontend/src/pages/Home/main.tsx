import { useState } from 'react';
import { Button } from '@/core/components/Button';
import { Dialog } from '@/core/components/Dialog';
import { TaskForm } from '@/domain/task/components/TaskForm';

const HomePage = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const handleTaskCreationSuccess = () => {
    setCreateModalOpen(false);
    // Here you might want to show a success toast
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Tasks</h1>
        <Button onClick={() => setCreateModalOpen(true)}>Create New Task</Button>
      </div>

      {/* Task list will be rendered here in a future feature */}
      <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
        <p>Your tasks will appear here.</p>
        <p>Click "Create New Task" to get started!</p>
      </div>

      <Dialog
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Create a New Task"
      >
        <TaskForm
          onSuccess={handleTaskCreationSuccess}
          onCancel={() => setCreateModalOpen(false)}
        />
      </Dialog>
    </div>
  );
};

export default HomePage;
