import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct } from '../api/ProductService';

const ProductChange = ({isLoggedIn, userRole, product}) => {
   
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');

    const fetchProduct = () => {
        /*console.log(product);
        setName(product.name);
        setDescription(product.description);
        setCategory(product.category);
        setPrice(product.price);
        */
    };
    useEffect(() => {
        fetchProduct();
    }, []);


  return (
    <div className='detailsWrapper'>
        <Link to={'/products'} className='link'><i className='bi bi-arrow-left'></i> Back to list</Link>
        <div className='details'>
            <div className ='details_image'>
                <img src="/images/picture.jpg" width="350" height="350" alt="" />
            </div>
            <div className ='details_info_change'>
                <input 
                    value={name} 
                    onChange={(e) =>
                        setName(e.target.value)}
                    placeholder="Enter new name"
                />
                <input 
                    value={category} 
                    onChange={(e) =>
                        setCategory(e.target.value)}
                    placeholder="Enter new category"
                />
                <input 
                    value={price} 
                    onChange={(e) =>
                        setPrice(e.target.value)}
                    placeholder="Enter new price"
                />
                <button className='dropdown_wrapper_button saveBtn'>Save</button>
            </div>
            <input 
                value={description} 
                onChange={(e) =>
                    setDescription(e.target.value)}
                placeholder="Enter new description"
                className ='details_description'
            />
        </div>
    </div>
  )
}

export default ProductChange