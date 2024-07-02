import React from 'react'
import { Link } from 'react-router-dom'
import img1 from '../images/picture.jpg';

const Product = ({ isLoggedIn, product }) => {
  return (
    <Link to={`/products/${product.id}`} className='product_item'>
        <div className = 'product_item_wrapper'>
            <div className ='product_item_image'>
                <img src={img1} width="215" height="215" alt="" />
            </div>
            <div className ='product_item_details'>
              <div className ='product_item_first_line'>
                <p className ='product_item_name'>{product.name.substring(0,15)}</p>
                <p className ='product_item_category'>{product.category.name}</p>
              </div>
                <p className ='product_item_price'>{product.price}$</p>
            </div>
        </div>
    </Link>
  )
}

export default Product