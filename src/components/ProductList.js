import React, { useState, useEffect } from 'react';
import Product from './Product'
import { getProducts, getProductsByCategory } from '../api/ProductService';
import { getCategories } from '../api/CategoryService';
import Dropdown from 'react-dropdown';
import { useNavigate } from 'react-router-dom';
import 'react-dropdown/style.css';
import ErrorFallback from './Error'

const ProductList = ({ currentPage, isLoggedIn, userRole}) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState(null);
  const onChangeCategory = (newCategory) => {
    setSelectedCategory(newCategory);
    if(newCategory.value === -1){
      getAllProducts();
    } 
    else{
      getProductsByCategoryId(newCategory.value);
    }
    console.log(newCategory);
  }
  const navigate = useNavigate();
  const handleCreateProduct = () => {
    navigate('/products/add');
  };
  const handleWorkWithCategories = () => {
    navigate('/categories');
  };
  const getAllProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response);
      console.log(response);
    } catch(error) {
      console.log(error);
      setError(error);
    }
  };
  const getProductsByCategoryId = async (categoryId) => {
    try {
      const response = await getProductsByCategory(categoryId);
      setProducts(response);
      console.log(response);
    } catch(error) {
      console.log(error);
      setError(error);
    }
  }
  const getAllCategories = async () => {
    try {
      const response = await getCategories(); 
      const categoriesWithAll = [...response, {id: -1, name: 'All' }]; 
      setCategories(categoriesWithAll); 
      console.log(response);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };
  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, []); 

  if(error){
    return <ErrorFallback error={error}/>
  }
  return (
    <main className='main'>
      <div className="dropdown_wrapper">
        <p className='link'>Choose category:</p>
        {categories?.length > 0 && <Dropdown className='dropdown' options={categories.map(category => ({ value: category.id, label: category.name }))} value={selectedCategory} placeholder="Select an option" onChange={(newCategory) => onChangeCategory(newCategory)}/>}
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