import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const pathname = window.location.pathname;
    const navigate = useNavigate();
    const { user } = useAuth();

    console.log(user, "user");

    return (
        <nav>
            <div>
                <img src="../logo.svg" alt="Logo" />
            </div>

            <ul>
                <li className={pathname === '/home' ? 'active' : ''} onClick={() => navigate('/home')}>Home</li>
                <li>Browse Menu</li>
                <li>Special Offers</li>
                <li className={pathname.startsWith('/product') ? 'active' : ''} onClick={() => navigate('/product')}>Restaurants</li>
                <li>Track Order</li>
                <div className="profile-container" onClick={() => navigate(user ? '/profile' : '/')}>
                    <img src="../Male User.svg" alt="user" />
                    <li className="profile">
                        {user ? `Hey ${user.firstName}` : 'Login/Signup'}
                    </li>
                </div>
            </ul>
        </nav>
    );
}

export default Navbar;