import './App.css';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate} from 'react-router-dom';

import ProductList from './components/ProductList';
import Header from './components/Header';
import ProductDetails from './components/ProductDetails';
import ProductChange from './components/ProductChange';
import Login from './components/Login';
import Registration from "./components/Registration";
import OrderList from './components/OrderList';
import CategoryList from './components/CategoryList';
import {PrivateLoginRoute, PrivateAdminRoute} from './components/PrivateRoute';
import {logout} from "./api/auth";
import { createProduct, updateProductById } from './api/ProductService';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState();
  const navigate = useNavigate();

  const handleAuthenticate = async () => {
    const userRole = Cookies.get('userRole');
    console.log(userRole);
    setRole(userRole);

    const storedUser = await JSON.parse(Cookies.get('user'));
    console.log(storedUser);
    if (storedUser) {
      setUser(storedUser);
    }
    setUserId(storedUser.id);
    setIsAuthenticated(true);
  };
  const handleLogout = async () => {
    logout();
    setIsAuthenticated(false);
    navigate('/login');
  };

  useEffect(() => {
    try{
      const accessToken = Cookies.get('accessToken');
      console.log(accessToken);
      if (accessToken) {
        handleAuthenticate();
      }
    }catch(error){
      console.error(error);
    }
  }, []);


  return (
    <>
      <Header isLoggedIn={isAuthenticated} logoutHandler={handleLogout}/>
        <Routes>
            <Route path='/login' element={<Login handleAuthenticate={handleAuthenticate}/>} />
            <Route path="/registration" element={<Registration/>}/>
            <Route path="*" element={<Navigate to={'/products'} />} />
            <Route path='/' element={<Navigate to={'/products'} />} />
            <Route path="/products" element={<ProductList isLoggedIn={isAuthenticated} userRole={role}/>} />
            <Route path="/products/:id" element={<ProductDetails isLoggedIn={isAuthenticated} userRole={role} user={user}/>} />
           
            <Route element={<PrivateLoginRoute />}>
              <Route path="/orders" element={<OrderList userId={userId} userRole={role}/>}/>
            </Route>

            <Route element={<PrivateAdminRoute />}>
              <Route path="/products/change/:id" element={<ProductChange handleAction={updateProductById}/>} />
              <Route path="/products/add" element={<ProductChange handleAction={createProduct}/>} />
              <Route path="/categories" element={<CategoryList />}/>
            </Route>
        </Routes>
    </>
  );
}

export default App;
