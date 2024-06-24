import './App.css';

import { useState, useEffect } from 'react';
import { getProducts } from './api/ProductService';
import ProductList from './components/ProductList';
import Header from './components/Header';
import { Routes, Route, Navigate} from 'react-router-dom';
import ProductDetails from './components/ProductDetails';
import Login from './components/Login';

function App() {
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  const getAllProducts = async (page = 0, size = 10) => {
    try {
      setCurrentPage(page);
      const response = getProducts(page, size);
      setData((await response).data);
      console.log(response.data);
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

            
  return (
    <>
      <Header/>
      <main>
        <div>
          <Routes>
            <Route path='/' element={<Navigate to={'/products'} />} />
            <Route path="/products" element={<ProductList data = {data} currentPage={currentPage} getAllProducts={getAllProducts}/>} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      </main>
      
    </>
  );
}

export default App;
