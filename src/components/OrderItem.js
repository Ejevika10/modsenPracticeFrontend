import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { HiOutlineTrash } from "react-icons/hi";
import { deleteOrderItemById, updateOrderItemById } from '../api/OrderItemService';
import ErrorFallback from './Error'

const OrderItem = ({orderItem}) => {
  const [quantity, setQuantity] = useState(parseInt(orderItem.quantityOfProducts));
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
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

    const onUpdateClickAction = async () => {
      if (!validateForm()) {
        return;
      }
      try {
        const response = await updateOrderItemById(orderItem.id, {product:orderItem.product, quantityOfProducts:quantity});
        console.log(response);
        navigate(0);
      } catch(error) {
        setError(error);
        console.log(error.message);
      }
    }

    const onDeleteClickAction = async () => {
      try {
        const response = await deleteOrderItemById(orderItem.id);
        console.log(response);
        navigate(0);
      } catch(error) {
          setError(error);
          console.log(error.message);
      }
    }

    
  if(error){
    return <ErrorFallback error={error}/>
  }
  return (
    <div className='order_item'>
        <p className='order_product_name'>{orderItem.product.name}</p>
        <p>{orderItem.product.category.name}</p>
        <p className='order_product_name' >{orderItem.product.price}$</p>
        <div className='quantity_input_wrapper'>
          <input className='quantity_input' type="number" min="1" value={quantity} onChange={handleQuantityChange}/>
          <button onClick={onUpdateClickAction} className='dropdown_wrapper_button'>Update quantity</button>
          {errors.quantity && <p className="error">{errors.quantity}</p>}
        </div>
        <HiOutlineTrash onClick={onDeleteClickAction} className='order_item_icon' size={50}/>
    </div>
  )
}

export default OrderItem