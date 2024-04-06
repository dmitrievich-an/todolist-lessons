import React, { useState } from 'react';
import './TodoList.css';
import { FilterValuesType } from "../../App";

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: number) => void
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const TodoList = ({
                             title,
                             tasks,
                             removeTask,
                             // changeTodoListFilter
                         }: TodoListPropsType) => {

    // const title = props.title
    // const tasks = props.tasks

    // const {title, tasks} = props  //деструктурирующее присваивание (вместо двух строк выше)

    const [filter, setFilter] = useState<FilterValuesType>("all")

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

    const tasksList: Array<JSX.Element> = tasksForTodoList.map(el => {

            const removeTaskHandler = () => removeTask(el.id)

            return (
                <li key={ el.id }>
                    <input type="checkbox" checked={ el.isDone } />
                    <span>{ el.title }</span>
                    <button onClick={ removeTaskHandler }>x</button>
                </li>
            )
        }
    )

    return (
        <div>
            <div className="todolist">
                <h3>{ title }</h3>
                <div>
                    <input />
                    <button>+</button>
                </div>
                <ul>
                    { tasksList }
                </ul>
                <div>
                    <button onClick={ () => setFilter("all") }>All</button>
                    <button onClick={ () => setFilter("active") }>Active</button>
                    <button onClick={ () => setFilter("completed") }>Completed</button>
                </div>
            </div>
        </div>
    );
};