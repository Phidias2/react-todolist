import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const onSubmit = async (e) => {

        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, password: password, username: username })
        };
        fetch(`http://127.0.0.1:8000/api/signup`, requestOptions)
            .then(response => response.json())
            .then(() => {
                navigate("/login")
            }).catch(
                (error) => {
                    console.log(error);
                }
            )


    }

    return (

        <div className='container'>
            <div className='app-wrapper' style={{ textAlign: "center" }}>
                <form className="form-contain">
                    <h1 style={{ color: "white" }}>Register</h1>
                    <hr />

                    <div>
                        <label htmlFor="email-address" className='form-label'>
                            Email address
                        </label>
                        <input
                            type="email"
                            label="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Email address"
                            className="form-control task-input"

                        />
                    </div>

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
                            onClick={onSubmit}
                            className='submit'
                        >
                            Se connecter
                        </button>
                    </div>
                </form>
                <p>
                    Already have an account?{' '}
                    <NavLink to="/login" >
                        Sign in
                    </NavLink>
                </p>
            </div>
        </div>
    )
}

export default Register