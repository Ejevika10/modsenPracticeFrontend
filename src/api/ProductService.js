import { fetchWithAuth } from '../api/auth';
const API_URL_PRODUCTS = 'http://localhost:8080/api/products';

export const getProducts = async () => {
    try {
        const response = await fetchWithAuth(API_URL_PRODUCTS);

        if (!response.ok) {
            throw new Error(`Error fetching products: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const getProduct = async (productId) => {
    const url = `${API_URL_PRODUCTS}/${productId}`;

    try {
        const response = await fetchWithAuth(url);

        if (!response.ok) {
            throw new Error(`Error fetching product by ID: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw error;
    }
};

export const createProduct = async (product) => {
    try {
        const response = await fetchWithAuth(API_URL_PRODUCTS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        if (!response.ok) {
            throw new Error(`Error adding product: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
};

export const updateProductById = async (product) => {
    const productId = product.id;
    const url = `${API_URL_PRODUCTS}/${productId}`;
    console.log(product);
    try {
        const response = await fetchWithAuth(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        if (!response.ok) {
            throw new Error(`Error updating product: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

export const deleteProductById = async (productId) => {
    const url = `${API_URL_PRODUCTS}/${productId}`;

    try {
        const response = await fetchWithAuth(url, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Error deleting product: ${response.statusText}`);
        }

        return response;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};
