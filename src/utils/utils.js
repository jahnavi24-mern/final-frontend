import { useNavigate } from "react-router-dom";
import { useState } from 'react';

export const useBackNavigation = () => {
    const navigate = useNavigate();
    return () => navigate(-1);
};

export const handleImageError = (e) => {
    navigate(-1);
}

export const showErrorToast = (message) => {
    toast.error(message || 'Something went wrong!');
};

export const showSuccessToast = (message) => {
    toast.success(message);
};

export const useLoadingState = (initialState = false) => {
    const [isLoading, setIsLoading] = useState(initialState);

    const startLoading = () => setIsLoading(true);
    const stopLoading = () => setIsLoading(false);

    return [isLoading, startLoading, stopLoading];
};

export const createApiWrapper = (toast) => async (apiCall, options = {}) => {
    const { 
        loadingMessage = 'Loading...', 
        errorMessage = 'Something went wrong!',
        showLoading = true 
    } = options;

    let toastId;
    try {
        if (showLoading) {
            toastId = toast.loading(loadingMessage);
        }
        const response = await apiCall();
        if (toastId) toast.custom.dismiss(toastId);
        return response;
    } catch (error) {
        if (toastId) toast.custom.dismiss(toastId);
        toast.error(error.message || errorMessage);
        throw error;
    }
};