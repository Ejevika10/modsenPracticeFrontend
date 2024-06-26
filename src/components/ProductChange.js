import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct } from '../api/ProductService';
import { useLocation } from 'react-router-dom';
import img1 from '../images/picture.jpg';

const ProductChange = ({isLoggedIn, userRole, handleAction}) => {
   
    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const { state } = useLocation();
    const { product } = state || {};

    const fetchProduct = () => {
        console.log(product);
        setId(product.id);
        setName(product.name);
        setDescription(product.description);
        setCategory(product.category);
        setPrice(product.price);
    };
    useEffect(() => {
        if (state){
            fetchProduct();
        }
    }, []);


    const onClickAction = () => {
        handleAction([{ id: id, name: name, description: description,category: category,price: price },]);
    }
  return (
    <div className='detailsWrapper'>
        <Link to={'/products'} className='link'><i className='bi bi-arrow-left'></i> Back to list</Link>
        <div className='details'>
            <div className ='details_image'>
                <img src={img1} width="350" height="350" alt="" />
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
                <button onClick={onClickAction} className='dropdown_wrapper_button saveBtn'>Save</button>
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