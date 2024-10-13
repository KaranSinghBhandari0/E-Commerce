import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import '../css/login.css';

export default function Signup() {
    const { signup, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    // if already authenticated
    useEffect(() => {
        if(isAuthenticated()) {
            toast.error('Already logged in');
            navigate('/');
        }
    }, [navigate]);

    const [registrationData, setRegistrationData] = useState({
        username: "",
        password: "",
        email: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegistrationData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(registrationData);
        } catch (error) {
            console.error('Signup error:', error);
        }

        setRegistrationData({
            username: "",
            password: "",
            email: "",
        });
    };

    return (
        <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
            <h1>SignUp</h1>
            <div className="input-container">
                <input type="text" 
                    name="username" 
                    placeholder="Username" 
                    onChange={handleChange} 
                    value={registrationData.username} 
                    required 
                />
                <i className="fa-solid fa-user"></i>
            </div>
            <div className="input-container">
                <input type="email" 
                    name="email" 
                    placeholder="e-mail" 
                    onChange={handleChange} 
                    value={registrationData.email} 
                    required 
                />
                <i className="fa-solid fa-envelope"></i>
            </div>
            <div className="input-container">
                <input type="password" 
                    name="password" 
                    placeholder="Password" 
                    onChange={handleChange} 
                    value={registrationData.password} 
                    required 
                />
                <i className="fa-solid fa-lock"></i>
            </div>
            <button type="submit">SignUp</button>
            <div id="or-div">
                <hr width="40%" size="2" />
                <p>Or</p>
                <hr width="40%" size="2" />
            </div>
            <p>already have an account ? <Link to='/login'>login</Link></p>
        </form>
    );
}