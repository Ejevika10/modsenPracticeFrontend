import axios from "axios";
const API_URL = 'http://localhost:8080/api/categories';

export async function saveCategory(category) {
    return await axios.post(API_URL,category);
}

/*export async function getCategories(page = 0, size = 10) {
    return await axios.get(`${API_URL}?page=${page}&size=${size}`);
}*/

export async function getCategories() {
    const mockCategories = [
        { id: 1, name: 'drink'},
        { id: 2, name: 'food'},
        { id: 3, name: 'food5'},
      ];
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
        data: mockCategories,
    };
}

/*export async function getCategory(id) {
    return await axios.get(`${API_URL}/${id}`);
}*/

export async function getCategory(id) {
    const mockCategories = [
        { id: 1, name: 'drink'},
        { id: 2, name: 'food'},
      ];
      
    await new Promise((resolve) => setTimeout(resolve, 50));

    return mockCategories[id];
}

export async function updateCategory(category) {
    return await axios.post(API_URL, category);
}

export async function deleteCategory(id) {
    return await axios.delete(`${API_URL}/${id}`);
}