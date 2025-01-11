// src/components/Admin/AdminLogin.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../AuthProvider'; // Import the Auth context

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth(); // Get the login function from context

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('https://job-partal-backend.onrender.com/api/admin/login', { email, password });
            localStorage.setItem('adminToken', response.data.token); // Store the token
            login(response.data.token); // Update the auth context
            toast.success('Admin login successful');
            navigate('/adminpanel'); // Redirect to the admin panel
        } catch (error) {
            toast.error('Login failed: ' + (error.response?.data || 'Unknown error'));
        } finally {
            setLoading(false);
        }
    };

    const NavigateLogin = () => {
        navigate('/');
    };

    return (
        <>
            <div className='container' >
                <div className='containerHeader'>
                    <h3>Admin Login</h3>
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
                    <button className='secondary' onClick={NavigateLogin} >User Login</button>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default AdminLogin;