import './Cart.css';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useEffect } from 'react';
const Cart = ({ isOpen, onClose }) => {
    const MIN_ORDER_AMOUNT = 20;
    const { id: restaurantId } = useParams();
    const [searchParams] = useSearchParams();
    const shareId = searchParams.get('shareId');
    const navigate = useNavigate();
    const { cartItems, totalAmount, removeFromCart, loadCart, shareCurrentCart } = useCart();

    const isOrderBelowMinimum = totalAmount < MIN_ORDER_AMOUNT;
    const remainingAmount = MIN_ORDER_AMOUNT - totalAmount;

    useEffect(() => {
        if (shareId) {
            loadCart(shareId);
        } else {
            loadCart();
        }
    }, [shareId]);

    const handleDelete = (itemId) => {
        removeFromCart(itemId);
    };

    const handleCheckout = () => {
        navigate('/checkout');
    }

    const handleShareCart = async () => {
        if (!restaurantId || cartItems.length === 0) {
            alert('Restaurant ID is missing or cart is empty.');
            return;
        }
        const shareId = await shareCurrentCart(restaurantId, cartItems);
        if (shareId) {
            const shareUrl = `${window.location.origin}/product/${restaurantId}?shareId=${shareId}`;
            await navigator.clipboard.writeText(shareUrl);
            alert('Cart link copied to clipboard!');
        } else {
            alert('Failed to share the cart. Please try again.');
        }
    };


    return (
        <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
            <div className="share-container">
                <img src="../share-2.svg" alt="share" />
                <p>Share this cart with your friends</p>
                <button onClick={handleShareCart}>Copy Link</button>
            </div>
            <div className="cart-container">
                <div className="cart-header">
                    <img src="../Full Shopping Basket.svg" alt="cart" />
                    <h2>My Basket</h2>
                </div>
                {(cartItems.length > 0) ? (
                    <div className="cart-items">
                        {cartItems.map((cartItem) => (
                            <div className="cart-item" key={cartItem._id}>
                                <div className="quantity">
                                    <p>x{cartItem.quantity}</p>
                                </div>
                                <div className="item-details">
                                    <p>₹{cartItem.price * cartItem.quantity}</p>
                                    <p>{cartItem.name}</p>
                                </div>
                                <div
                                    className="delete-button"
                                    onClick={() => handleDelete(cartItem._id)}
                                >
                                    <img src="../Remove.svg" alt="delete" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="cart-empty">
                        <p>Your cart is empty</p>
                    </div>
                )}
                <div className="cart-footer">
                    <div className="cart-total bill">
                        <span>Sub Total:</span>
                        <span>₹{totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="discount bill">
                        <span>Discount:</span>
                        <span>-₹3</span>
                    </div>
                    <div className="delivery-fee bill">
                        <span>Delivery Fee:</span>
                        <span>₹10</span>
                    </div>
                    <div className="total">
                        <span>Total to pay</span>
                        <span>₹{(totalAmount - 3 + 10).toFixed(2)}</span>
                    </div>

                    <div className="free-item">
                        <p>Choose your free item</p>
                        <img src="../Forward Button.svg" alt="forward" />
                    </div>
                    <div className="coupons">
                        <p>Apply Coupon Code here</p>
                        <img src="../Forward Button.svg" alt="forward" />
                    </div>


                    <div className="footer-before">
                        <div className="footer-before-1 left">
                            <img src="../Delivery Scooter.svg" alt="delivery" />
                            <p>Delivery</p>
                            <p>Starts at 17:50</p>
                        </div>

                        <div className="footer-before-1 right">
                            <img src="../New Store.svg" alt="store" />
                            <p>Collection</p>
                            <p>Starts at 16:50</p>
                        </div>
                    </div>
                    <button
                        className="checkout-button"
                        onClick={handleCheckout}
                        disabled={isOrderBelowMinimum}
                    >
                        Checkout
                    </button>

                    {isOrderBelowMinimum && (
                        <div className="tooltip">
                            Minimum delivery is ₹{MIN_ORDER_AMOUNT}. You must spend ₹{remainingAmount} more for checkout!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;