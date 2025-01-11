import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const handleRegister = async (data) => {
        const { name, email, password } = data;
        try {
            await axios.post('https://job-partal-backend.onrender.com/api/users/signup', { name, email, password });
            toast.success('Registration successful!');
            navigate('/');
        } catch (error) {
            toast.error('Registration failed: ' + (error.response?.data || 'Unknown error'));
        }
    };

    const NavigateLogin = () => {
        navigate('/');
    };

    return (
        <div className='container'>
        <div className='containerHeader'>
            <h3>Sign Up</h3>
        </div>
            <form onSubmit={handleSubmit(handleRegister)} className='containerMain'>
                <div className='containerContext'>
                    <label>Name:</label>
                    <input type="text" placeholder="Name" {...register("name", { required: true, pattern: /^[a-zA-Z\s]+$/i, minLength: 3 })} />
                    {errors.name?.type === "required" && <span>- Name is required</span>}
                    {errors.name?.type === "pattern" && <span>- Name must contain letters only</span>}
                    {errors.name?.type === "minLength" && <span>- Name must be at least 3 characters long</span>}
                </div>
                <div className='containerContext'>
                    <label>Email:</label>
                    <input type="email" placeholder="Email" {...register("email", { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/i })} />
                    {errors.email?.type === "required" && <span>- Email is required</span>}
                    {errors.email?.type === "pattern" && <span>- Entered email is in wrong format</span>}
                </div>
                <div className='containerContext'>
                    <label>Password:</label>
                    <input type="password" placeholder="Password" {...register("password", { required: true, minLength: 8, pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ })} />
                    {errors.password?.type === "required" && <span>- Password is required</span>}
                    {errors.password?.type === "minLength" && <span>- Password must be at least 8 characters long</span>}
                    {errors.password?.type === "pattern" && <span>- Password must contain at least 1 letter, 1 number, and 1 special character</span>}
                </div>
                <button type="submit" className='primary'>Sign Up</button>
            </form>
            <div className='containerFooter'>
                <button className='secondary' onClick={NavigateLogin} >User Login</button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SignUp;
