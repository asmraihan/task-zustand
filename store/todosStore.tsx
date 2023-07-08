import create from 'zustand';
import { addTodo, editTodo } from '@/api/api';

type Task = {
  id: string;
  text: string;
};

type State = {
  tasks: Task[];
  newTaskValue: string;
  setNewTaskValue: (value: string) => void;
  addTask: (task: Task) => void;
  setTasks: (tasks: Task[]) => void;
};

export const useStore = create<State>((set) => ({
  tasks: [],
  newTaskValue: '',
  setNewTaskValue: (value) => set({ newTaskValue: value }),
  addTask: async (task) => {
    await addTodo(task);
    set((state) => ({
      tasks: [...state.tasks, task],
      newTaskValue: '',
    }));
  },
  setTasks: async (tasks) => {
    await Promise.all(tasks.map((task) => editTodo({
      id: task.id,
      text: task.text,
    })));
    set({ tasks });
  },
}));
