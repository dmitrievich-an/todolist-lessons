import React from 'react';

type TodoListPropsType = {
  title: string
  tasks: Array<TaskType>
}

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {

  let tasksList = props.tasks.length
  ? props.tasks.map((task: TaskType) => {
      return (
        <li>
          <input type="checkbox" checked={task.isDone}/>
          <span>{task.title}</span>
        </li>
      )
    })
  : <span>Your tasks list is empty</span>

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input/>
        <button>+</button>
      </div>
      <ul>
        {tasksList}
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  );
};

export default TodoList;