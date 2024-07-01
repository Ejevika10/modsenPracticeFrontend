import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

const Login = ({handleAuthenticate}) => {
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!login) {
      newErrors.login = 'Login is required';
    } else if (!/^[a-zA-Z0-9._-]+$/.test(login)) {
      newErrors.login = 'Login contains invalid characters';
    } else if (login.length < 8 || login.length > 20) {
      newErrors.login = 'Login must be 8-20 characters long';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!/^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>+-]+$/.test(password))  {
      newErrors.password = 'Password contains invalid characters';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleAuthentication = async () => {
    if (!validateForm()) {
      return;
    }

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

      //needs refactor idk
      handleAuthenticate(roles);
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
        {errors.login && <p className="error">{errors.login}</p>}
        <input
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)}
          placeholder="Enter password"
        />
        {errors.password && <p className="error">{errors.password}</p>}
        <button className="loginBtn" onClick={handleAuthentication}>Login</button>
        <button className="toRegistration" onClick={goToRegistration}>{'Don\'t have any account? Register now'}</button>
      </div>
    </div>
  )
}

export default Login