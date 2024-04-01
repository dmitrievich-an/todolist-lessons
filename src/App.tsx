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

    const [filter, setFilter] = useState<FilterValuesType>("all")

    const changeTodoListFilter = (nextFilter: FilterValuesType) => {
        setFilter(nextFilter)
    }

    const getTasksForTodoList = (allTasks: Array<TaskType>, nextFilterValue: FilterValuesType) => {
        switch (nextFilterValue) {
            case "active":
                return allTasks.filter(t => !t.isDone);
            case "completed":
                return allTasks.filter(t => t.isDone);
            default:
                return allTasks;
        }
    }

    const tasksForTodoList = getTasksForTodoList(tasks, filter)

    return (
        <div className="App">
            <TodoList
                title={ todoListTitle }
                tasks={ tasksForTodoList }
                removeTask={ removeTask }
                changeTodoListFilter={ changeTodoListFilter }
            />
            {/*<TodoList title={todoListTitle_2} tasks={tasks_2} />*/ }
        </div>
    );
}

export default App;