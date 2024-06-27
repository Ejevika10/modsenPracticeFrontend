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

function App() {
  const [products, setProducts] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const getAllProducts = async (page = 0, size = 10) => {
    try {
      setCurrentPage(page);
      const response = getProducts(page, size);
      setProducts((await response).data);
      console.log(response.data);
    } catch(error) {
      console.log(error)
    }
  };
  const updateProduct = async (product) => {
    console.log("update");
    console.log(product);
  }
  const createProduct = async (product) => {
    console.log("create");
    console.log(product);
  }
  const handleAuthenticate = async (roles) => {
      console.log(roles);
      setRole(roles);
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
  }, []);


  return (
    <>
      <Header isLoggedIn={false} logoutHandler={handleLogout}/>
      <main>
        <div>
          <Routes>
            <Route path='/' element={<Navigate to={'/products'} />} />
            <Route path="/products" element={<ProductList products = {products} currentPage={currentPage} getAllProducts={getAllProducts} isLoggedIn={true} userRole={"ADMIN"}/>} />
            <Route path="/products/:id" element={<ProductDetails isLoggedIn={true} userRole={"ADMIN"} />} />
            <Route path="/products/change/:id" element={<ProductChange isLoggedIn={isAuthenticated} handleAction={updateProduct}/>} />
            <Route path="/products/add" element={<ProductChange isLoggedIn={isAuthenticated} handleAction={createProduct}/>} />
            <Route path="/categories" element={<CategoryList />}/>
            <Route path="/orders" element={<OrderList userId={1}/>}/>
            <Route path='/login' element={<Login handleAuthenticate={handleAuthenticate}/>} />
            <Route path="/registration" element={<Registration/>}/>
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;
