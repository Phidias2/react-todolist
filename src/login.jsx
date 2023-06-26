
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username, password: password })
        };
        fetch(`http://127.0.0.1:8000/api/login`, requestOptions)
            .then(response => response.json())
            .then(data => {
                localStorage.setItem("todo-token", data.token)
                navigate("/")
            }).catch(
                (error) => {
                    console.log(error);
                }
            )
    }

    return (
        <>

            <div className='container'>
                <div className='app-wrapper' style={{textAlign:"center"}}>
                    <form className="form-contain">
                        <h1 style={{color:"white"}}>Login</h1>
                        <hr/>
                        <div className="my-3">
                            <label htmlFor="email-address" className='form-label'>
                                Username
                            </label>
                            <input
                                id="email-address"
                                name="username"
                                type="email"
                                className="form-control task-input"
                                required
                                placeholder="Username"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="password" className='form-label'>
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className="form-control task-input"
                                required
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <button
                                onClick={onLogin}
                                className='submit'
                            >
                                Se connecter
                            </button>
                        </div>
                    </form>
                </div>
            </div>


        </>
    )
}

export default Login