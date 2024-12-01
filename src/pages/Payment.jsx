import TopSection from "../components/TopSection/TopSection";
import Navbar from "../components/Navbar/Navbar";
import "../styles/Payment.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Payment = () => {
    const navigate = useNavigate();
    const { cartItems, totalAmount, clearCart } = useCart();
    const [isPaymentComplete, setIsPaymentComplete] = useState(false);

    const handlePayment = () => {
        setIsPaymentComplete(true);
    }

    const handleBackToHome = () => {
        navigate('/home');
        clearCart();
    }

    return (
        <>
            <TopSection />
            <Navbar />
            {!isPaymentComplete ? (
                <div className="payment-container">
                    <div className="payment-header">
                        <img src="../arrow-left.svg" alt="arrow-left" />
                        <p>Choose and Pay</p>
                    </div>

                    <div className="payment-content">
                        <div className="payment-content-left-container">
                            <div className="payment-content-left">
                                <div className="first-element">
                                    <div className="first-element-image">
                                        <img src="../wallet.svg" alt="wallet" />
                                        <div className="payment-content-left-text">
                                            <p>Wallet</p>
                                            <p>Available Balance: ₹300</p>
                                        </div>
                                    </div>
                                    <img src="../ArrowRight.svg" alt="arrow-right" />
                                </div>

                                <div className="payment-content-left-cards">
                                    <ul>
                                        <li>
                                            <p><i>M</i></p>
                                            <p>MaestroKard</p>
                                        </li>
                                        <li>
                                            <p><i>P</i></p>
                                            <p>PayPal</p>
                                        </li>
                                        <li>
                                            <p><i>S</i></p>
                                            <p>Stripe</p>
                                        </li>
                                    </ul>
                                </div>

                                <div className="add-card">
                                    <img src="../plus-2.svg" alt="plus" />
                                    <p>Add Debit Card</p>
                                </div>
                            </div>
                        </div>

                        <div className="payment-content-right">
                            <div className="payment-content-right-container">
                                <p>Amount to be paid</p>
                                <p>₹{totalAmount}</p>
                            </div>
                            <button className="button-payment" onClick={handlePayment}>Proceed Payment</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="order-confirmation-container">
                    <div className="confirmation-content">
                        <img src="../tick.svg" alt="success" />
                        <h2>Order Placed Successfully</h2>
                        <p>Your order is confirmed and on its way. Get set to savor your chosen delights!</p>
                        <div className="confirmation-items">
                            {cartItems.map((item) => (
                                <div className="confirmation-item">
                                    <p>{item.name}</p>
                                </div>
                            ))}
                            <button className="home-button" onClick={handleBackToHome}>Back to Home</button>
                        </div>
                        
                    </div>
                </div>
            )}
        </>
    )
}

export default Payment;