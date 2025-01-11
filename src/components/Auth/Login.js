// src/components/Auth/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../AuthProvider'; // Import the Auth context
import logo from "../../assets/job.png"

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth(); // Get the login function from context

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
            const { token, userId } = response.data;

            // Store the token and update context
            localStorage.setItem('userToken', token);
            login(token);

            // Show success toast and redirect
            toast.success('Login successful');
            navigate(`/dashboard/${userId}`);
        } catch (error) {
            toast.error('Login failed: ' + (error.response?.data || 'Unknown error'));
        } finally {
            setLoading(false);
        }
    };

    const NavigatorAdminLogin = () => {
        navigate('/admin');
    };

    const NavigateSignup = () => {
        navigate('/signup');
    };

    return (
    <>
        <div className='container'>
            <div className="logo" style={{margin:"0px"}}>
                <img src={logo} alt="logo_img" className="logoImg" />
                <h4 className="Heading">JOB PORTAL</h4>
            </div>
            <div className='containerHeader'>
                <h3>Login</h3>
            </div>
            <form onSubmit={handleLogin} className='containerMain'>
                <div className='containerContext'>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                </div>
                <div className='containerContext'>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required autoComplete='off' />
                </div>
                <button className='primary' type="submit" disabled={loading} > {loading ? 'Logging in...' : 'Login'} </button>
            </form>
            <div className='containerFooter'>
                <button className='secondary' onClick={NavigateSignup} >Sign Up</button>
                <button className='secondary' onClick={NavigatorAdminLogin}>Admin Login</button> 
            </div>
        </div>
        <ToastContainer />
    </>
    );
};

export default Login;
