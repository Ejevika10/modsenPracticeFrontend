import React, { useState, useEffect } from 'react';
import { getOrders, getOrdersByUser } from '../api/OrderService'

import { useParams,useNavigate, Link } from 'react-router-dom';
import Order from './Order'

const OrderList = ({userId, userRole}) => {
    
    const [orders, setOrders] = useState([]); 
    
    const getAllOrders = async (userId) => {
      console.log(userId);
      console.log(userRole);
      if("ADMIN" === userRole){
        console.log("ADMIN");
        try {
          const response = await getOrders(); 
          setOrders(response); 
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      }
      else{
        console.log("CUSTOMER");
        try {
          const response = await getOrdersByUser(userId); 
          setOrders(response); 
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      }
    };
    useEffect(() => {
        getAllOrders(userId); 
    }, []); 

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