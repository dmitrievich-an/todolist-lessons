import React, { useState } from 'react';
import './App.css';
import { TaskType, TodoList } from "./components/Todolist/TodoList";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    const todoListTitle = "What to learn"

    const [tasks, setTasks] = useState<Array<TaskType>>([
        { id: v1(), isDone: true, title: "HTML&CSS" },
        { id: v1(), isDone: true, title: "JS" },
        { id: v1(), isDone: false, title: "React" },
    ])

    const removeTask = (taskId: string) => {
        const newState = tasks.filter(t => t.id !== taskId)
        setTasks(newState)
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false
        }

        const newState = [newTask, ...tasks]
        setTasks(newState)
    }


    return (
        <div className="App">
            <TodoList
                title={ todoListTitle }
                tasks={ tasks }
                removeTask={ removeTask }
                addTask={ addTask }
            />
        </div>
    );
}

export default App;