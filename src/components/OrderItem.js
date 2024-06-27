import React, { useState } from 'react'
import { HiOutlineTrash } from "react-icons/hi";

const OrderItem = ({orderItem}) => {
  const [quantity, setQuantity] = useState(orderItem.quantityOfProducts); 
  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value, 10));
  }

  return (
    <div className='order_item'>
        <p className='order_product_name'>{orderItem.product.name}</p>
        <p>{orderItem.product.category}</p>
        <p className='order_product_name' >{orderItem.product.price}$</p>
        <div className='quantity_input_wrapper'>
          <input className='quantity_input' type="number" min="1" value={quantity} onChange={handleQuantityChange}/>
          <button className='dropdown_wrapper_button'>Update quantity</button>
        </div>
        <HiOutlineTrash className='order_item_icon' size={50}/>
    </div>
  )
}

export default OrderItem