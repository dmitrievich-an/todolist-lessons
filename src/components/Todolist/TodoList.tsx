import React, { ChangeEvent, useRef, useState, KeyboardEvent } from 'react';
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

    const [taskTitle, setTaskTitle] = useState("")

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
    const isTitleTooLong = taskTitle.length > 15
    const ifTaskCanAdded = taskTitle && !isTitleTooLong

    const tasksList: Array<JSX.Element> | JSX.Element = tasksForTodoList.length
        ? tasksForTodoList.map(el => {

                const onClickRemoveTaskHandler = () => removeTask(el.id)

                return (
                    <li key={ el.id }>
                        <input type="checkbox" checked={ el.isDone } />
                        <span>{ el.title }</span>
                        <button onClick={ onClickRemoveTaskHandler }>x</button>
                    </li>
                )
            }
        )
        : <div>Your tasks list is empty</div>

    const onClickHandlerCreator = (filter: FilterValuesType) => () => setFilter(filter)

    const onClickAddTaskHandler = () => {
        addTask(taskTitle)
        setTaskTitle("")
    }

    const onChangeSetTaskTitle = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value)

    const onKeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && ifTaskCanAdded) {
            onClickAddTaskHandler()
        }
    }

    return (
        <div>
            <div className="todolist">
                <h3>{ title }</h3>
                <div>
                    <input
                        value={ taskTitle }
                        onChange={ onChangeSetTaskTitle }
                        onKeyDown={ onKeyDownAddTaskHandler }
                    />
                    <button
                        disabled={ !ifTaskCanAdded }
                        onClick={ onClickAddTaskHandler }
                    >+
                    </button>
                    { isTitleTooLong && <div>Your task title is to long</div> }
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