import React, {useState, useEffect} from 'react';
import {useNavigate, Link} from "react-router-dom";

const Registration = () => {
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
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
                <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="text"
                    value={login}
                    onChange={(e) =>
                        setLogin(e.target.value)}
                    placeholder="Login"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)}
                    placeholder="Password"
                />
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) =>
                        setFirstName(e.target.value)}
                    placeholder="First Name"
                />
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) =>
                        setLastName(e.target.value)}
                    placeholder="Last Name"
                />
                <input
                    type="text"
                    value={gender}
                    onChange={(e) =>
                        setGender(e.target.value)}
                    placeholder="Gender"
                />
                <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) =>
                        setDateOfBirth(e.target.value)}
                    placeholder="Date of Birth"
                />
                <button className="registrationBtn" onClick={handleRegister}>Registration</button>
                <button className="toLogin" onClick={goToLogin}>{'Already have an account? Login now'}</button>
            </div>
        </div>
    )
        ;
};

export default Registration;