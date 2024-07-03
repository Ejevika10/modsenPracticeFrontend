import { fetchWithAuth } from '../api/auth';
const API_URL_ORDER_ITEMS = 'http://localhost:8080/api/order-items';

export const getOrderItems = async () => {
    try {
        const response = await fetchWithAuth(API_URL_ORDER_ITEMS);

        if (!response.ok) {
            throw new Error(`Error fetching order items: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching order items:', error);
        throw error;
    }
};

export const getOrderItem = async (orderItemId) => {
    const url = `${API_URL_ORDER_ITEMS}/${orderItemId}`;

    try {
        const response = await fetchWithAuth(url);

        if (!response.ok) {
            throw new Error(`Error fetching order item by ID: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching order item by ID:', error);
        throw error;
    }
};

export const createOrderItem = async (orderItem) => {
    try {
        const response = await fetchWithAuth(API_URL_ORDER_ITEMS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderItem)
        });

        if (!response.ok) {
            throw new Error(`Error adding order item: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding order item:', error);
        throw error;
    }
};

export const updateOrderItemById = async (orderItemId, orderItem) => {
    const url = `${API_URL_ORDER_ITEMS}/${orderItemId}`;

    try {
        const response = await fetchWithAuth(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderItem)
        });

        if (!response.ok) {
            throw new Error(`Error updating order item: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating order item:', error);
        throw error;
    }
};

export const deleteOrderItemById = async (orderItemId) => {
    const url = `${API_URL_ORDER_ITEMS}/${orderItemId}`;
    console.log(orderItemId);
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
