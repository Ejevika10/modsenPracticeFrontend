import { fetchWithAuth } from '../api/auth';
const API_URL_USERS = 'http://localhost:8080/api/users';

export const getUsers = async () => {
    try {
        const response = await fetchWithAuth(API_URL_USERS);

        if (!response.ok) {
            throw new Error(`Error fetching users: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const getUser = async (userId) => {
    const url = `${API_URL_USERS}/${userId}`;

    try {
        const response = await fetchWithAuth(url);

        if (!response.ok) {
            throw new Error(`Error fetching user by ID: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
};
export const getUserByLogin = async (userLogin) => {
    const url = `${API_URL_USERS}/login/${userLogin}`;

    try {
        const response = await fetchWithAuth(url);

        if (!response.ok) {
            throw new Error(`Error fetching user by login: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user by login:', error);
        throw error;
    }
};

export const createUser = async (user) => {
    try {
        const response = await fetchWithAuth(API_URL_USERS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error(`Error adding user: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
};

export const updateUserById = async (userId, user) => {
    const url = `${API_URL_USERS}/${userId}`;

    try {
        const response = await fetchWithAuth(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error(`Error updating user: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export const deleteUserById = async (userId) => {
    const url = `${API_URL_USERS}/${userId}`;

    try {
        const response = await fetchWithAuth(url, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Error deleting user: ${response.statusText}`);
        }

        return response;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};
