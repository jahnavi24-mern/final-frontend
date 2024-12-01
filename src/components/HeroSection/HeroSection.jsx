import './HeroSection.css';
import { fetchImage } from '../../api/api';
import { useState, useEffect } from 'react';

const HeroSection = () => {
    const [hero1, setHero1] = useState(null);
    const [hero2, setHero2] = useState(null);
    
    useEffect(() => {
        const loadImages = async () => {
            try {
                const [image1, image2] = await Promise.all([
                    fetchImage({image: "hero-1"}),
                    fetchImage({image: "hero-2"})
                ]);
                setHero1(image1);
                setHero2(image2);
            } catch (error) {
                console.error("Error loading hero images:", error);
            }
        };
        
        loadImages();
    }, []);


    return (
        <div className="heroSection">
            <div className="hero-text">
                <p>Order Restaurant food, takeaway and groceries.</p>
                <h1>Feast Your Senses, Fast and Fresh</h1>
                <p>Enter a postcode to see what we deliver</p>

            <div className="code-container">
                <input placeholder="e.g. EC4R 3TE"></input>
                <button>Search</button>
            </div>

            </div>

            <div className="hero-image">
                {hero1 && <img src={hero1} alt="hero-image-1" className="hero-1"/>}
                {hero2 && <img src={hero2} alt="hero-image-2" className="hero-2"/>}
            </div>
        </div>
    );
}

export default HeroSection;