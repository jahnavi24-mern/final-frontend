import { getRestaurantById } from "../../api/api";
import { useState, useEffect } from "react";
import { fetchImage, searchRestaurant } from "../../api/api";
import "./Restaurant.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Cart from "../Cart/Cart";
import { useCart } from '../../context/CartContext';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const Restaurant = ({ id, isCartOpen, onCartClose }) => {
    const { addToCart, cartItems, clearCart, shareCurrentCart, loadCart } = useCart();
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState("");
    const [error, setError] = useState(null);
    const [sharedCart, setSharedCart] = useState(null);
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const shareId = params.get('shareId');

        if (shareId) {
            loadCart(shareId);
        }
    }, []);

    const fetchData = async (restaurantId) => {
        try {
            const data = await getRestaurantById(restaurantId);
            setRestaurant(data);
            const imageData = await fetchImage({ image: "product-burger" });
            setImage(imageData);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching restaurant data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        try {
            const data = await searchRestaurant({restaurantId: id, query: searchTerm});
            setProducts(data);
            setError(null);
        } catch (err) {
            if (err.response?.status === 404) {
                setError("Nothing found");
                setProducts([]);
            } else {
                console.error('Error searching products:', err);
                setError("Error searching products");
            }
        }
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchTerm) {
                handleSearch(searchTerm);
            } else {
                getRestaurantById(id);
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    useEffect(() => {
        fetchData(id);
    }, [id]);

    if (error) {
        return <div className="error-message">Error loading restaurant: {error}</div>;
    }

    const deliveryHours = [
        { day: 'Monday', hours: '12:00 AM-3:00 AM, 8:00 AM-3:00 AM' },
        { day: 'Tuesday', hours: '8:00 AM-3:00 AM' },
        { day: 'Wednesday', hours: '8:00 AM-3:00 AM' },
        { day: 'Thursday', hours: '8:00 AM-3:00 AM' },
        { day: 'Friday', hours: '8:00 AM-3:00 AM' },
        { day: 'Saturday', hours: '8:00 AM-3:00 AM' },
        { day: 'Sunday', hours: '8:00 AM-12:00 AM' },
        { day: 'Estimated time until delivery', hours: '20 min' }
    ];

    const operationalTimes = [
        { day: 'Monday', hours: '8:00 AM-3:00 AM' },
        { day: 'Tuesday', hours: '8:00 AM-3:00 AM' },
        { day: 'Wednesday', hours: '8:00 AM-3:00 AM' },
        { day: 'Thursday', hours: '8:00 AM-3:00 AM' },
        { day: 'Friday', hours: '8:00 AM-3:00 AM' },
        { day: 'Saturday', hours: '8:00 AM-3:00 AM' },
        { day: 'Sunday', hours: '8:00 AM-12:00 AM' },
    ];

    const review = [{
        name: "St Glx",
        address: "South London",
        rating: 5,
        date: "24th September, 2023",
        review: "The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly, the staff was friendly, and the food was up to the usual McDonald's standard - hot and satisfying."
    },
    {
        name: "John Doe",
        address: "South London",
        rating: 5,
        date: "24th September, 2023",
        review: "The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly, the staff was friendly, and the food was up to the usual McDonald's standard - hot and satisfying."
    },
    {
        name: "Jane Smith",
        address: "South London",
        rating: 5,
        date: "24th September, 2023",
        review: "The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly, the staff was friendly, and the food was up to the usual McDonald's standard - hot and satisfying."
    }
    ]

    const defaultLocation = [51.505, -0.09];

    const handleAddToCart = (product) => {
        console.log('Product being added:', product);
        addToCart({
            product,
            restaurantId: restaurant?.restaurant?._id
        });
    };

    const handleOrderSuccess = () => {
        clearCart();
    };

    const handlePrevReview = () => {
        setCurrentReviewIndex((prevIndex) =>
            prevIndex === 0 ? review.length - 1 : prevIndex - 1
        );
    };

    const handleNextReview = () => {
        setCurrentReviewIndex((prevIndex) =>
            prevIndex === review.length - 1 ? 0 : prevIndex + 1
        );
    };

    const customerReview = (reviewData) => {
        return (
            <div className="customer-review-item">
                <div className="customer-review-item-header">
                    <img src="../profile.svg" alt="profile" />
                    <div className="customer-review-item-header-content">
                        <p>{reviewData.name}</p>
                        <p>{reviewData.address}</p>
                    </div>
                    <div className="customer-review-item-header-rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star}>★</span>
                        ))}
                        <p>{reviewData.date}</p>
                    </div>
                </div>
                <p>{reviewData.review}</p>
            </div>
        )
    };

    useEffect(() => {
        console.log('Current cart:', cartItems);
    }, [cartItems]);

    const ratingSection = () => {
        return (
            <div className="rating-container">
                <p>{restaurant?.restaurant?.rating}</p>
                <div className="stars-container">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <div key={star} className="star-wrapper">
                            <span className="star-empty">★</span>
                            <span
                                className="star-filled"
                                style={{
                                    width: `${star <= restaurant?.restaurant?.rating ? 100 : 0}%`
                                }}
                            >★</span>
                        </div>
                    ))}
                </div>
                <p className="rating-container-reviews">1,360 reviews</p>
            </div>
        )
    }

    const renderSearchResults = () => {
        if (!products || !Array.isArray(products)) {
            return <div>No results found.</div>;
        }

        if (products.length === 0) {
            return <div>No results found.</div>;
        }
        
        if (searchTerm && products.length > 0) {
            return (
                <div className="products-item">
                    <p className="category-name">Search Results</p>
                    <div className="products-item-products">
                        {products.map((product, index) => (
                            <div className="products-item-product" key={product._id || index}>
                                <div className="product-content">
                                    <p className="product-name">{product.name}</p>
                                    <p className="product-description">{product.description}</p>
                                    <p className="product-price">₹ {product.price}</p>
                                </div>
                                <img src={product.image} alt="product" className="product-image" />
                                <div className="add-button-product" onClick={() => handleAddToCart(product)}>
                                    <img src="../Plus.svg" alt="plus" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="restaurant-container-wrapper">
            <div className="restaurant-container">
                <div className="restaurant-container-image"></div>
                <img src={image} alt="food" className="restaurant-container-image-food" />
                <div className="restaurant-content">
                    <div className="restuarant-content-left">
                        <p>I'm lovin' it!</p>
                        <h1>{restaurant?.restaurant?.name}</h1>
                        <div className="restaurant-content-details">
                            <div className="restaurant-content-details-item">
                                <img src="../Order Completed.svg" alt="order-complete" />
                                <p>Minimum Order: Rs.150</p>
                            </div>
                            <div className="restaurant-content-details-item">
                                <img src="../Motocross.svg" alt="motocross" />
                                <p>Delivery Time: 20-25 mins</p>
                            </div>
                        </div>
                    </div>

                    <div className="restaurant-content-right">
                        {ratingSection()}
                        <img src={image} alt="food" className="restaurant-content-right-image" />
                    </div>

                </div>

                <div className="opening-hours">
                    <img src="../Clock.svg" alt="clock" />
                    <p>Open until 3:00 AM</p>
                </div>

            </div>

            <div className="offers-container">
                <p>All Offers from {restaurant?.restaurant?.name}</p>
                <div className="search-container">
                    <input type="text" placeholder="Search from menu..." onChange={(e) => setSearchTerm(e.target.value)} />
                    <button className="search-button" onClick={handleSearch}>
                        <img src="../Search More.svg" alt="search" />
                    </button>
                </div>
            </div>

            <div className="categories-container">
                <div className="categories-nav">
                    <p>Offers</p>
                    <p>Burgers</p>
                    <p>Fries</p>
                    <p>Snacks</p>
                    <p>Salads</p>
                    <p>Cold Drinks</p>
                    <p>Happy Meals®</p>
                    <p>Desserts</p>
                    <p>Hot Drinks</p>
                    <p>Sauces</p>
                    <p>Orbit®</p>
                </div>

                <div style={{
                    display: 'flex',
                    position: 'relative',
                    width: '100%'
                }}>
                    <div className="categories-items">
                        <div className="categories-item">
                            {restaurant?.restaurant?.offers?.map((offer, index) => (
                                <div className="categories-item-offer" key={offer.id || index}>
                                    <div className="offer-content">
                                        <img src={offer?.image} alt="offer" className="image-offer" />
                                        <p className="offer-discount">- {offer?.discount}%</p>
                                        <p className="restaurant-name">{restaurant?.restaurant?.name}</p>
                                        <p className="offer-name">{offer?.name}</p>
                                    </div>
                                    <div className="add-button">
                                        <img src="../Plus.svg" alt="plus" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {(cartItems?.length > 0 || sharedCart) && (
                        <Cart
                            isOpen={true}
                            onClose={onCartClose}
                            onOrderSuccess={handleOrderSuccess}
                            items={sharedCart?.items || cartItems}
                            isSharedCart={!!sharedCart}
                            onExitSharedCart={() => setSharedCart(null)}
                        />
                    )}
                </div>
            </div>

            <div className="products-container">
                {searchTerm ? (
                    <>
                        {error ? (
                            <div className="error-message">Nothing found</div>
                        ) : (
                            renderSearchResults()
                        )}
                    </>
                ) : (
                    restaurant?.categories?.map((category, index) => (
                        <div className="products-item" key={category.id || index}>
                            <p className="category-name">{category?.name}</p>
                            <div className="products-item-products">
                                {category?.products?.map((product, index) => (
                                    <div className="products-item-product" key={product.id || index}>
                                        <div className="product-content">
                                            <p className="product-name">{product?.name}</p>
                                            <p className="product-description">{product?.description}</p>
                                            <p className="product-price">₹ {product?.price}</p>
                                        </div>
                                        <img src={product?.image} alt="product" className="product-image" />
                                        <div className="add-button-product" onClick={() => handleAddToCart(product)}>
                                            <img src="../Plus.svg" alt="plus" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="restaurant-operation-container">
                <div className="restaurant-operation">
                    <div className="delivery-information item">
                        <div className="delivery header">
                            <img src="../Tracking.svg" alt="delivery" />
                            <h2>Delivery Information</h2>
                        </div>

                        <div className="delivery content">
                            {deliveryHours.map(({ day, hours }) => (
                                <p key={day}><b>{day}:</b> {hours}</p>
                            ))}
                        </div>

                    </div>

                    <div className="contact-information item">
                        <div className="contact header">
                            <img src="../ID Verified.svg" alt="phone" />
                            <h2>Contact Information</h2>
                        </div>

                        <div className="contact content">
                            <p>If you have allergies or other dietary restrictions, please contact the restaurant directly. The restaurant will be happy to accommodate your needs.will provide food-specific information upon request.</p>
                            <p>Phone:</p>
                            <p>+934443-43</p>
                            <p>Website:</p>
                            <p>http://mcdonalds.uk/</p>
                        </div>

                    </div>

                </div>

                <div className="operation-times item">
                    <div className="operation header">
                        <img src="../Clock-2.svg" alt="clock" />
                        <h2>Operational Times</h2>
                    </div>

                    <div className="operation content">
                        {operationalTimes.map(({ day, hours }) => (
                            <p key={day}><b>{day}:</b> {hours}</p>
                        ))}
                    </div>

                </div>

            </div>


            <div className="map-container">
                <div className="map-with-overlay">
                    <MapContainer
                        center={defaultLocation}
                        zoom={30}
                        style={{ height: "30rem", width: "100%" }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                        />
                        <Marker position={defaultLocation}>
                            <Popup>
                                {restaurant?.restaurant?.name || "Restaurant Location"}
                                <br />
                                {restaurant?.restaurant?.address || "Address not available"}
                            </Popup>
                        </Marker>
                    </MapContainer>

                    <div className="address-overlay">
                        <p className="address-name">{restaurant?.restaurant?.name}</p>
                        <p className="address-location">South London</p>
                        <p className="address-address">Tooley St, London Bridge, London SE1 2TF, United Kingdom</p>
                        <p className="address-phone">Phone number</p>
                        <p className="address-phone-number">+934443-43</p>
                        <p className="address-website">Website</p>
                        <p className="address-website-link">http://mcdonalds.uk/</p>
                    </div>
                </div>
            </div>

            <div className="customer-review-container">
                <div className="customer-review-header">
                    <h2>Customer Reviews</h2>
                    <div className="customer-review-header-buttons">
                        <img
                            src="../Back.svg"
                            alt="back"
                            onClick={handlePrevReview}
                        />
                        <img
                            src="../Back.svg"
                            alt="forward"
                            onClick={handleNextReview}
                        />
                    </div>
                </div>
                <div className="customer-review-content">
                    {customerReview(review[currentReviewIndex])}
                </div>
                <div className="customer-review-footer">
                    {ratingSection()}
                </div>
            </div>


        </div>
    )
}

export default Restaurant;