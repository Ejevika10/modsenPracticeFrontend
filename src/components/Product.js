import React from 'react'
import { Link } from 'react-router-dom'

const Product = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`} className='product_item'>
        <div className = 'product_item_wrapper'>
            <div className ='product_item_image'>
                <img src="/images/picture.jpg" width="215" height="215" alt="" />
            </div>
            <div className ='product_item_details'>
              <div className ='product_item_first_line'>
                <p className ='product_item_name'>{product.name.substring(0,15)}</p>
                <p className ='product_item_category'>{product.category}</p>
              </div>
                <p className ='product_item_price'>{product.price}$</p>
            </div>
        </div>
    </Link>
  )
}

export default Product