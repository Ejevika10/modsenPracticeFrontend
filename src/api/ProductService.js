import axios from "axios";
const API_URL = 'http://localhost:8080/api/products';

export async function saveProduct(product) {
    return await axios.post(API_URL, product);
}

/*export async function getProducts(page = 0, size = 10) {
    return await axios.get(`${API_URL}?page=${page}&size=${size}`);
}*/

export async function getProducts(page = 0, size = 10) {
    const mockProducts = [
        { id: 1, name: 'Product 1', 
            description: 'Dinner is a family meal. We usually get together in the evening when my parents come back from work. My mother is an excellent cook and I really like all the dishes she makes. We usually eat some fish or meat with vegetables or porridge for dinner. ', 
            category: 'drink',
            price: 10.99 },
        { id: 2, name: 'Product 2', 
            description: 'Dinner is a family meal. We usually get together in the evening when my parents come back from work. My mother is an excellent cook and I really like all the dishes she makes. We usually eat some fish or meat with vegetables or porridge for dinner. ', 
            category: 'drink',
            price: 25.50 },
        { id: 3, name: 'Product 3', 
            description: 'Dinner is a family meal. We usually get together in the evening when my parents come back from work. My mother is an excellent cook and I really like all the dishes she makes. We usually eat some fish or meat with vegetables or porridge for dinner. ', 
            category: 'drink',
            price: 15.00 },
        { id: 4, name: 'Product 4', 
            description: 'Dinner is a family meal. We usually get together in the evening when my parents come back from work. My mother is an excellent cook and I really like all the dishes she makes. We usually eat some fish or meat with vegetables or porridge for dinner. ', 
            category: 'drink',
            price: 30.00 },
        { id: 5, name: 'Product 5', 
            description: 'Dinner is a family meal. We usually get together in the evening when my parents come back from work. My mother is an excellent cook and I really like all the dishes she makes. We usually eat some fish or meat with vegetables or porridge for dinner. ', 
            category: 'drink',
            price: 18.99 },
        { id: 6, name: 'Product 6', 
            description: 'Dinner is a family meal. We usually get together in the evening when my parents come back from work. My mother is an excellent cook and I really like all the dishes she makes. We usually eat some fish or meat with vegetables or porridge for dinner. ', 
            category: 'drink',
            price: 22.00 },
        { id: 7, name: 'Product 7', 
            description: 'Dinner is a family meal. We usually get together in the evening when my parents come back from work. My mother is an excellent cook and I really like all the dishes she makes. We usually eat some fish or meat with vegetables or porridge for dinner. ', 
            category: 'drink',
            price: 12.50 },
        { id: 8, name: 'Product 8', 
            description: 'Dinner is a family meal. We usually get together in the evening when my parents come back from work. My mother is an excellent cook and I really like all the dishes she makes. We usually eat some fish or meat with vegetables or porridge for dinner. ', 
            category: 'drink',
            price: 28.99 },
        { id: 9, name: 'Product 9', 
            description: 'Dinner is a family meal. We usually get together in the evening when my parents come back from work. My mother is an excellent cook and I really like all the dishes she makes. We usually eat some fish or meat with vegetables or porridge for dinner. ', 
            category: 'drink',
            price: 19.00 },
        { id: 10, name: 'Product 10', 
            description: 'Dinner is a family meal. We usually get together in the evening when my parents come back from work. My mother is an excellent cook and I really like all the dishes she makes. We usually eat some fish or meat with vegetables or porridge for dinner. ', 
            category: 'drink',
            price: 26.50 },
      ];
    const startIndex = page * size;
    const endIndex = startIndex + size;
    const paginatedProducts = mockProducts.slice(startIndex, endIndex);
    
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
        data: paginatedProducts,
    };
}

/*export async function getProduct(id) {
    return await axios.get(`${API_URL}/${id}`);
}*/

export async function getProduct(id) {
    const mockProducts = [
        { id: 1, name: 'Product 1', 
            description: 'Dinner is a family meal. We usually get together in the evening when my parents come back from work. My mother is an excellent cook and I really like all the dishes she makes. We usually eat some fish or meat with vegetables or porridge for dinner. ', 
            category: 'drink',
            price: 10.99 },
        { id: 2, name: 'Product 2', 
            description: 'Dinner is a family meal. We usually get together in the evening when my parents come back from work. My mother is an excellent cook and I really like all the dishes she makes. We usually eat some fish or meat with vegetables or porridge for dinner. ', 
            category: 'drink',
            price: 25.50 },
        { id: 3, name: 'Product 3', 
            description: 'Dinner is a family meal. We usually get together in the evening when my parents come back from work. My mother is an excellent cook and I really like all the dishes she makes. We usually eat some fish or meat with vegetables or porridge for dinner. ', 
            category: 'drink',
            price: 15.00 },
        { id: 4, name: 'Product 4', 
            description: 'Dinner is a family meal. We usually get together in the evening when my parents come back from work. My mother is an excellent cook and I really like all the dishes she makes. We usually eat some fish or meat with vegetables or porridge for dinner. ', 
            category: 'drink',
            price: 30.00 },
        { id: 5, name: 'Product 5', 
            description: 'Dinner is a family meal. We usually get together in the evening when my parents come back from work. My mother is an excellent cook and I really like all the dishes she makes. We usually eat some fish or meat with vegetables or porridge for dinner. ', 
            category: 'drink',
            price: 18.99 },
        { id: 6, name: 'Product 6', 
            description: 'Dinner is a family meal. We usually get together in the evening when my parents come back from work. My mother is an excellent cook and I really like all the dishes she makes. We usually eat some fish or meat with vegetables or porridge for dinner. ', 
            category: 'drink',
            price: 22.00 },
        { id: 7, name: 'Product 7', 
            description: 'Dinner is a family meal. We usually get together in the evening when my parents come back from work. My mother is an excellent cook and I really like all the dishes she makes. We usually eat some fish or meat with vegetables or porridge for dinner. ', 
            category: 'drink',
            price: 12.50 },
        { id: 8, name: 'Product 8', 
            description: 'Dinner is a family meal. We usually get together in the evening when my parents come back from work. My mother is an excellent cook and I really like all the dishes she makes. We usually eat some fish or meat with vegetables or porridge for dinner. ', 
            category: 'drink',
            price: 28.99 },
        { id: 9, name: 'Product 9', 
            description: 'Dinner is a family meal. We usually get together in the evening when my parents come back from work. My mother is an excellent cook and I really like all the dishes she makes. We usually eat some fish or meat with vegetables or porridge for dinner. ', 
            category: 'drink',
            price: 19.00 },
        { id: 10, name: 'Product 10', 
            description: 'Dinner is a family meal. We usually get together in the evening when my parents come back from work. My mother is an excellent cook and I really like all the dishes she makes. We usually eat some fish or meat with vegetables or porridge for dinner. ', 
            category: 'drink',
            price: 26.50 },
      ];
      
    await new Promise((resolve) => setTimeout(resolve, 50));

    return mockProducts[id];
}

export async function updateProduct(product) {
    return await axios.post(API_URL, product);
}

export async function deleteProduct(id) {
    return await axios.delete(`${API_URL}/${id}`);
}