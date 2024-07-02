import React, { useState } from 'react'
import { HiOutlineTrash } from "react-icons/hi";

const OrderItem = ({orderItem}) => {
  const [quantity, setQuantity] = useState(orderItem.quantityOfProducts);
  const [errors, setErrors] = useState({});
  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value, 10));
  }

    const validateForm = () => {
        const newErrors = {};

        if (!quantity) {
            newErrors.quantity = 'Quantity is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    function onClickAction() {
        if (!validateForm()) {
            return;
        }
    }

  return (
    <div className='order_item'>
        <p className='order_product_name'>{orderItem.product.name}</p>
        <p>{orderItem.product.category.name}</p>
        <p className='order_product_name' >{orderItem.product.price}$</p>
        <div className='quantity_input_wrapper'>
          <input className='quantity_input' type="number" min="1" value={quantity} onChange={handleQuantityChange}/>
          <button onClick={onClickAction} className='dropdown_wrapper_button'>Update quantity</button>
          {errors.quantity && <p className="error">{errors.quantity}</p>}
        </div>
        <HiOutlineTrash className='order_item_icon' size={50}/>
    </div>
  )
}

export default OrderItem