import { fetchWithAuth } from '../api/auth'
const API_URL_CATEGORIES = 'http://localhost:8080/api/categories';

export const getCategories = async () => {
    try {
        const response = await fetchWithAuth(API_URL_CATEGORIES);

        if (!response.ok) {
            throw new Error(`Error fetching categories: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export const getCategory = async (categoryId) => {
    const url = `${API_URL_CATEGORIES}/${categoryId}`;

    try {
        const response = await fetchWithAuth(url);

        if (!response.ok) {
            throw new Error(`Error fetching category by ID: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching category by ID:', error);
        throw error;
    }
};

export const createCategory = async (category) => {
    try {
        const response = await fetchWithAuth(API_URL_CATEGORIES, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
        });

        if (!response.ok) {
            throw new Error(`Error adding category: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding category:', error);
        throw error;
    }
};

export const updateCategoryById = async (categoryId, category) => {
    const url = `${API_URL_CATEGORIES}/${categoryId}`;

    try {
        const response = await fetchWithAuth(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
        });

        if (!response.ok) {
            throw new Error(`Error updating category: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
};

export const deleteCategoryById = async (categoryId) => {
    const url = `${API_URL_CATEGORIES}/${categoryId}`;

    try {
        const response = await fetchWithAuth(url, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Error deleting category: ${response.statusText}`);
        }

        return response;
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
};
