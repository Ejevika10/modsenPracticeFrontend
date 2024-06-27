import React, { useState, useEffect } from 'react';
import Product from './Product'
import Dropdown from 'react-dropdown';
import { useNavigate } from 'react-router-dom';
import 'react-dropdown/style.css';
import { getCategories } from '../api/CategoryService';


const ProductList = ({products, currentPage, getAllProducts, isLoggedIn, userRole}) => {
  
  const [categories, setCategories] = useState([]); // Initialize as empty array
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  
  const getAllCategories = async () => {
    try {
      const response = await getCategories(); 
      const categoriesWithAll = [...response.data, {id: -1, name: 'All' }]; 
      setCategories(categoriesWithAll); 
      console.log(response.data);
      
    } catch (error) {
      console.log(error);
    }
  };
  const onChangeCategory = (newCategory) => {
    setSelectedCategory(newCategory)
  }
  const navigate = useNavigate();
  const handleCreateProduct = () => {
    navigate('/products/add');
  };
  const handleWorkWithCategories = () => {
    navigate('/categories');
  };

  useEffect(() => {
    getAllCategories(); // Fetch categories on component mount
  }, []); // Empty dependency array to run only once

  /*
  <button className="dropdown_wrapper_button">Update category</button>
          <button className="dropdown_wrapper_button">Delete category</button>
          <button className='dropdown_wrapper_button bigBtn'>Add new category</button>
        
  */

  return (
    <main className='main'>
      <div className="dropdown_wrapper">
        <p className='link'>Choose category:</p>
        {categories?.length > 0 && <Dropdown className="dropdown" options={categories.map(category => ({ value: category.name, label: category.name }))} value={selectedCategory} placeholder="Select an option" onChange={(newCategory) => onChangeCategory(newCategory)}/>}
        {(isLoggedIn && "ADMIN" === userRole) ?
        <>
          <button onClick={handleWorkWithCategories} className="dropdown_wrapper_button">Work with categories</button>
        </>
        :
        <></>
        }  
      </div>
      {(isLoggedIn & "ADMIN" === userRole) ?
        <div className="dropdown_wrapper">
          <button onClick={handleCreateProduct} className='dropdown_wrapper_button bigBtn'>Add new product</button>
        </div>
        :<></>
        }  
        {products?.length === 0 && <div>No Products</div>}
        <ul className='product_list'>
            {products?.length > 0 && products.map(product => <Product product={product} key={product.id} />)}
        </ul>

        {products?.length > 0 && products?.totalPages > 1 &&
        <div className='pagination'>
            <a onClick={() => getAllProducts(currentPage - 1)} className={0 === currentPage ? 'disabled' : ''}>&laquo;</a>
            <a>{currentPage}</a>
            <a onClick={() => getAllProducts(currentPage + 1)} className={products.totalPages === currentPage + 1 ? 'disabled' : ''}>&raquo;</a>
        </div>
        }
    </main>
  )
}

export default ProductList