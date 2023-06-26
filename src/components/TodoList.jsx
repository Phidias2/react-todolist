/* eslint-disable react/prop-types */
const TodoList = ({ todos, setTodos, setEditTodo }) => {

    const handleComplete = (todo) => {
        const headers = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'token ' + localStorage.getItem('todo-token')
            },
            body: JSON.stringify({ Completed: !todo.Completed })
        };
        fetch(`http://127.0.0.1:8000/api/todos/${todo.id}/update`, headers)
            .then(response => response.json())
            .then(() => {
                setTodos(
                    todos.map((item) => {
                        if (item.id === todo.id) {
                            return { ...item, Completed: !item.Completed }
                        }
                        return item
                    })
                )
            }).catch(
                err => console.log(err)
            )

    }

    const handleFavorite = (todo) => {

        const headers = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'token ' + localStorage.getItem('todo-token')
            },
            body: JSON.stringify({ is_favorite: !todo.is_favorite })
        };
        fetch(`http://127.0.0.1:8000/api/todos/${todo.id}/update`, headers)
            .then(response => response.json())
            .then(() => {
                setTodos(
                    todos.map((item) => {
                        if (item.id === todo.id) {
                            return { ...item, is_favorite: !item.is_favorite }
                        }
                        return item
                    })
                )
            }).catch(
                err => console.log(err)
            )
    }

    const handleDelete = (id) => {
        const headers = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'token ' + localStorage.getItem('todo-token')
            }
        };
        console.log(id);
        fetch(`http://127.0.0.1:8000/api/todos/delete/${id}`, headers)
            .then(() => {
                setTodos(todos.filter((todo) => todo.id !== id))
            }).catch(
                err => console.log(err)
            )
    }

    const handleEdit = ({ id }) => {
        const findTodo = todos.find((todo) => todo.id === id)
        setEditTodo(findTodo)
    }

    return (
        <><div>
            {todos.map((todo) => (
                <li className='list-item' key={todo.id}>
                    <input type='text' value={todo.Title} className={`list ${todo.Completed ? "complete" : ""}`} onChange={(event) => event.preventDefault()} />
                    <button className='button-complete task-button' onClick={() => handleComplete(todo)}>
                        <i className='fa fa-check-circle {}'></i>
                    </button>
                    <button className={`button-complete task-button ${todo.is_favorite ? "" : "is-not-favorite"}`} onClick={() => handleFavorite(todo)}>
                        <i className='fa fa-heart'></i>
                    </button>
                    <button className='button-edit task-button' onClick={() => handleEdit(todo)}>
                        <i className='fa fa-pencil'></i>
                    </button>
                    <button className='button-delete task-button' onClick={() => handleDelete(todo.id)}>
                        <i className='fa fa-trash'>{todo.id}</i>
                    </button>
                </li>

            ))}
        </div>

        </>
    )
}

export default TodoList