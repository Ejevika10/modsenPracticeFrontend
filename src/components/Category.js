import React, { useState, useEffect } from 'react';
import { HiOutlineTrash } from "react-icons/hi";
import { updateCategoryById, deleteCategoryById } from '../api/CategoryService';

const Category = ({category}) => {
    const [name, setName] = useState(category.name);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!name) {
            newErrors.name = 'Category is required';
        } else if (!/^[a-zA-Z0-9\s]+$/
            .test(name)) {
            newErrors.name = 'Category contains invalid characters';
        } else if (name.length < 3 || name.length > 100) {
            newErrors.name = 'Category must be 3-100 characters long';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    function onUpdateClickAction() {
        if (!validateForm()) {
            return;
        }
        else{
            updateCategoryById(category.id, {name:name});
        }
    }
    function onDeleteClickAction() {
        deleteCategoryById(category.id);
    }

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
            <button onClick={onUpdateClickAction}  className='dropdown_wrapper_button'>Update category</button>
            </div>
            {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <HiOutlineTrash onClick={onDeleteClickAction} className='order_item_icon' size={50}/>
    </div>
  )
}

export default Category