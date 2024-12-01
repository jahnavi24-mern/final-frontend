import "./PopularRestaurants.css";
import { getAllRestaurants } from "../../api/api";
import { useState, useEffect } from "react";
import IPopularRestaurant from "./IPopularRestaurant";

const PopularRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        getAllRestaurants().then((data) => {
            setRestaurants(data || []);
        });
    }, []);

    return (
        <div className="popular-restaurants">
            <h1>Popular Restaurants</h1>
            <div className="cards">
                {restaurants.length > 0 ? (
                    restaurants.map((restaurant) => {
                        if (!restaurant.name || !restaurant.image) return null;

                        return (
                            <IPopularRestaurant
                                key={restaurant._id}
                                image={restaurant.image}
                                name={restaurant.name}
                                id={restaurant._id}
                            />
                        );
                    })
                ) : (
                    <p>No popular restaurants available at the moment.</p>
                )}
            </div>
        </div>
    );
};

export default PopularRestaurants;
