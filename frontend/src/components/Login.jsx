import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import '../css/login.css';

export default function Login() {
    const { login, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    // if already authenticated
    useEffect(() => {
        if(isAuthenticated()) {
            toast.error('Already logged in');
            navigate('/');
        }
    }, [navigate]);

    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(loginData);
        } catch (error) {
            toast.error('Login failed, please try again');
            console.error('Login error:', error);
        }

        // Reset form after submission
        setLoginData({
            username: "",
            password: "",
        });
    };

    return (
        <form className="login-form" autoComplete="off" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="input-container">
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    required
                    value={loginData.username}
                    onChange={handleChange}
                />
                <i className="fa-solid fa-user"></i>
            </div>
            <div className="input-container">
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={loginData.password}
                    onChange={handleChange}
                />
                <i className="fa-solid fa-lock"></i>
            </div>
            <button type="submit">Login</button>
            <div id="or-div">
                <hr width="40%" size="2" />
                <p>Or</p>
                <hr width="40%" size="2" />
            </div>
            <p>Don't have an account? <Link to="/signup">Create new</Link></p>
        </form>
    );
}