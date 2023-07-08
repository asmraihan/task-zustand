'use client'

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from '@/store/todosStore'; 
import { Toaster } from './ui/toaster'; 
import { useToast } from './ui/use-toast';

interface ModalProps {
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  const { toast } = useToast()
  const router = useRouter();
  const [newTaskValue, setNewTaskValue, addTask] = useStore((state) => [
    state.newTaskValue,
    state.setNewTaskValue,
    state.addTask,
  ]);
  const [open, setOpen] = React.useState(false);

  const handleSubmitNewTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addTask({
      id: uuidv4(),
      text: newTaskValue,
    });
    toast({
      title: "Task added successfully",

    })
    router.refresh();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex justify-center items-center w-full">
        <div className="w-full bg-primary flex justify-center items-center text-white rounded-md hover:bg-primary/90 transition-all duration-300 p-2">
          Add New Task <Plus className="ml-2" color="white" size={24} />
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmitNewTodo}>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>Create new</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Task
              </Label>
              <Input
                id="name"
                value={newTaskValue}
                autoComplete="off"
                onChange={(e) => setNewTaskValue(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
      <Toaster />
    </Dialog>
  );
};

export default Modal;
