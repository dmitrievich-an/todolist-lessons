import React, { useRef, useState } from 'react';
import './TodoList.css';
import { FilterValuesType } from "../../App";

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList = ({
                             title,
                             tasks,
                             removeTask,
                             addTask,
                             // changeTodoListFilter
                         }: TodoListPropsType) => {

    // const title = props.title
    // const tasks = props.tasks

    // const {title, tasks} = props  //деструктурирующее присваивание (вместо двух строк выше)

    const [filter, setFilter] = useState<FilterValuesType>("all")

    const taskTitleInput = useRef<HTMLInputElement>(null)

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

    const onClickHandlerCreator = (filter: FilterValuesType) => () => setFilter(filter)

    const onClickAddTaskHandler = () => {
        if (taskTitleInput.current) {
            const newTask = taskTitleInput.current.value
            addTask(newTask)
            taskTitleInput.current.value = ""
        }
    }

    return (
        <div>
            <div className="todolist">
                <h3>{ title }</h3>
                <div>
                    <input ref={ taskTitleInput } />
                    <button onClick={ onClickAddTaskHandler }>+</button>
                </div>
                <ul>
                    { tasksList }
                </ul>
                <div>
                    <button onClick={ onClickHandlerCreator("all") }>All</button>
                    <button onClick={ onClickHandlerCreator("active") }>Active</button>
                    <button onClick={ onClickHandlerCreator("completed") }>Completed</button>
                </div>
            </div>
        </div>
    );
};