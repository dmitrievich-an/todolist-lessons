import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
type TodoListPropsType = {
  title: string
  filter: FilterValuesType
  tasks: Array<TaskType>
  addTask: (title: string) => void
  removeTask: (taskId: string) => void
  changeFilter: (filter: FilterValuesType) => void
  changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const TodoList: React.FC<TodoListPropsType> = (props) => {
  const [title, setTitle] = useState<string>("")
  const [error, setError] = useState<boolean>(false)

  let tasksList = props.tasks.length
    ? props.tasks.map((task: TaskType) => {
      const removeTask = () => props.removeTask(task.id);
      const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked);
      const taskClass = task.isDone ? "task_done" : "task";
      return (
        <li key={task.id} className={taskClass}>
          <input
            onChange={changeTaskStatus}
            type="checkbox"
            checked={task.isDone}/>
          <span>{task.title} </span>
          <button onClick={removeTask}>x</button>
        </li>
      )
    })
    : <span>Your tasks list is empty</span>

  const addTask = () => {
    const trimmedTask = title.trim()
    if (trimmedTask !== "") {
      props.addTask(title)
    } else {
      setError(true)
    }
    setTitle("")
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    error && setError(false)
    setTitle(e.currentTarget.value)
  }
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTask()
  const handlerCreator = (filter: FilterValuesType) => () => props.changeFilter(filter)
  const errorMessage = error && <p style={{color: "red", fontWeight: "bold", margin: 0}}>Enter the task</p>
  const inputErrorClass = error ? "input_error" : "input"

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={title}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
          className={inputErrorClass}
        />
        <button onClick={addTask}>+</button>
        {errorMessage}
      </div>
      <ul>
        {tasksList}
      </ul>
      <div>
        <button
          className={props.filter === "all" ? "active_filter" : "filter"}
          onClick={handlerCreator("all")}>
          All
        </button>
        <button
          className={props.filter === "active" ? "active_filter" : "filter"}
          onClick={handlerCreator("active")}>
          Active
        </button>
        <button
          className={props.filter === "completed" ? "active_filter" : "filter"}
          onClick={handlerCreator("completed")}>
          Completed
        </button>
      </div>
    </div>
  );
};