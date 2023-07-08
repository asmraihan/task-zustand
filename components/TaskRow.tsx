'use client'
import {
    TableCell,
    TableRow,
  } from '@/components/ui/table';
  import { InterfaceTask } from '@/types/tasks';
  import { Edit, Trash2 } from 'lucide-react';
  import React, { useState } from 'react';
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from '@/components/ui/alert-dialog';
  import { Button } from './ui/button';
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from './ui/dialog';
  import { Input } from './ui/input';
  import { Label } from './ui/label';
  import { useRouter } from 'next/navigation';
  import { deleteTodo, editTodo } from '@/api/api';
  import { useStore } from '@/store/todosStore'; 
import { toast } from './ui/use-toast';
  interface TaskRowProps {
    task: InterfaceTask;
  }
  const TaskRow: React.FC<TaskRowProps> = ({ task }) => {
    const router = useRouter();

    const [editTaskValue, setEditTaskValue] = useState<string>(task.text);
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
        // access the store
    const [tasks, setTasks] = useStore((state) => [state.tasks, state.setTasks]);
  
    const handleSubmitEditTodo = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await editTodo({
        id: task.id,
        text: editTaskValue,
    })
    toast({
      title: "Task updated successfully",

    })
      const updatedTasks = tasks.map((t) =>
        t.id === task.id ? { ...t, text: editTaskValue } : t
      );
      // update the store
      await setTasks(updatedTasks);
      router.refresh();
      setOpen(false);
    };
  
    const handleDeleteTask = async (id: string) => {
      // delete task
      await deleteTodo(id);
      toast({
        variant: "destructive",
        title: "Task successfully deleted.",
      })
      const updatedTasks = tasks.filter((t) => t.id !== id);
      // update the store
      await setTasks(updatedTasks);
      router.refresh();
    };
  
    return (
      <TableRow key={task.id}>
        <TableCell className="font-medium">{task.id}</TableCell>
        <TableCell className="w-full">{task.text}</TableCell>
        <TableCell className="text-right flex justify-center items-center gap-2">
          {/* edit btn modal */}
  
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="flex justify-center items-center w-full">
              <Edit className="text-blue-600 cursor-pointer" size={20}></Edit>{' '}
              {/* FIX HYDRATION */}
            </DialogTrigger>
  
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleSubmitEditTodo}>
                <DialogHeader>
                  <DialogTitle>Edit Task</DialogTitle>
                  <DialogDescription>Make changes</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Task
                    </Label>
                    <Input
                      id="name"
                      value={editTaskValue}
                      autoComplete="off"
                      onChange={(e) => setEditTaskValue(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save task</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
  
          {/* delete btn modal */}
  
          <AlertDialog>
            <AlertDialogTrigger>
              <Trash2
                className="text-red-600 cursor-pointer"
                size={20}
              ></Trash2>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Task</AlertDialogTitle>
                <AlertDialogDescription>Are you sure?</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDeleteTask(task.id)}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </TableCell>
      </TableRow>
    );
  };
  
  export default TaskRow;
  