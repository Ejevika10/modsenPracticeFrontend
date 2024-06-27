export async function getOrders(userId) {
    const mockOrders = [
        { id: 1, userId: 1, orderItems: [{id: 1, product:{ id: 1, name: 'Product 1', 
            description: 'Dinner is a family meal. We usually get together in the evening when my parents come back from work. My mother is an excellent cook and I really like all the dishes she makes. We usually eat some fish or meat with vegetables or porridge for dinner. ', 
            category: 'drink',
            price: 10.99 }, quantityOfProducts: 3}, {id: 2, product:{ id: 1, name: 'Product 1', 
                description: 'Dinner is a family meal. We usually get together in the evening when my parents come back from work. My mother is an excellent cook and I really like all the dishes she makes. We usually eat some fish or meat with vegetables or porridge for dinner. ', 
                category: 'drink',
                price: 10.99 }, quantityOfProducts: 3}]},
            { id: 2, userId: 1, orderItems: [{id: 1, product:{ id: 1, name: 'Product 1', 
                description: 'Dinner is a family meal. We usually get together in the evening when my parents come back from work. My mother is an excellent cook and I really like all the dishes she makes. We usually eat some fish or meat with vegetables or porridge for dinner. ', 
                category: 'drink',
                price: 10.99 }, quantityOfProducts: 2}]},
                { id: 3, userId: 2, orderItems: [{id: 1, product:{ id: 1, name: 'Product 1', 
                    description: 'Dinner is a family meal. We usually get together in the evening when my parents come back from work. My mother is an excellent cook and I really like all the dishes she makes. We usually eat some fish or meat with vegetables or porridge for dinner. ', 
                    category: 'drink',
                    price: 10.99 }, quantityOfProducts: 1}]}
      ];
    await new Promise((resolve) => setTimeout(resolve, 500));
    mockOrders.map(order => console.log(order.userId));
    const filteredOrders = mockOrders.filter(order => order.userId === userId);;
    console.log(userId);
    console.log(filteredOrders);
    return {
        data: mockOrders,
    };
}