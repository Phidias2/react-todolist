import './App.css';
import Header from './components/Header';
import Form from './components/Form';
import TodoList from './components/TodoList';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const App = () => {
  // const initialState = JSON.parse(localStorage.getItem("todos")) || []
  const [input, setInput] = useState("")
  const [filter, setFilter] = useState("All")
  const [todos, setTodos] = useState([])
  const [editTodo, setEditTodo] = useState(null)
  const navigate = useNavigate()

  if (!localStorage.getItem("todo-token")) {
    navigate("/login");
  }

  useEffect(() => {
    if (localStorage.getItem("todo-token") !== null) {
      console.log("exist", localStorage.getItem("todo-token"));
      const headers = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'token ' + localStorage.getItem('todo-token')
        },
      };
      fetch(`http://127.0.0.1:8000/api/todos`, headers)
        .then(response => response.json())
        .then(data => {
          setTodos(data);
        })
        .catch(err => console.log(err));
    }
    else{
    navigate("/login");
    }

  }, []);


  // useEffect(() => {
  //   localStorage.setItem("todos", JSON.stringify(todos))
  // }, [todos])

  const logout = () => {
    const headers = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'token ' + localStorage.getItem('todo-token')
      },
    };
    fetch(`http://127.0.0.1:8000/api/logout`, headers)
      .then(response => response.json())
      .then(data => {
        setTodos(data)
        localStorage.removeItem("todo-token")
        navigate("/login");
      }).catch(
        err => console.log(err)
      )
  }

  const handleFilter = (filtre) => {
    setFilter(filtre)
    if (filter !== filtre) {
      if (filtre === "Uncompleted") {
        const headers = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'token ' + localStorage.getItem('todo-token')
          },
        };
        fetch(`http://127.0.0.1:8000/api/todos/uncompleted`, headers)
          .then(response => response.json())
          .then(data => {
            setTodos(data)
          }).catch(
            err => console.log(err)
          )

      }

      if (filtre === "Favorite") {
        setTodos(todos.filter(todo => todo.completed === true))
        console.log(todos);
        const headers = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'token ' + localStorage.getItem('todo-token')
          },
        };
        fetch(`http://127.0.0.1:8000/api/todos/favorite`, headers)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setTodos(data)
          }).catch(
            err => console.log(err)
          )

      }

      if (filtre === "Completed") {
        setTodos(todos.filter(todo => todo.completed === true))
        console.log(todos);
        const headers = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'token ' + localStorage.getItem('todo-token')
          },
        };
        fetch(`http://127.0.0.1:8000/api/todos/completed`, headers)
          .then(response => response.json())
          .then(data => {
            setTodos(data)
          }).catch(
            err => console.log(err)
          )
      }

      if (filtre === "All") {
        setTodos(todos.filter(todo => todo.completed === true))
        console.log(todos);
        const headers = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'token ' + localStorage.getItem('todo-token')
          },
        };
        fetch(`http://127.0.0.1:8000/api/todos`, headers)
          .then(response => response.json())
          .then(data => {
            setTodos(data)
          }).catch(
            err => console.log(err)
          )
      }
    }

  }

  return (
    <div className='container'>
      <div className='app-wrapper'>

        <div><Header /></div>
        <div className='filter-group'>
          <span className={`selector ${filter === "All" ? "active-select" : ""}`} onClick={() => handleFilter("All")}>All
          </span>
          <span className={`selector ${filter === "Completed" ? "active-select" : ""}`} onClick={() => handleFilter("Completed")}>
            Completed
          </span>

          <span className={`selector ${filter === "Uncompleted" ? "active-select" : ""}`} onClick={() => handleFilter("Uncompleted")}>
            Uncompleted
          </span>

          <span className={`selector ${filter === "Favorite" ? "active-select" : ""}`} onClick={() => handleFilter("Favorite")}>
            Favorite
          </span>



        </div>
        <div>
          <Form
            input={input}
            setInput={setInput}
            todos={todos}
            setTodos={setTodos}
            editTodo={editTodo}
            setEditTodo={setEditTodo}
          />
        </div>
        <div>
          <TodoList todos={todos} setTodos={setTodos}
            setEditTodo={setEditTodo}
          />
        </div>
        <div style={{ textAlign: "center", position: "absolute", bottom: "0", right: "50%" }}>
          <button className='button-complete selector active-select' onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default App;
