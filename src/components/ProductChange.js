import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import Dropdown from 'react-dropdown';
import { useLocation } from 'react-router-dom';
import img1 from '../images/picture.jpg';

const ProductChange = ({categories, isLoggedIn, userRole, handleAction}) => {

    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState({});
    const { state } = useLocation();
    const { product } = state || {};
    const [selectedCategory, setSelectedCategory] = useState(null);
    const onChangeCategory = (newCategory) => {
      setSelectedCategory(newCategory)
    }
    const fetchProduct = () => {
        console.log(product);
        setId(product.id);
        setName(product.name);
        setDescription(product.description);
        setSelectedCategory(product.category.name);
        setPrice(product.price);
    };
    useEffect(() => {
        if (state){
            fetchProduct();
        }
    }, []);

    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};

        if (!name) {
            newErrors.name = 'Product name is required';
        } else if (!/^[a-zA-Zа-яА-Я0-9\s]+$/
            .test(name)) {
            newErrors.name = 'Product name ontains invalid characters';
        } else if (name.length < 3 || name.length > 60) {
            newErrors.name = 'Login must be 3-60 characters long';
        }

        /*if (!category) {
            newErrors.category = 'Category is required';
        } else if (!/^[a-zA-Z0-9\s]+$/
            .test(category)) {
            newErrors.category = 'Category contains invalid characters';
        } else if (category.length < 3 || category.length > 100) {
            newErrors.category = 'Category must be 3-100 characters long';
        }*/

        if (!price) {
            newErrors.price = 'Price is required';
        } else if (!/^0-9+(\.0-9{1,2})?$/
            .test(price))  {
            newErrors.password = 'Price contains invalid characters';
        }

        if (!description) {
            newErrors.description = 'Description is required';
        } else if (!/^[a-zA-Zа-яА-Я\d\s-+{}();:?.,/]+$/
            .test(description)) {
            newErrors.description = 'Description contains invalid characters';
        } else if (description.length < 3 || description.length > 255) {
            newErrors.description = 'Description must be 3-255 characters long';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onClickAction = async() => {
        if (!validateForm()) {
            return;
        }
        const response = await handleAction({ id: id, name: name, description: description, category:{id: selectedCategory.value, name: selectedCategory.label},price: parseFloat(price) },);
        console.log(response);
        navigate("/products");
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
                {errors.name && <p className="error">{errors.name}</p>}
                {categories?.length > 0 && <Dropdown className="dropdown" options={categories.map(category => ({ value: category.id, label: category.name }))} value={selectedCategory} placeholder="Select an option" onChange={(newCategory) => onChangeCategory(newCategory)}/>}
                <input
                    value={price}
                    onChange={(e) =>
                        setPrice(e.target.value)}
                    placeholder="Enter new price"
                />
                {errors.price && <p className="error">{errors.price}</p>}
                <button onClick={onClickAction} className='dropdown_wrapper_button saveBtn'>Save</button>
            </div>
            <input
                value={description}
                onChange={(e) =>
                    setDescription(e.target.value)}
                placeholder="Enter new description"
                className ='details_description'
            />
            {errors.description && <p className="error">{errors.description}</p>}
        </div>
    </div>
  )
}

export default ProductChange