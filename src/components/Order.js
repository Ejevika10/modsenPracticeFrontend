import React from 'react'
import OrderItem from './OrderItem'

const Order = ({order}) => {
  return (
    <div className='order'>
      <div className='order_head'>
        <p className='order_product_name'>Order №{order.id}</p>
        <button className='order_btn'>Delete order</button>
      </div>
        {order.orderItems?.length > 0 && order.orderItems.map(orderItem => <OrderItem orderItem ={orderItem}/>)}
    </div>
  )
}

export default Order