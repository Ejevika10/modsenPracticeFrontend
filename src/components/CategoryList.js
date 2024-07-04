import React, { useState, useEffect } from 'react';
import { useParams,useNavigate, Link } from 'react-router-dom';
import { getCategories, createCategory } from '../api/CategoryService';
import Category from './Category';

const CategoryList = () => {
  const [categories, setCategories] = useState([]); // Initialize as empty array
  const [newCategory, setName] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const getAllCategories = async () => {
    try {
        const response = await getCategories(); 
        setCategories(response); 
        console.log(response);
    } catch (error) {
        console.log(error);
    }
  };
  useEffect(() => {
    getAllCategories(); 
  }, []);

  const validateForm = () => {
        const newErrors = {};

        if (!newCategory) {
            newErrors.newCategory = 'Category is required';
        } else if (!/^[a-zA-Z0-9\s]+$/
            .test(newCategory)) {
            newErrors.newCategory = 'Category contains invalid characters';
        } else if (newCategory.length < 3 || newCategory.length > 100) {
            newErrors.newCategory = 'Category must be 3-100 characters long';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onClickAction = async () => {
        if (!validateForm()) {
            return;
        }
        const response = await createCategory({name: newCategory});
        console.log(response);
        navigate(0);
    }

    return (
    <main className='main'>
        <Link to={'/products'} className='link'><i className='bi bi-arrow-left'></i> Back to list</Link>
        {categories?.length === 0 && <div>No Categories</div>}
        <ul className='order_list'>
            {categories?.length > 0 && categories.map(category => <Category category = {category}/>)}
            <hr/>
            <div className='category_item'>
                <div className='order_head'>
                    <input 
                        value={newCategory} 
                        onChange={(e) =>
                                    setName(e.target.value)}
                        placeholder="Enter new category name"
                    />
                    <div className='quantity_input_wrapper'>
                    <button onClick={onClickAction} className='dropdown_wrapper_button'>Add new category</button>
                    </div>
                    {errors.newCategory && <p className="error">{errors.newCategory}</p>}
                </div>
            </div>
        </ul>
        
    </main>
  )
}

export default CategoryList