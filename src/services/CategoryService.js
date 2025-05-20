import axios from 'axios';
const API_URL = 'https://localhost:5000'

export const getCategories = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/Category/GetList`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}

export const addCategory = async (category) => {
    try {
        const response = await axios.post(
        `${API_URL}/api/Category/Create`,
        {
            categorY_NAME: category.name,
            categorY_IMAGE: category.image,
            categorY_STATUS: category.status ? "ACTIVE" : "INACTIVE",
            description: category.description,
        },
        {
            headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            },
        }
        );
        return response.data;
    } catch (error) {
        console.error('Error adding category:', error);
        throw error;
    }
};

export const updateCategory = async (category) => {
    try {
        const response = await axios.put(
        `${API_URL}/api/Brand/Update`,
        category,
        {
            headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            },
        }
        );
        return response.data;
    } catch (error) {
        console.error('Error updating brand:', error);
        throw error;
    }
};

export const deleteBrand = async (categoryId) => {
    try {
        const response = await axios.delete(`${API_URL}/api/Brand/Delete?id=${categoryId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            }
        });
        return response;
    }
    catch (error) {
        return error || { message: 'Lỗi không xác định' };
    }
};

