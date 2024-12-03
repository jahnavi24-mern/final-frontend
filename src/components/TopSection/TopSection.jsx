import './TopSection.css';
import { useState, useEffect } from 'react';
import { getProfile } from '../../api/api';
const TopSection = ({ onCartClick }) => {
    const [address, setAddress] = useState(null);

    useEffect(() => {
        // const user = JSON.parse(localStorage.getItem('user'));
         getProfile().then((user) => {
            setAddress(user?.user?.addresses?.[0]);
         }).catch((err) => {
            console.log(err);
         });
    }, []);


    return (
        <div className="topSection">
            <p> 🌟 Get 5% Off your first order, <span>Promo: ORDER5</span></p>

            <div className="location">
                <img src="../Location.svg" alt="location" />
                <p>{address ? address?.fullAddress : "Select Location"}</p>
                <a href="/address">Change Location</a>
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