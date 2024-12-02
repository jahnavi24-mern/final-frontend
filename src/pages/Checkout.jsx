import { useNavigate } from 'react-router-dom';
import PopularRestaurants from '../components/PopularRestaurants/PopularRestaurants';
import TopSection from '../components/TopSection/TopSection';
import Navbar from '../components/Navbar/Navbar';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { getProfile } from '../api/api';
import { useState, useEffect } from 'react';
import "../styles/Checkout.css";
import { useBackNavigation } from '../utils/utils';
import { useToast } from '../context/ToastContext';
const Checkout = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { cartItems, totalAmount } = useCart();
    const [profile, setProfile] = useState(null);
    const handleBack = useBackNavigation();
    const toast = useToast();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile();
                if (!data) {
                    throw new Error('Failed to fetch profile');
                }
                setProfile(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
                toast.error('Failed to load profile details');
            }
        };

        fetchProfile();
    }, []);

    // if (!user) {
    //     return <Navigate to="/" state={{ from: location }} />;
    // }

    const navigateToAddress = () => {
        navigate("/address");
    }

    const navigateToPayment = () => {
        if (!profile?.user?.addresses?.length) {
            toast.error('Please add a delivery address first');
            return;
        }
        navigate("/payment");
    }

    return (
        <>
            <TopSection />
            <Navbar />
            <div className="checkout-container">
                <div className="checkout-header">
                    <img src="../arrow-left.svg" alt="arrow" onClick={handleBack}/>
                    <p>Checkout</p>
                </div>

                <div className="checkout-content">
                    <div className="checkout-content-left">
                        {cartItems.map((item) => (
                            <div key={item._id} className="checkout-item">
                                <div className="checkout-item-image">
                                    <img src={item.image} alt="item" />
                                    <div className="checkout-item-details">
                                        <p>{item.quantity}x item</p>
                                        <p>{item.name}</p>
                                    </div>
                                </div>
                                <p>₹{item.price}</p>
                            </div>
                        ))}
                        <label htmlFor="order-note">Notes</label>
                        <input type="text" id="order-note" placeholder="Add order note" />
                    </div>
                    <div className="checkout-content-right">
                        <div className="address" onClick={navigateToAddress}>
                            <div className="address-content-deets">
                                <img src="../Vector.svg" alt="vector" />
                                <div className="address-content">
                                    <p>Delivery Address</p>
                                    <p>{profile?.user?.addresses?.[0]?.fullAddress}</p>
                                </div>
                            </div>

                            <img src="../ArrowRight.svg" alt="arrow" />
                        </div>

                        <div className="amount-details">
                            <div className="amount-details-item">
                                <p>Items</p>
                                <p>₹{totalAmount}</p>
                            </div>
                            <div className="amount-details-item">
                                <p>Sales Tax</p>
                                <p>₹3</p>
                            </div>

                            <div className="subtotal">
                                <p>Subtotal({cartItems.length} items)</p>
                                <p>₹{totalAmount + 3}</p>
                            </div>
                        </div>

                        <div className="choose-payment">
                            <button className="choose-payment-button" onClick={navigateToPayment}>Choose Payment Method</button>
                        </div>

                    </div>
                </div>
            </div >
            <PopularRestaurants />
        </>
    )
}

export default Checkout;