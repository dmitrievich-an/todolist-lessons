import React, { useState } from 'react';
import './App.css';
import { TaskType, TodoList } from "./components/Todolist/TodoList";

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    const todoListTitle = "What to learn"

    const [tasks, setTasks] = useState<Array<TaskType>>([
        { id: 1, isDone: true, title: "HTML&CSS" },
        { id: 2, isDone: true, title: "JS" },
        { id: 3, isDone: false, title: "React" },
    ])

    const removeTask = (taskId: number) => {
        const newState = tasks.filter(t => t.id !== taskId)
        setTasks(newState)
    }


    return (
        <div className="App">
            <TodoList
                title={ todoListTitle }
                tasks={ tasks }
                removeTask={ removeTask }
            />
        </div>
    );
}

export default App;