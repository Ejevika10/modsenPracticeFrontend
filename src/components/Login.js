import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";


const Login = ({handleLogin, handleRegister}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleAuthentication = () => {
    {isLogin?
      handleLogin(login, password)
      :
      handleRegister(email,login,password)
    }
    navigate('/products');
  };

  const setLoggedIn = () => {
      setIsLogin(!isLogin);
  };


  return (
    <div className="loginWrapper">
      <Link to={'/products'} className='link'><i className='bi bi-arrow-left'></i> Back to list</Link>
      <div className="loginForm">
        {isLogin?
          <></>
          :
          <>
            <input
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)}
              placeholder="Enter email"
            />       
          </>
        }    
        <input
          value={login}
          onChange={(e) =>
            setLogin(e.target.value)}
          placeholder="Enter login"
          autoCapitalize="none"
        />
        <input
          value={password}
          onChangeText={(e) =>
            setPassword(e.target.value)}
          placeholder="Enter password"
          secureTextEntry
        />  
        <button className="loginBtn" onClick={handleAuthentication}>{isLogin ? 'Login' : 'Register'}</button> 
        <button className="loginText" onClick={setLoggedIn}>{isLogin ? 'Don\'t have any account? Register now' : 'Have already member? Login now'}</button>
      </div>
    </div>
  )
}

export default Login