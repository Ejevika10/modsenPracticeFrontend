import React, { useState, useEffect } from 'react';
import Product from './Product'
import Dropdown from 'react-dropdown';
import { useNavigate } from 'react-router-dom';
import 'react-dropdown/style.css';

const ProductList = ({products,categories, currentPage, getAllProducts, isLoggedIn, userRole}) => {
  const [categoriesWithAll, setCategoriesWithAll] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
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
    const categoriesWithAll = [...categories, {id: -1, name: 'All' }]; 
    setCategoriesWithAll(categoriesWithAll);
  }, []); 

  return (
    <main className='main'>
      <div className="dropdown_wrapper">
        <p className='link'>Choose category:</p>
        {categories?.length > 0 && <Dropdown className='dropdown' options={categoriesWithAll.map(category => ({ value: category.name, label: category.name }))} value={selectedCategory} placeholder="Select an option" onChange={(newCategory) => onChangeCategory(newCategory)}/>}
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