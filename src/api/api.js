import axios from "axios";

const baseURL = "https://final-backend-oewj.onrender.com/api";

export const signin = async ({email, password}) => {
    try{
        const response = await axios.post(`${baseURL}/auth/signin`, { email, password });
        return response.data;
    } catch (error) {
        console.log(error, "error");
    }
}

export const signup = async ({name, phone, email, password}) => {
    try{
            const response = await axios.post(`${baseURL}/auth/signup`, { name, phone, email, password });
        return response.data;
    } catch (error) {
        console.log(error, "error");
    }
}

export const fetchImage = async({image}) => {
    try{
        const response = await axios.get(`${baseURL}/image?name=${image}`);
        return response.data.img[0].fileUrl;
    } catch (error) {
        console.log(error, "error");
    }
}

export const getAllRestaurants = async () => {
    try{
        const response = await axios.get(`${baseURL}/restaurant/getAll`);
        return response.data;
    } catch (error) {
        console.log(error, "error");
    }
}

export const getRestaurantById = async (id) => {
    try{
        const response = await axios.get(`${baseURL}/restaurant/getById/${id}`);
        return response.data;
    } catch (error) {
        console.log(error, "error");
    }
}

export const getProfile = async () => {
    try{
        const response = await axios.get(`${baseURL}/auth/get-profile`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error, "error");
    }
}

export const editProfile = async ({fullName, phoneNumber, email, gender, country}) => {
    try{
        const response = await axios.post(`${baseURL}/auth/edit-profile`, {
            fullName, 
            phoneNumber, 
            email, 
            gender, 
            country
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error, "error");
    }
}

export const addPaymentMethod = async ({cardNumber, expiryDate, cvv, nameOnCard}) => {
    try{
        const response = await axios.post(`${baseURL}/auth/add-payment-method`, {cardNumber, expiryDate, cvv, nameOnCard}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        console.log(response.data, "response");
        return response.data;
    } catch (error) {
        console.log(error, "error");
    }
}

export const editPaymentMethod = async ({cardNumber, expiryDate, cvv, nameOnCard}) => {
    try{
        const response = await axios.post(`${baseURL}/auth/edit-payment-method`, {cardNumber, expiryDate, cvv, nameOnCard}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error, "error");
    }
}

export const removePaymentMethod = async (cardId) => {
    try{
        const response = await axios.post(
            `${baseURL}/auth/remove-payment-method/?cardId=${cardId}`, 
            {}, 
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log(error, "error");
    }
}

export const addAddress = async ({name, phoneNumber, state, city, address, postcode}) => {
    try{
        const response = await axios.post(`${baseURL}/auth/add-address`, {name, phoneNumber, state, city, address, postcode}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error, "error");
    }
}

export const editAddress = async ({name, phoneNumber, state, city, address, postcode}) => {
    try{
        const response = await axios.post(`${baseURL}/auth/edit-address`, {name, phoneNumber, state, city, address, postcode}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error, "error");
    }
}

export const removeAddress = async (addressId) => {
    try{
        const response = await axios.post(`${baseURL}/auth/remove-address/?addressId=${addressId}`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error, "error");
    }
}

export const createCart = async ({restaurantId, items}) => {
    try{
        const response = await axios.post(`${baseURL}/cart/create`, {restaurantId, items});
        return response.data;
    } catch (error) {
        console.log(error, "error");
    }
}

export const addItemToCart = async ({cartId, productId}) => {
    try{
        const response = await axios.post(`${baseURL}/cart/add-item`, {cartId, productId});
        return response.data;
    } catch (error) {
        console.log(error, "error");
    }
}

export const viewCart = async (cartId) => {
    try{
        const response = await axios.get(`${baseURL}/cart/${cartId}`);
        return response.data;
    } catch (error) {
        console.log(error, "error");
    }
}

export const shareCart = async ({cartId}) => {
    try{
        const response = await axios.post(`${baseURL}/cart/share`, {cartId});
        return response.data;
    } catch (error) {
        console.log(error, "error");
    }
}

export const removeItemFromCart = async ({cartId, productId}) => {
    try{
        const response = await axios.post(`${baseURL}/cart/remove-item`, {cartId, productId});
        return response.data;
    } catch (error) {
        console.log(error, "error");
    }
}