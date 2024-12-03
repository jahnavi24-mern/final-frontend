import { useParams } from "react-router-dom";
import Restaurant from "../components/Restaurant/Restaurant";
import TopSection from "../components/TopSection/TopSection";
import Navbar from "../components/Navbar/Navbar";
import PopularRestaurants from "../components/PopularRestaurants/PopularRestaurants";
import { useState } from "react";

const Product = () => {
    const { id } = useParams();
    const [isCartOpen, setIsCartOpen] = useState(false);

    if(!id) {
        return (
            <div>
                <TopSection onCartClick={() => setIsCartOpen(true)} />
                <Navbar />
                <PopularRestaurants />
            </div>
        )
    }

    return (
        <div>
            <TopSection onCartClick={() => setIsCartOpen(true)} />
            <Navbar />
            <Restaurant id={id} isCartOpen={isCartOpen} onCartClose={() => setIsCartOpen(false)} />
            <PopularRestaurants />
        </div>
    )
}

export default Product;