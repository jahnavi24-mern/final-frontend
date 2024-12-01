import './TopSection.css';
import Cart from '../Cart/Cart';

const TopSection = ({ onCartClick }) => {
    return (
        <div className="topSection">
            <p> 🌟 Get 5% Off your first order, <span>Promo: ORDER5</span></p>

            <div className="location">
                <img src="../Location.svg" alt="location" />
                <p>Regent Street, A4, A4201, London</p>
                <a href="#">Change Location</a>
            </div>

            <div className="cart" onClick={onCartClick}>
                <img src="../Full Shopping Basket.svg" alt="Basket" />
                <p>My Cart</p>

                <img src="../Forward Button.svg" alt="Arrow" />
            </div>
        </div>
    );
}

export default TopSection;