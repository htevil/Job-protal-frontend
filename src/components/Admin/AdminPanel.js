import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form'; // Import useForm
import Navbar from '../Navbar';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formVisible, setFormVisible] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm(); // Initialize useForm

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/users');
            setUsers(response.data);
        } catch (err) {
            setError('Failed to fetch users');
            toast.error('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateUser = async (data) => {
        const { name, email, password } = data; // Destructure data from form submission
        try {
            await axios.post('http://localhost:5000/api/admin/users', { name, email, password });
            toast.success('User  created successfully');
            setFormVisible(false);
            fetchUsers(); // Refresh the user list
        } catch (err) {
            toast.error('Failed to create user');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
                toast.success('User  deleted successfully');
                setUsers(users.filter(user => user.id !== id));
            } catch (err) {
                toast.error('Failed to delete user');
            }
        }
    };

    const handleViewCV = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/admin/cv/${id}`, {
                responseType: 'blob' // Important for handling file downloads
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'cv.pdf'); // Set the file name for download
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.log(error.response.data)
            toast.error('Download failed: Cv is not found');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) {
        return <div>Loading users...</div>; // You can replace this with a spinner
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <Navbar name="Admin" />
            <main>
                <div className='containerHeader1'>
                    <h2>Admin Panel</h2>
                    <button className='primary' onClick={() => { setFormVisible(true); }} >Add User</button>
                </div>
                {formVisible && (
                    <form onSubmit={handleSubmit(handleCreateUser)} className='containerContext2'>

                        <input type="text" placeholder="Name" {...register("name", { required: true, pattern: /^[a-zA-Z\s]+$/i, minLength: 3 })} />
                        {errors.name?.type === "required" && <span > Name is required</span>}
                        {errors.name?.type === "pattern" && <span > Name must contain letters only</span>}
                        {errors.name?.type === "minLength" && <span > Name must be at least 3 characters long</span>}

                        <input type="email" placeholder="Email" {...register("email", { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/i })} />
                        {errors.email?.type === "required" && <span > Email is required</span>}
                        {errors.email?.type === "pattern" && <span > Entered email is in wrong format</span>}

                        <input type="password" placeholder="Password" {...register("password", { required: true, minLength: 8, pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ })} />
                        {errors.password?.type === "required" && <span > Password is required</span>}
                        {errors.password?.type === "minLength" && <span > Password must be at least 8 characters long</span>}
                        {errors.password?.type === "pattern" && <span > Password must contain at least 1 letter, 1 number, and 1 special character</span>}

                        <button type="submit" className='primary'>Create</button>
                    </form>
                )}
                <div className='containerTable'>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Interest</th>
                                <th>Phone</th>
                                <th>Age</th>
                                <th>Graduate Year</th>
                                <th>Degree</th>
                                <th>Branch</th>
                                <th>College</th>
                                <th>CV</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td >{user.name}</td>
                                    <td >{user.email}</td>
                                    <td >{user.interest}</td>
                                    <td >{user.phone}</td>
                                    <td >{user.age}</td>
                                    <td >{user.graduate_year}</td>
                                    <td >{user.degree}</td>
                                    <td >{user.branch}</td>
                                    <td >{user.college}</td>
                                    <td >
                                        <button onClick={() => handleViewCV(user.id)} style={{ padding: '6px', backgroundColor: "#007bff", color: '#fff', border: 'none', borderRadius: '2px', fontSize: "10px" }} >View CV</button>
                                    </td>
                                    <td >
                                        <button onClick={() => handleDelete(user.id)} style={{ padding: '6px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '2px', fontSize: "10px" }}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
            <ToastContainer />
        </>
    );
};

export default AdminPanel;