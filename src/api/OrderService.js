import { fetchWithAuth } from '../api/auth';
const API_URL_ORDERS = 'http://localhost:8080/api/orders';

export const getOrders = async () => {
    try {
        const response = await fetchWithAuth(API_URL_ORDERS);

        if (!response.ok) {
            throw new Error(`Error fetching orders: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

export const getOrder = async (orderId) => {
    const url = `${API_URL_ORDERS}/${orderId}`;

    try {
        const response = await fetchWithAuth(url);

        if (!response.ok) {
            throw new Error(`Error fetching order by ID: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching order by ID:', error);
        throw error;
    }
};

export const createOrder = async (order) => {
    try {
        const response = await fetchWithAuth(API_URL_ORDERS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });

        if (!response.ok) {
            throw new Error(`Error adding order: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding order:', error);
        throw error;
    }
};

export const updateOrderById = async (orderId, order) => {
    const url = `${API_URL_ORDERS}/${orderId}`;

    try {
        const response = await fetchWithAuth(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });

        if (!response.ok) {
            throw new Error(`Error updating order: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating order:', error);
        throw error;
    }
};

export const deleteOrderById = async (orderId) => {
    const url = `${API_URL_ORDERS}/${orderId}`;

    try {
        const response = await fetchWithAuth(url, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Error deleting order: ${response.statusText}`);
        }

        return response;
    } catch (error) {
        console.error('Error deleting order:', error);
        throw error;
    }
};
