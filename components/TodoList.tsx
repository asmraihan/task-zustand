import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { InterfaceTask } from "@/types/tasks"
import React from "react"
import TaskRow from "./TaskRow"

interface TodoListProps {
  tasks: InterfaceTask[]
}

const TodoList: React.FC<TodoListProps> = ({tasks}) => {

return (
<Table>
<TableCaption>Time: {Date()}</TableCaption>
<TableHeader>
  <TableRow>
    <TableHead className="w-[100px]">#</TableHead>
    <TableHead>Task</TableHead>
    <TableHead>Description</TableHead>
    <TableHead>Status</TableHead>
    <TableHead>Action</TableHead>
  </TableRow>
</TableHeader>
<TableBody>
  {
    tasks.map((task, index) => <TaskRow key={task.id} task={task} index={index + 1}></TaskRow> )
  }
</TableBody>
</Table>
)
}

export default TodoList