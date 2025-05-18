import axios from 'axios';
const API_URL = 'https://localhost:5000/api'

export const getBrands = async () => {
    try {
        const response = await axios.get(`${API_URL}/Brand/GetList`);
        return response.data;
    } catch (error) {
        console.error('Error fetching brands:', error);
        throw error;
    }
}