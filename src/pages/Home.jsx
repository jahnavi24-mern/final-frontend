import React from 'react';
import TopSection from '../components/TopSection/TopSection';
import Navbar from '../components/Navbar/Navbar';
import HeroSection from '../components/HeroSection/HeroSection';
import PopularRestaurants from '../components/PopularRestaurants/PopularRestaurants';
import OrderMoreSection from '../components/OrderMoreSection/OrderMoreSection';
const Home = () => {
    return (
        <div>
            <TopSection />
            <Navbar />
            <HeroSection />
            <PopularRestaurants />
            <OrderMoreSection />
        </div>
    );
}

export default Home;