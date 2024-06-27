import React, { useState, useEffect } from 'react';
import { HiOutlineTrash } from "react-icons/hi";

const Category = ({category}) => {
    const [name, setName] = useState(category.name);
  return (
    <div className='category_item'>
        <div className='order_head'>
            <input 
                value={name} 
                onChange={(e) =>
                            setName(e.target.value)}
                placeholder="Enter new category name"
            />
            <div className='quantity_input_wrapper'>
            <button className='dropdown_wrapper_button'>Update category</button>
            </div>
        </div>
        <HiOutlineTrash className='order_item_icon' size={50}/>
    </div>
  )
}

export default Category