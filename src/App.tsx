import React, {useEffect, useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

export type FilterValuesType = "all" | "active" | "completed"

function App() {

  const todoListTitle_1: string = "What to learn"

  const [tasks, setTasks] = useState<Array<TaskType>>([
    {id: 1, title: "HTML", isDone: true},
    {id: 2, title: "CSS", isDone: true},
    {id: 3, title: "React", isDone: false},
    {id: 4, title: "Redux", isDone: false},
    {id: 5, title: "Angular", isDone: true},
  ])

  const removeTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  useEffect(() => {
    console.log(tasks)
  }, [tasks])

  const [filter, setFilter] = useState<FilterValuesType>("all")

  const changeFilter = (filter: FilterValuesType) => {
    setFilter(filter)
  }

  const getFilteredTasksForRender =
    (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
      switch (filter) {
        case "active":
          return tasks.filter(task => !task.isDone);
        case "completed":
          return tasks.filter(task => task.isDone);
        default:
          return tasks;
      }
    }


  const filteredTasksForRender = getFilteredTasksForRender(tasks, filter)

  return (
    <div className="App">
      <TodoList
        title={todoListTitle_1}
        tasks={filteredTasksForRender}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
