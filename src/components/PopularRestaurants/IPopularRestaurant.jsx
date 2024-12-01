import "./PopularRestaurants.css";
import { getRestaurantById } from "../../api/api";
import { useNavigate } from "react-router-dom";
const IPopularRestaurant = ({ image, name, id }) => {
    if (!image || !name) {
        return null;
    }

    const navigate = useNavigate();

    const handleRestaurantClick = (id) => {
        getRestaurantById(id).then((data) => {
            console.log(data, "API response");
            navigate(`/product/${id}`);
        });
    };

    return (
        <div className="restaurant-card" onClick={() => handleRestaurantClick(id)}>
            <img src={image} alt={name} className="restaurant-image" />
            <h3>{name}</h3>
        </div>
    );
};

export default IPopularRestaurant;
