import React, {useState} from 'react';
import {useNavigate, Link} from "react-router-dom";

const Registration = () => {
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();


    const validateForm = () => {
        const newErrors = {};

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            .test(email)) {
            newErrors.email = 'Email is invalid';
        }

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

        if (!firstName) {
            newErrors.firstName = 'First name is required';
        } else if (!/^[a-zA-Zа-яА-Я]+$/.test(firstName)) {
            newErrors.firstName = 'First name contains invalid characters';
        } else if (firstName.length < 3 || firstName.length > 60) {
            newErrors.firstName = 'First name must be 3-60 characters long';
        }

        if (!lastName) {
            newErrors.lastName = 'Last name is required';
        } else if (!/^[a-zA-Zа-яА-Я]+$/.test(lastName)) {
            newErrors.lastName = 'Last name contains invalid characters';
        } else if (lastName.length < 3 || lastName.length > 60) {
            newErrors.lastName = 'Last name must be 3-60 characters long';
        }

        if (!gender) {
            newErrors.gender = 'Gender is required';
        } else if (!/^[a-zA-Z]+$/.test(gender)) {
            newErrors.gender = 'Gender contains invalid characters';
        } else if (gender.length < 3 || gender.length > 60) {
            newErrors.gender = 'Gender must be 3-60 characters long';
        }

        if (!dateOfBirth) {
            newErrors.dateOfBirth = 'Date of Birth is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleRegister = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/auth/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    login,
                    password,
                    firstName,
                    lastName,
                    gender,
                    dateOfBirth,
                }),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            const data = await response.json();
            console.log('Registration successful:', data);
            alert("User with\nlogin: " + data.login + "\npassword: " + data.password + "\nsuccessfully created");
            navigate('/login');
        } catch (error) {
            console.error('Error during registration:', error);
            alert('Error during registration:' + error);
        }
    };

    function goToLogin() {
       navigate('/login');
    }

    return (
        <div className="registrationWrapper">
            <Link to={'/products'} className='link'><i className='bi bi-arrow-left'></i> Back to list</Link>
            <div className="registrationForm">
                <div className='registrationFormWrapper'>
                    <div className='registrationForm_info'>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) =>
                                setFirstName(e.target.value)}
                            placeholder="First Name"
                        />
                        {errors.firstName && <p className="error">{errors.firstName}</p>}
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) =>
                                setLastName(e.target.value)}
                            placeholder="Last Name"
                        />
                        {errors.lastName && <p className="error">{errors.lastName}</p>}
                        <input
                            type="text"
                            value={gender}
                            onChange={(e) =>
                                setGender(e.target.value)}
                            placeholder="Gender"
                        />
                        {errors.gender && <p className="error">{errors.gender}</p>}
                        <input
                            type="date"
                            value={dateOfBirth}
                            onChange={(e) =>
                                setDateOfBirth(e.target.value)}
                            placeholder="Date of Birth"
                        />
                        {errors.dateOfBirth && <p className="error">{errors.dateOfBirth}</p>}
                    </div>
                    <div className='registrationForm_req'>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)}
                            placeholder="Email"
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                        <input
                            type="text"
                            value={login}
                            onChange={(e) =>
                                setLogin(e.target.value)}
                            placeholder="Login"
                        />
                        {errors.login && <p className="error">{errors.login}</p>}
                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)}
                            placeholder="Password"
                        />
                        {errors.password && <p className="error">{errors.password}</p>}
                        <button className="registrationBtn" onClick={handleRegister}>Registration</button>
                    </div>
                </div>
                <button className="toLogin" onClick={goToLogin}>{'Already have an account? Login now'}</button>
            </div>
        </div>
    );
};

export default Registration;