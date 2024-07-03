import React from 'react'
import OrderItem from './OrderItem'
import { deleteOrderById } from '../api/OrderService';
import { useNavigate } from 'react-router-dom';

const Order = ({order}) => {

  const navigate = useNavigate();
  const handleDeleteOrder = async () => {
    const response = await deleteOrderById(order.id);
    console.log(response);
    navigate(`/orders`);
};

  return (
    <div className='order'>
      <div className='order_head'>
        <p className='order_product_name'>Order №{order.id}</p>
        <button onClick={handleDeleteOrder} className='order_btn'>Delete order</button>
      </div>
        {order.orderItems?.length > 0 && order.orderItems.map(orderItem => <OrderItem orderItem ={orderItem}/>)}
    </div>
  )
}

export default Order