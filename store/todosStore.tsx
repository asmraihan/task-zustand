import create from 'zustand';
import { addTodo, editTodo } from '@/api/api';

type Task = {
  id: string;
  text: string;
  description: string;
};

type State = {
  tasks: Task[];
  newTaskValue: string;
  setNewTaskValue: (value: string) => void;
  newTaskDescription: string;
  setNewTaskDescription: (value: string) => void;
  addTask: (task: Task) => void;
  setTasks: (tasks: Task[]) => void;
};

export const useStore = create<State>((set) => ({
  // initial state
  tasks: [],
  newTaskValue: '',
  newTaskDescription: '',
  
  // actions
  setNewTaskValue: (value) => set({ newTaskValue: value }),
  setNewTaskDescription: (value) => set({ newTaskDescription: value }),
  
  addTask: async (task) => {
    await addTodo(task);
    set((state) => ({
      tasks: [...state.tasks, task],
      newTaskValue: '',
      newTaskDescription: '',
    }));
  },
  
  setTasks: async (tasks) => {
    await Promise.all(tasks.map((task) => editTodo({
      id: task.id,
      text: task.text,
      description: task.description,
    })));
    set({ tasks });
  },
}));
