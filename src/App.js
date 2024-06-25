import './App.css';

import { useState, useEffect } from 'react';
import { getProducts } from './api/ProductService';
import { getUser } from './api/UserService';
import ProductList from './components/ProductList';
import Header from './components/Header';
import { Routes, Route, Navigate} from 'react-router-dom';
import ProductDetails from './components/ProductDetails';
import ProductChange from './components/ProductChange';
import Login from './components/Login';

function App() {
  const [products, setProducts] = useState({});  
  const [currentPage, setCurrentPage] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

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
  const handleLogin = async (username, password) => {
    /*try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username,
        password,
      });
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Ошибка авторизации:', error);
    }*/
      console.log(username + " login " + password)
      setIsAuthenticated(true);
  };
  const handleRegister = async (email, username, password) => {
      console.log(username + " register " + password)
      setIsAuthenticated(true);
  }

  const handleLogout = () => {
    /*setToken(null);
    localStorage.removeItem('token');*/
    console.log("logouts")
    setIsAuthenticated(false);
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
      <Header isLoggedIn={isAuthenticated} logoutHandler={handleLogout}/>
      <main>
        <div>
          <Routes>
            <Route path='/' element={<Navigate to={'/products'} />} />
            <Route path="/products" element={<ProductList products = {products} currentPage={currentPage} getAllProducts={getAllProducts} isLoggedIn={isAuthenticated} userRole={"ADMIN"}/>} />
            <Route path="/products/:id" element={<ProductDetails isLoggedIn={isAuthenticated} />} />
            <Route path="/products/change" element={<ProductChange isLoggedIn={isAuthenticated}/>} />
            <Route path='/login' element={<Login handleLogin = {handleLogin} handleRegister={handleRegister}/>} />
          </Routes>
        </div>
      </main>
      
    </>
  );
}

export default App;
