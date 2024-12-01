import "./OrderMoreSection.css";
import { fetchImage } from "../../api/api";
import { useState, useEffect } from "react";
import { Downloads } from "../Footer/Footer";


const OrderMoreSection = () => {
    const [image, setImage] = useState(null);
    const [partnerImage1, setPartnerImage1] = useState(null);
    const [partnerImage2, setPartnerImage2] = useState(null);

    useEffect(() => {
        fetchImage({ image: "friends" }).then((data) => setImage(data));
        fetchImage({ image: "withus-1" }).then((data) => setPartnerImage1(data));
        fetchImage({ image: "withus-2" }).then((data) => setPartnerImage2(data));
    }, []);


    const partnerWithUs = (image, text, text2, msg) => {
        return (
            <div className="partner-with-us">
                <p className="msg">{msg}</p>
                <img src={image} alt="partner with us" />
                <div className="partner-with-us-text">
                    <p className="sign-up">Sign up as a {text}</p>
                    <p className="partner-with-us-text-2">{text2} with us</p>
                    <button>Get Started</button>
                </div>
            </div>
        )
    }
    return (
        <div className="order-more-section">
            <div className="order-more-section-content">
                <img src={image} alt="order more" className="friends-1" />
                <img src={image} alt="order more" className="friends-2" />

                <div className="order-more-section-content-text">
                    <div className="order-more-section-content-text-logo">
                        <img src="../public/logo.svg" alt="order more" className="text-logo" />
                        <span>ing is more</span>
                    </div>
                    <p className="personalised-instant"><span>Personalised</span> & Instant</p>
                    <p className="download-app">Download the Order.uk app for faster ordering</p>
                    <Downloads />
                </div>

            </div>
            <div className="partner-with-us">
                {partnerWithUs(partnerImage1, "business", "Partner", "Earn more with lower fees")}
                {partnerWithUs(partnerImage2, "rider", "Ride", "Avail exclusive perks")}
            </div>
            <div className="know-more">
                <div className="know-more-content">
                    <div className="know-more-content-text">
                        <h2>Know more about us!</h2>
                    </div>

                    <div className="know-more-content-text-nav">
                        <a href="#">Frequently Asked Questions</a>
                        <a href="#">Who we are?</a>
                        <a href="#">Partner Program</a>
                        <a href="#">Help & Support</a>
                    </div>
                </div>
                <div className="know-more-content-2">
                    <div className="know-more-content-2-text">
                        <p>How does Order.UK work?</p>
                        <p>What payment methods are accepted?</p>
                        <p>Can I track my order in real-time?</p>
                        <p>Are there any special discounts or promotions available?</p>
                        <p>Is Order.UK available in my area?</p>
                    </div>
                    <div className="know-more-content-2-details">
                        <div className="icon-container">
                            <div className="icon">
                                <h2>Place an Order!</h2>
                                <img src="../order-food 1.svg" alt="order more" />
                                <p>Place order through our website or Mobile app</p>
                            </div>

                            <div className="icon">
                                <h2>Track Progress</h2>
                                <img src="../food 1.svg" alt="order more" />
                                <p>Your can track your order status with delivery time</p>
                            </div>

                            <div className="icon">
                                <h2>Get your Order!</h2>
                                <img src="../order 1.svg" alt="order more" />
                                <p>Receive your order at a lighting fast speed!</p>
                            </div>

                        </div>
                        <div className="know-more-content-2-details-text">
                            <p>Order.UK simplifies the food ordering process. Browse through our diverse menu, select your favorite dishes, and proceed to checkout. Your delicious meal will be on its way to your doorstep in no time!</p>
                        </div>

                    </div>
                </div>
            </div>
            <div className="company-details">
                <div className="company-details-content">
                    <p>546+</p>
                    <p>Registered Riders</p>
                </div>
                <div className="company-details-content">
                    <p>789,000+</p>
                    <p>Orders Delivered</p>
                </div>
                <div className="company-details-content">
                    <p>690+</p>
                    <p>Restaurants Partnered</p>
                </div>
                <div className="company-details-content">
                    <p>17,457+</p>
                    <p>Food items</p>
                </div>
            </div>
        </div>
    );
}

export default OrderMoreSection;