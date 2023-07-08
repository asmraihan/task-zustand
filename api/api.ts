import { InterfaceTask } from "@/types/tasks"

const baseUrl = 'https://64a6c66d096b3f0fcc808fb7.mockapi.io/'

export const getAllTodos = async (): Promise<InterfaceTask[]> => {
    const res = await fetch (`${baseUrl}/todos`, {cache: 'no-store'})
    const todos = await res.json()
    return todos
}


export const addTodo = async (todo: InterfaceTask): Promise<InterfaceTask> => {
    const res = await fetch (`${baseUrl}/todos`,{
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
    const newTodo = await res.json()
    return newTodo
}

export const editTodo = async (todo: InterfaceTask): Promise<InterfaceTask> => {
    const res = await fetch (`${baseUrl}/todos/${todo.id}`,{
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
    const updatedTodo = await res.json()
    return updatedTodo
}


export const deleteTodo = async (id: string): Promise<void> => { 
    await fetch (`${baseUrl}/todos/${id}`,{
        method: 'DELETE',
    })
}


