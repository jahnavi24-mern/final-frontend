import './HeroSection.css';
import { fetchImage } from '../../api/api';
import { useState, useEffect } from 'react';

const DealsCard = ({ image, category, discount }) => (
    <div className="deals-card-content">
        <img src={image} alt="offer" className="image" />
        <p className="offer-discount">- {discount}%</p>
        <p className="restaurant-name">Restaurant</p>
        <p className="offer-name">{category}</p>
    </div>
);

const CategoryCard = ({ image, category, count }) => (
    <div className="category-card-content">
        <img src={image} alt="category" className="image" />
        <p>{category}</p>
        <p>{count} Restaurants</p>
    </div>
);

const HeroSection = () => {
    const [images, setImages] = useState({});

    const imagesToFetch = [
        { key: 'hero1', image: 'hero-1' },
        { key: 'hero2', image: 'hero-2' },
        { key: 'deal1', image: 'deal-1' },
        { key: 'deal2', image: 'deal-2' },
        { key: 'category1', image: 'fast-food' },
        { key: 'category2', image: 'salad' },
        { key: 'category3', image: 'pasta' },
        { key: 'category4', image: 'pizza' },
        { key: 'category5', image: 'breakfast' },
        { key: 'category6', image: 'soup' },
    ];

    useEffect(() => {
        const loadImages = async () => {
            try {
                const fetchedImages = await Promise.all(
                    imagesToFetch.map(({ image }) => fetchImage({ image }))
                );

                const imagesMap = imagesToFetch.reduce(
                    (acc, { key }, index) => ({ ...acc, [key]: fetchedImages[index] }),
                    {}
                );

                setImages(imagesMap);
            } catch (error) {
                console.error("Error loading hero images:", error);
            }
        };

        loadImages();
    }, []);

    const cardData = [
        { message: "We've Received your order! 🚀", description: "Awaiting Restaurant acceptance" },
        { message: "Order Accepted! ✅", description: "Your order will be delivered shortly" },
        { message: "Your rider's nearby! 🎉", description: "They're almost there - get ready!" },
    ];

    return (
        <>
            <div className="heroSection">
                <div className="hero-text">
                    <p>Order Restaurant food, takeaway and groceries.</p>
                    <h1>Feast Your Senses, <br /> <span>Fast and Fresh</span></h1>
                    <p>Enter a postcode to see what we deliver</p>

                    <div className="code-container">
                        <input placeholder="e.g. EC4R 3TE" />
                        <button>
                            Search
                            <img src="../Forward Button.svg" alt="forward" />
                            </button>
                    </div>
                </div>

                <div className="hero-image">
                    {images.hero1 && <img src={images.hero1} alt="hero-image-1" className="hero-1" />}
                    {images.hero2 && <img src={images.hero2} alt="hero-image-2" className="hero-2" />}
                    <div className="orange"></div>
                    <div className="cards-container">
                        {cardData.map(({ message, description }, index) => (
                            <div key={index} className="card">
                                <div className="card-header">
                                    <img src="../logo.svg" alt="logo" />
                                    <p>now</p>
                                </div>
                                <h4>{message}</h4>
                                <p>{description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="hero-deals">
                <div className="hero-deals-header">
                    <h1>Up to - 40% 🎊 Order.uk exclusive deals</h1>
                    <div className="hero-deals-header-nav">
                        <p>Vegan</p>
                        <p>Sushi</p>
                        <p>Pizza & Fast Food</p>
                        <p>Others</p>
                    </div>
                </div>
                <div className="hero-deals-body">
                    <DealsCard image={images.deal1} category="Chef Burgers London" discount={40} />
                    <DealsCard image={images.deal2} category="Grand Ai Cafe London" discount={20} />
                    <DealsCard image={images.deal1} category="Butterbrot Caf'e London" discount={17} />
                </div>
            </div>

            <div className="hero-categories">
                <h1>Popular Categories</h1>
                <div className="hero-categories-body">
                    {[
                        { image: images.category1, category: 'Burgers & Fast food', count: 21 },
                        { image: images.category2, category: 'Salads', count: 32 },
                        { image: images.category3, category: 'Pasta & Casuals', count: 4 },
                        { image: images.category4, category: 'Pizza', count: 32 },
                        { image: images.category5, category: 'Breakfast', count: 4 },
                        { image: images.category6, category: 'Soups', count: 32 },
                    ].map(({ image, category, count }, index) => (
                        <CategoryCard key={index} image={image} category={category} count={count} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default HeroSection;
