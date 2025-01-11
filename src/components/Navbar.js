import profileLogo from "../assets/manage-admin_logo.png"
import logo from "../assets/job.png"
import logout_logo from "../assets/logout_logo.png"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider'; // Import the Auth context

export default function Navbar({ name }) {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header>
            <div className="logo">
                <img src={logo} alt="logo_img" className="logoImg" />
                <h4 className="Heading">JOB PORTAL</h4>
            </div>
            <div className="Info">
                <div className="userInfo">
                    <img src={profileLogo} alt="Profile_img" className="profile-img" />
                    <div className="userName">{name}</div>
                </div>
                <button onClick={handleLogout} className="logoutBtn">
                    <img src={logout_logo} alt="logout_img" className="logout-img" />
                </button>
            </div>

        </header>
    );
}

