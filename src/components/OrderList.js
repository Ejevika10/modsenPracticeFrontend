import React, { useState, useEffect } from 'react';
import { getOrders } from '../api/OrderService'
import { useParams,useNavigate, Link } from 'react-router-dom';
import Order from './Order'

const OrderList = (userId) => {
    
    const [orders, setOrders] = useState([]); 
    const getAllOrders = async (userId) => {
        try {
          const response = await getOrders(userId); 
          setOrders(response.data); 
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      };
    useEffect(() => {
        getAllOrders(userId); // Fetch categories on component mount
    }, []); // Empty dependency array to run only once


  return (
    <main className='main'>
        <Link to={'/products'} className='link'><i className='bi bi-arrow-left'></i> Back to list</Link>
        {orders?.length === 0 && <div>No Orders</div>}
        <ul className='order_list'>
            {orders?.length > 0 && orders.map(order => <Order order={order}/>)}
        </ul>
    </main>
  )
}

export default OrderList