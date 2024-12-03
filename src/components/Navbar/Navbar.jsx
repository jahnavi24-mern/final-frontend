import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import Cart from '../Cart/Cart';
import { useState } from 'react';

const Navbar = () => {
    const pathname = window.location.pathname;
    const navigate = useNavigate();
    const { user } = useAuth();
    const { cartItems } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);

    const handleCart = () => {
        setIsCartOpen(prev => !prev);
    };

    const handleCartClose = () => {
        setIsCartOpen(false);
    };

    return (
        <>
            <nav>
                <div>
                    <img src="../logo.svg" alt="Logo" className="logo" />
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

                <img src="../Menu.svg" alt="hamburger" className="hamburger" />
            </nav>

            <div className="profile-cart-container">
                <div className="profile-container" onClick={() => navigate(user ? '/profile' : '/')}>
                    <img src="../Male User.svg" alt="user" />
                    <li className="profile">
                        {user ? `Hey ${user.firstName}` : 'Login/Signup'}
                    </li>
                </div>
                <div className="cart-container-home" onClick={handleCart}>
                    <img src="../Full Shopping Basket.svg" alt="cart" />
                    <li>My Cart</li>
                    {cartItems.length > 0 && (
                        <span className="cart-count">{cartItems.length}</span>
                    )}
                </div>
            </div>

            {isCartOpen && (
                <div className="cart-overlay">
                    <Cart
                        isOpen={isCartOpen}
                        onClose={handleCartClose}
                        items={cartItems}
                    />
                </div>
            )}
        </>
    );
}

export default Navbar;