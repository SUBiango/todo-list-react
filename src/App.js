import { useState } from 'react';
import './Style.css';

function TodoControls({onClearCompletedTask, onClearAllTask}) {
  return (
    <div className='tada-wrapper'>
      <button className='btn' onClick={onClearAllTask}>Clear all task</button>
      <button className='btn' onClick={onClearCompletedTask}>
      Clear completed
      </button>
    </div>
  )
}

function TaskList({tasks, onToggleTask}) {
  return (
    <ul className='task-list-ul'>
      {tasks.map((task, index) => (
        <li key={index} className='task-list-li'>
          <input
              type='checkbox'
              id={`task-checkbox-${index}`}
              className='task-checkbox'
              checked={task.completed}
              onChange={() => onToggleTask(index)}
            /> 
          <label htmlFor={`task-checkbox-${index}`} className='task-checkbox-label'>
           {' '} {task.text}
          </label>
        </li>
      ))}
    </ul>
  )
}

function AddTask(props) {

  const {inputValue, handleChange, handleSubmit} = props

  return (
    <form className='add-task'>
      <input
        type='text'
        value={inputValue}
        onChange={handleChange}
        placeholder='Enter task...'
        className='add-task-input'
      />
      <button 
        onClick={handleSubmit}
        className='add-task-button'>Add Task
      </button>
    </form>
  )
}

function Header() {
  return (
    <h1 className='header'>Ta-Da List App</h1>
  )
}


function ToDoContainer() {

  const [tasks, setTasks] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [checkedTask, setCheckedTask] = useState([])

  function handleChange(e) {
    setInputValue(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (inputValue.trim() !== '') {
      setTasks([...tasks, {text: inputValue, completed: false}])
      setInputValue('')
    } else {
      alert('Please enter task')
    }
  }

  function handleToggleTask(index) {
    const updatedTasks = tasks.map((task, i) => 
      i === index ? {...task, completed: !task.completed} : task
    )
    setTasks(updatedTasks)

    if (checkedTask.includes(index)) {
      setCheckedTask(checkedTask.filter((i) => i !== index))
    } else {
      setCheckedTask(checkedTask.concat(index))
    }
  }

  function handleClearCompletedTask() {
    let completedTask = tasks.filter((_, index) => !checkedTask.includes(index))
    setTasks(completedTask)
    setCheckedTask([])
  }

  function handleClearAllTask() {
    tasks.splice(0, tasks.length)
    setTasks([...tasks])
  }


  return (
    <div className='container'>
      <Header />
      <AddTask 
        inputValue={inputValue}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <TaskList
        tasks={tasks}
        onToggleTask={handleToggleTask}
      />
      <TodoControls
        onClearCompletedTask={handleClearCompletedTask}
        onClearAllTask={handleClearAllTask}
      />
    </div>
  )
}

function ToDoApp() {
  return (
    <ToDoContainer />
  );
}

export default ToDoApp;
