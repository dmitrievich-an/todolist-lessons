import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type TodoListPropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string) => void
  changeFilter: (filter: FilterValuesType) => void
  addTask: (title: string) => void
}

export const TodoList: React.FC<TodoListPropsType> = (props) => {
  const [title, setTitle] = useState<string>("")

  let tasksList = props.tasks.length
    ? props.tasks.map((task: TaskType) => {
      const removeTask = () => props.removeTask(task.id);
      return (
        <li key={task.id}>
          <input type="checkbox" checked={task.isDone}/>
          <span>{task.title} </span>
          <button onClick={removeTask}>x</button>
        </li>
      )
    })
    : <span>Your tasks list is empty</span>

  const addTask = () => {
    props.addTask(title)
    setTitle("")
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTask()

  const handlerCreator = (filter: FilterValuesType) => () => props.changeFilter(filter)

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          placeholder={"Enter the task"}
          value={title}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
        />
        <button onClick={addTask}>+</button>
      </div>
      <ul>
        {tasksList}
      </ul>
      <div>
        <button onClick={handlerCreator("all")}>All</button>
        <button onClick={handlerCreator("active")}>Active</button>
        <button onClick={handlerCreator("completed")}>Completed</button>
      </div>
    </div>
  );
};