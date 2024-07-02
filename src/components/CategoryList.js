import React, { useState, useEffect } from 'react';
import { useParams,useNavigate, Link } from 'react-router-dom';
import { getCategories } from '../api/CategoryService';
import Category from './Category';

const CategoryList = () => {
  const [categories, setCategories] = useState([]); // Initialize as empty array
  const [newCategory, setName] = useState('');

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
                    <button className='dropdown_wrapper_button'>Add new category</button>
                    </div>
                </div>
            </div>
        </ul>
        
    </main>
  )
}

export default CategoryList