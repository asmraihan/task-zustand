import { Terminal, Waves } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"


export default async function Home() {

  const tasks = []
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
