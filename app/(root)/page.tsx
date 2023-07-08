import { Terminal, Waves } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import TodoList from "@/components/TodoList";
import AddTask from "@/components/AddTask";
import { getAllTodos } from "@/api/api";

export default async function Home() {
  // get all todos from the api
  const tasks = await getAllTodos()
  console.log(tasks)

  return (
    <main className="p-4 max-w-4xl mx-auto h-full flex flex-col justify-center">
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>NEXT TODO CRUD!</AlertTitle>
        <AlertDescription>
        Add, Edit, Delete, and Complete Tasks!
        </AlertDescription>
      </Alert>
      <AddTask></AddTask>
      <TodoList tasks={tasks}></TodoList>
    </main>
  )
}
