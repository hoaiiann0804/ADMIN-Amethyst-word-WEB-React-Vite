export interface Product {
    producT_NAME: string;
    imagE_NAME: string;
    producT_PRICE: number;
    producT_STATUS: string;
}

export interface ProductResponse {
    totalRecords: number;
    totalPages: number;
    data: Product[];
}