import { createContext, useContext, useState } from 'react';
import { createCart, viewCart, shareCart, removeItemFromCart, addItemToCart } from '../api/api';


const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [cartId, setCartId] = useState(null);
    console.log("cartId", cartItems);

    const addToCart = async ({product, restaurantId}) => {
        try {
            console.log('Received in addToCart:', { product, restaurantId });
            
            if (!product || !restaurantId) {
                throw new Error('Invalid product or restaurant ID');
            }

            if (!cartId) {
                const response = await createCart({ 
                    restaurantId, 
                    items: [{ 
                        product: product._id, 
                        quantity: 1 
                    }] 
                });
                
                setCartId(response._id);
                setCartItems([{ ...product, quantity: 1 }]);
                setTotalAmount(product.price);
            } else {
                const response = await addItemToCart({ 
                    cartId, 
                    productId: product._id,
                });

                setCartItems(prevItems => {
                    const existingItemIndex = prevItems.findIndex(item => item._id === product._id);
                    
                    if (existingItemIndex !== -1) {
                        const updatedItems = [...prevItems];
                        updatedItems[existingItemIndex] = {
                            ...updatedItems[existingItemIndex],
                            quantity: (updatedItems[existingItemIndex].quantity || 1) + 1
                        };
                        setTotalAmount(prev => prev + product.price);
                        return updatedItems;
                    } else {
                        setTotalAmount(prev => prev + product.price);
                        return [...prevItems, { ...product, quantity: 1 }];
                    }
                });
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            throw error;
        }
    };

    const removeFromCart = async (productId) => {
        try {
            if (!cartId) return;

            await removeItemFromCart({ cartId, productId });
            setCartItems(prevItems => {
                const itemToRemove = prevItems.find(item => item._id === productId);
                if (itemToRemove) {
                    setTotalAmount(prev => prev - (itemToRemove.price * itemToRemove.quantity));
                }
                return prevItems.filter(item => item._id !== productId);
            });
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;

        setCartItems(prevItems => {
            return prevItems.map(item => {
                if (item._id === productId) {
                    const priceDifference = item.price * (newQuantity - item.quantity);
                    setTotalAmount(prev => prev + priceDifference);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
        });
    };

    const shareCurrentCart = async () => {
        try {
            if (!cartId) throw new Error('Cart not created');
            const response = await shareCart({ cartId });
            console.log('Share cart response:', response);
            return response._id;
        } catch (error) {
            console.error('Error sharing cart:', error);
        }
    };

    const loadCart = async (cartId) => {
        try {
            if (!cartId) return;
            const { items } = await viewCart(cartId);
            const transformedItems = items.map(item => ({
                ...item.product, 
                quantity: item.quantity,
                _id: item.product._id
            }));
            setCartItems(transformedItems || []);
            const total = transformedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
            setTotalAmount(total);
        } catch (error) {
            console.error('Error loading cart:', error);
        }
    };


    const clearCart = () => {
        setCartItems([]);
        setTotalAmount(0);
        setCartId(null);
    };

    const value = {
        cartItems,
        totalAmount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        loadCart,
        shareCurrentCart
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};