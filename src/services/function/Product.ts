import { AxiosResponse } from "axios";
import apiClient from "../api/API";
import { ProductResponse } from "../interface/Product";

export const getProducts = async (pageNumber: number = 1, pageSize: number = 10): Promise<ProductResponse> => {
    try {
        const response: AxiosResponse<ProductResponse> = await apiClient.get('/Product/GetList', {
        params: { pageNumber, pageSize },
        });
        console.log('Response data:', response.data);
        return response.data;

    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};