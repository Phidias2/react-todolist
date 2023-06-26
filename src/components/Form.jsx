/* eslint-disable react/prop-types */
import { useEffect } from 'react'

const Form = ({ input, setInput, todos, setTodos, editTodo, setEditTodo }) => {
  const onInputChange = (event) => {
    setInput(event.target.value)
  }

  const updateTodo = (Title, id, Completed) => {
    const newTodo = todos.map((todo) =>
      todo.id === id ? { Title, id, Completed } : todo
    )
    setTodos(newTodo)
    setEditTodo("")
  }

  useEffect(() => {
    if (editTodo) {
      console.log(editTodo.Title);
      setInput(editTodo.Title)
    }
    else {
      setInput("")
    }
  }, [setInput, editTodo])

  const onFormSubmit = (event) => {
    event.preventDefault()

    if (!editTodo) {
      const headers = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'token ' + localStorage.getItem('todo-token')
        },
        body: JSON.stringify({ Title: input })
      };
      fetch(`http://127.0.0.1:8000/api/todos/create`, headers)
        .then(response => response.json())
        .then(data => {
          setTodos([...todos, { id:data.id, Title: data.Title, Completed: data.Completed, is_favorite: data.is_favorite }])
        }).catch(
          err => console.log(err)
        )
      // setTodos([...todos, { Title: input, Completed: false, is_favorite: false }])
      setInput("")
    }

    else {
      const headers = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'token ' + localStorage.getItem('todo-token')
        },
        body: JSON.stringify({ Title: input })
      };
      fetch(`http://127.0.0.1:8000/api/todos/${editTodo.id}/update`, headers)
        .then(response => response.json())
        .then(() => {
          updateTodo(input, editTodo.id, editTodo.Completed)
          // setTodos([...todos, { Title: data.Title, Completed: data.Completed, is_favorite: data.is_favorite }])
        }).catch(
          err => console.log(err)
        )
    }
  }

  return (
    <form onSubmit={onFormSubmit}>
      <input type='text' placeholder='Todo' className='task-input' value={input} required onChange={onInputChange} />
      <button className='button-add' type='submit'> {editTodo ? "OK" : "Add"} </button>
    </form>
  )
}

export default Form