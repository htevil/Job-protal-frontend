import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { useForm } from 'react-hook-form';

const Dashboard = () => {
    const { userId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [cv, setCv] = useState(null);
    const [cvName, setCvName] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [interest, setInterest] = useState('');
    const [phone, setPhone] = useState('');
    const [age, setAge] = useState('');
    const [graduate_year, setGraduate_year] = useState('');
    const [degree, setDegree] = useState('');
    const [branch, setBranch] = useState('');
    const [college, setCollege] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`https://job-partal-backend.onrender.com/api/users/${userId}`);
                setUserName(response.data.name);
                setUserEmail(response.data.email);
                setInterest(response.data.interest || '');
                setPhone(response.data.phone || '');
                setAge(response.data.age || '');
                setGraduate_year(response.data.graduate_year || '');
                setDegree(response.data.degree || '');
                setBranch(response.data.branch || '');
                setCollege(response.data.college || '');
                setCvName(response.data.cv || '');
            } catch (err) {
                setError('Failed to fetch user data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleDetails = async (data) => {
        const formData = new FormData();
        if (cv) formData.append('cv', cv);
        formData.append('interest', interest);
        formData.append('phone', phone);
        formData.append('age', age);
        formData.append('graduate_year', graduate_year);
        formData.append('degree', degree);
        formData.append('branch', branch);
        formData.append('college', college);

        try {
            await axios.post(`https://job-partal-backend.onrender.com/api/users/details/${userId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Information uploaded successfully');
        } catch (error) {
            alert('Upload failed: ' + (error.response?.data || 'Unknown error'));
        }
    };

    if (loading) return <div>Loading user data...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <Navbar name={userName} />
            <main>
                <h2 style={{marginBottom:"10px"}}>User Profile</h2>
                <form onSubmit={handleSubmit(handleDetails)} className='containerMain'>
                    <div className='containerContext1'>
                        <div className='subContainer'>
                            <label>Email:</label>
                            <input type='email' value={userEmail} disabled />
                        </div>
                        <div className='subContainer'>
                            <label>Phone No:</label>
                            <input type="tel" value={phone} {...register("phone", { required: "Phone number is required", minLength: { value: 10, message: "Phone number must be at least 10 digits" }, maxLength: { value: 12, message: "Phone number cannot exceed 12 digits" } })} placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
                            {errors.phone && <span style={{ color: "red" }}>{errors.phone.message}</span>}
                        </div>
                    </div>
                    <div className='containerContext1'>
                        <div className='subContainer'>
                            <label>Age:</label>
                            <input type="number" value={age} {...register("age", { required: "Age is required", min: { value: 1, message: "Age must be at least 1" }, max: { value: 50, message: "Age must be less than or equal to 50" } })} placeholder="Age" onChange={(e) => setAge(e.target.value)} />
                            {errors.age && <span style={{ color: "red" }}>{errors.age.message}</span>}
                        </div>
                        <div className='subContainer'>
                            <label>Graduate Year:</label>
                            <input type="text" value={graduate_year} {...register("graduate_year", { required: "Graduate year is required", minLength: { value: 4, message: "Graduate year must be at least 4 characters" }, maxLength: { value: 4, message: "Graduate year must be at least 4 characters" } })} placeholder="Graduate Year" onChange={(e) => setGraduate_year(e.target.value)} />
                            {errors.graduate_year && <span style={{ color: "red" }}>{errors.graduate_year.message}</span>}
                        </div>
                    </div>
                    <div className='containerContext1' >
                        <div className='subContainer'>
                            <label>Degree:</label>
                            <input type="text" value={degree} {...register("degree", { required: "Degree is required" })} placeholder="Degree" onChange={(e) => setDegree(e.target.value)} />
                            {errors.degree && <span style={{ color: "red" }}>{errors.degree.message}</span>}
                        </div>
                        <div className='subContainer'>
                            <label>Branch:</label>
                            <input type="text" value={branch} {...register("branch", { required: "Branch is required" })} placeholder="Branch" onChange={(e) => setBranch(e.target.value)} />
                            {errors.branch && <span style={{ color: "red" }}>{errors.branch.message}</span>}
                        </div>
                    </div>
                    <div className='containerContext1'>
                        <div className='subContainer'>
                            <label>College/University Name:</label>
                            <input type="text" value={college} {...register("college", { required: "College/University name is required" })} placeholder="College" onChange={(e) => setCollege(e.target.value)} />
                            {errors.college && <span style={{ color: "red" }}>{errors.college.message}</span>}
                        </div>
                        <div className='subContainer'>
                            <label>Interest:</label>
                            <div className='subContainer1'>
                                <div className='subContainer2'>
                                    <input type="radio" value="Job" {...register("interest", { required: "Please select an interest" })} checked={interest === 'Job'} onChange={(e) => setInterest(e.target.value)} />
                                    <label htmlFor="Job">Job</label>
                                </div>
                                <div className='subContainer2'>
                                    <input type="radio" value="Internship" {...register("interest")} checked={interest === 'Internship'} onChange={(e) => setInterest(e.target.value)} />
                                    <label htmlFor="Internship">Internship</label>
                                </div>
                            </div>
                            {errors.interest && <span style={{ color: "red" }}>{errors.interest.message}</span>}
                        </div>
                    </div>
                    <div className='containerContext1' >
                        <div className='subContainer'>
                            <div className='subContainer1'>
                             <label>CV:</label><div style={{fontSize:"10px", fontWeight:"600"}}> {cvName}</div>
                            </div>
                            <input type="file" onChange={(e) => { setCv(e.target.files[0]); setCvName(e.target.files[0]?.name || ''); }} />
                        </div>
                    </div>
                    <button type="submit" className='primary'>Update Details</button>
                </form>
            </main>
        </>
    );
};

export default Dashboard;