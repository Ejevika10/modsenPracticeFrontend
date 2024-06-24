import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct } from '../api/ProductService';

const ProductDetails = ({}) => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        category: '',
        price: '',
    });
    const [num, setNum] = useState(1);
    const { id } = useParams();
    const fetchProduct = async (id) => {
        try {
        const response = await getProduct(id);
        setProduct(response);
        console.log(response);
        } catch(error) {
        console.log(error)
        }
    };
    useEffect(() => {
        fetchProduct(id);
    }, []);


  return (
    <div className='detailsWrapper'>
        <Link to={'/products'} className='link'><i className='bi bi-arrow-left'></i> Back to list</Link>
        <div className='details'>
            <div className ='details_image'>
                <img src="/images/picture.jpg" width="350" height="350" alt="" />
            </div>
            <div className ='details_info'>
                <div className ='details_info_first_line'>
                    <p className ='details_info_name'>{product.name.substring(0,15)}</p>
                    <p className ='details_info_category'>{product.category}</p>
                </div>
                <p className ='details_info_price'>{product.price}$</p>
                <div class="product_counter">
                    <div class="number">
                        <input type="number" min="0" value="1" readonly/>
                    </div>
                    <button type="submit">Add to cart</button>
                </div>
            </div>
            <div className='details_description'>{product.description}</div>
        </div>
    </div>
  )
}

export default ProductDetails