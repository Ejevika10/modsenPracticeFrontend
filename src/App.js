import './App.css';
import Cookies from 'js-cookie';

import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getProducts } from './api/ProductService';
import { getUser } from './api/UserService';
import ProductList from './components/ProductList';
import Header from './components/Header';
import { Routes, Route, Navigate} from 'react-router-dom';
import ProductDetails from './components/ProductDetails';
import ProductChange from './components/ProductChange';
import Login from './components/Login';
import Registration from "./components/Registration";
import OrderList from './components/OrderList';
import CategoryList from './components/CategoryList';
import {fetchWithAuth, logout} from "./api/auth";
import { createProduct, updateProductById } from './api/ProductService';
import { getCategories } from './api/CategoryService';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // Initialize as empty array
  const [currentPage, setCurrentPage] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState();
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const getAllProducts = async (page = 0, size = 10) => {
    try {
      setCurrentPage(page);
      const response = getProducts(page, size);
      setProducts((await response));
      console.log(response);
    } catch(error) {
      console.log(error)
    }
  };
  const getAllCategories = async () => {
    try {
      const response = await getCategories(); 
      setCategories(response); 
      console.log(response);
      
    } catch (error) {
      console.log(error);
    }
  };
  const handleAuthenticate = (roles, user) => {
      console.log(roles[0]);
      setRole(roles[0]);
      console.log(user);
      setUser(user);
      console.log(user.id);
      setUserId(user.id);
      setIsAuthenticated(true);
  };

    const handleLogout = async () => {
        logout();
        setIsAuthenticated(false);
        navigate('/login');
    };

  useEffect(async () => {
    try{
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        setIsAuthenticated(true);
        const response = getUser(storedToken);
        setUser(response.data);
      }
    }catch(error){
      console.error(error);
    }
    getAllProducts();
    getAllCategories();
  }, []);


  return (
    <>
      <Header isLoggedIn={isAuthenticated} logoutHandler={handleLogout}/>
      <main>
        <div>
          <Routes>
            <Route path='/' element={<Navigate to={'/products'} />} />
            <Route path="/products" element={<ProductList products = {products} categories={categories} currentPage={currentPage} getAllProducts={getAllProducts} isLoggedIn={isAuthenticated} userRole={role}/>} />
            <Route path="/products/:id" element={<ProductDetails isLoggedIn={isAuthenticated} userRole={role} user={user}/>} />
            <Route path="/products/change/:id" element={<ProductChange categories={categories} isLoggedIn={isAuthenticated} handleAction={updateProductById}/>} />
            <Route path="/products/add" element={<ProductChange categories={categories} isLoggedIn={isAuthenticated} handleAction={createProduct}/>} />
            <Route path="/categories" element={<CategoryList />}/>
            <Route path="/orders" element={<OrderList userId={userId} userRole={role}/>}/>
            <Route path='/login' element={<Login handleAuthenticate={handleAuthenticate}/>} />
            <Route path="/registration" element={<Registration/>}/>
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;
