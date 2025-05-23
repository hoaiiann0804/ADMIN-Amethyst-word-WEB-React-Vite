import axios from 'axios';
const API_URL = 'https://localhost:5000';

export const GetUser = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/Dashboard/GetUser`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

export const GetOrder = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/Dashboard/GetOrder`);
        return response.data;
    } catch (error) {
        console.error('Error fetching order data:', error);
        throw error;
    }
}

export const GetRevenue = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/Dashboard/GetRevenue`);
        return response.data;
    } catch (error) {
        console.error('Error fetching revenue data:', error);
        throw error;
    }
}