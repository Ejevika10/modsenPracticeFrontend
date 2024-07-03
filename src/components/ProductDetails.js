import React, { useState, useEffect } from 'react';
import { useParams,useNavigate, Link } from 'react-router-dom';
import { getProduct, deleteProductById } from '../api/ProductService';
import { createOrderItem } from '../api/OrderItemService';
import { createOrder } from '../api/OrderService';
import img1 from '../images/picture.jpg';

const ProductDetails = ({isLoggedIn, userRole, user}) => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        category: '',
        price: '',
    });
    const [quantity, setQuantity] = useState(1); 
    const handleQuantityChange = (event) => {
        setQuantity(parseInt(event.target.value, 10));
      }
    const { id } = useParams();
    const navigate = useNavigate();

    const handleUpdateProduct = () => {
        navigate(`/products/change/:${id}`, { state: { product } });
    };
    const handleCreateOrder = async () => {
        const response = await createOrderItem({quantityOfProducts: quantity, product:product})
        console.log(response);
        const response2 = await createOrder({user:user, orderItems:[response]});
        console.log(response2);    
    };

    const handleDeleteProduct = async () => {
        const response = await deleteProductById(product.id);
        console.log(response);
        navigate(`/products`);
    };
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
        console.log(userRole);
        fetchProduct(id);
    }, []);
    

  return (
    <div className='detailsWrapper'>
        <Link to={'/products'} className='link'><i className='bi bi-arrow-left'></i> Back to list</Link>
        <div className='details'>
            <div className ='details_image'>
                <img src={img1} width="350" height="350" alt="" />
            </div>
            <div className ='details_info'>
                <div className ='details_info_first_line'>
                    <p className ='details_info_name'>{product.name.substring(0,15)}</p>
                    <p className ='details_info_category'>{product.category.name}</p>
                </div>
                <p className ='details_info_price'>{product.price}$</p>
                {(!isLoggedIn || "CUSTOMER" === userRole)?
                <div className="product_counter">
                    <div class="number">
                        <input type="number" min="1" value={quantity} onChange={handleQuantityChange}/>
                    </div>
                    <button onClick={handleCreateOrder} disabled={!isLoggedIn}>Add to cart</button>
                </div>
                :<div>
                    <button onClick={handleUpdateProduct} className="dropdown_wrapper_button">Update product</button>
                    <button onClick={handleDeleteProduct} className="dropdown_wrapper_button">Delete product</button>
                </div>
                }
            </div>
            <div className='details_description'>{product.description}</div>
        </div>
    </div>
  )
}

export default ProductDetails