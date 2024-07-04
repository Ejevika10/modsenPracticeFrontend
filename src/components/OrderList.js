import React, { useState, useEffect } from 'react';
import { getOrders, getOrdersByUser } from '../api/OrderService'
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import Order from './Order'

const OrderList = () => {
    
    const [orders, setOrders] = useState([]); 
    const [role, setRole] = useState("");
    const [userId, setUserId] = useState();

    const getAllOrders = async () => {
      const userRole = Cookies.get('userRole');
      setRole(userRole);

      const storedUser = await JSON.parse(Cookies.get('user'));
      if (storedUser) {
        setUserId(storedUser.id);
      }
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
        try {
          const response = await getOrdersByUser(storedUser.id); 
          setOrders(response); 
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      }
    };
    useEffect(() => {
      getAllOrders(); 
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