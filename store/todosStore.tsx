import create from 'zustand';
import { addTodo, editTodo } from '@/api/api';

type Task = {
  id: string;
  text: string;
  description: string;
  status: string;
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

// Create a global store using the `create` function from the `zustand`
export const useStore = create<State>((set) => ({
  // Define the initial state of the application
  tasks: [],
  newTaskValue: '',
  newTaskDescription: '',

  //? Define actions for updating the state of the application.

  // Define a setter function for updating the new task value.
  setNewTaskValue: (value) => set({ newTaskValue: value }),

  // Define a setter function for updating the new task description.
  setNewTaskDescription: (value) => set({ newTaskDescription: value }),

  // Define a function for adding a new task to the list of tasks.
  addTask: async (task) => {
    // Call the `addTodo` to add the task to the backend.
    await addTodo(task);

    // Update the state of the application by adding the new task to the list of tasks and resetting the new task value and description to empty strings.
    set((state) => ({
      tasks: [...state.tasks, task],
      newTaskValue: '',
      newTaskDescription: '',
    }));
  },

  // Define a function for setting the list of tasks.
  setTasks: async (tasks) => {
    // Call the `editTodo` for each task in the list to update their values in the backend.
    await Promise.all(tasks.map((task) => editTodo({
      id: task.id,
      text: task.text,
      description: task.description,
      status: task.status
    })));
       // Update the state of the application by setting the list of tasks to the given list of tasks.
    set({ tasks });
  },
}));
