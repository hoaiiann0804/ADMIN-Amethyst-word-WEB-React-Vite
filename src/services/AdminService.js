import axios from 'axios';
const API = 'https://localhost:5000/api';

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API}/Admin/Login`, 
            {
                admiN_EMAIL: email,
                admiN_PASSWORD: password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error) {
        return error.response || { message: 'Lỗi không xác định' };
    }
};
