import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export const TotalProduct = async () => {
    try {
        const res = await axios.get(`${API_URL}/api/Product/TotalQuantity`);
        return res.data;
    } catch (error) {
        return { error: error.response?.data || error.message || 'Có lỗi xảy ra' };
    }
}

export const TotalValues = async () => {
    try {
        const res = await axios.get(`${API_URL}/api/Product/TotalValues`);
        return res.data;
    } catch (error) {
        return { error: error.response?.data || error.message || 'Có lỗi xảy ra' };
    }
}

export const BelowMinium = async () => {
    try {
        const res = await axios.get(`${API_URL}/api/Product/BelowMinium`);
        return res.data;
    } catch (error) {
        return { error: error.response?.data || error.message || 'Có lỗi xảy ra' };
    }
}

export const OutOfStock = async () => {
    try {
        const res = await axios.get(`${API_URL}/api/Product/OutOfStock`);
        return res.data;
    } catch (error) {
        return { error: error.response?.data || error.message || 'Có lỗi xảy ra' };
    }
}