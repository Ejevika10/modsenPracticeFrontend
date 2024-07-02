import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { getUserByLogin } from '../api/UserService';

const Login = ({handleAuthenticate}) => {
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState('');
  const navigate = useNavigate();

  const handleAuthentication = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({login: login, password: password}),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log('Login successful:', data);

      const accessToken = data.accessToken;
      const refreshToken = data.refreshToken;

      const accessTokenData = JSON.parse(atob(accessToken.split('.')[1]));
      const refreshTokenData = JSON.parse(atob(refreshToken.split('.')[1]));

      const roles = accessTokenData.roles;
      
      Cookies.set('accessToken', accessToken, {expires: new Date(accessTokenData.exp * 1000)});
      Cookies.set('refreshToken', refreshToken, {expires: new Date(refreshTokenData.exp * 1000)});
      Cookies.set('userRole', roles);
      console.log(accessTokenData);
      
      const sub = accessTokenData.sub;
      
      console.log(sub);
      const user = await getUserByLogin(sub);
      console.log(user);

      handleAuthenticate(roles, user);
      navigate("/products");
    } catch (error) {
      console.error('Error during login:', error);
      alert('Error during login:' + error);
    }
  };

  const goToRegistration = () => {
    navigate('/registration');
  };

  return (
    <div className="loginWrapper">
      <Link to={'/products'} className='link'><i className='bi bi-arrow-left'></i> Back to list</Link>
      <div className="loginForm">
        <input
          value={login}
          onChange={(e) =>
            setLogin(e.target.value)}
          placeholder="Enter login"
          autoCapitalize="none"
        />
        <input
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)}
          placeholder="Enter password"
        />  
        <button className="loginBtn" onClick={handleAuthentication}>Login</button>
        <button className="toRegistration" onClick={goToRegistration}>{'Don\'t have any account? Register now'}</button>
      </div>
    </div>
  )
}

export default Login