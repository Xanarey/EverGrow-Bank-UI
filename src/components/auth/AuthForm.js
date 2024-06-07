import React, { useState } from 'react';
import axios from 'axios';
import './AuthForm.css';
import {Link} from "react-router-dom";


function AuthForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL;


    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');

        try {
            const response = await axios.post(apiUrl + '/auth', { email, password });

            localStorage.setItem('token', response.data.token);
            window.location.href = '/hello-auth-user';
        } catch (error) {
            console.error('Ошибка аутентификации', error);
            setErrorMessage('Данные не корректны. Пожалуйста, попробуйте снова.');
        }
    };


    return (
        <div className="auth-page-wrapper">
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Вход в систему</h2>
                <div className="form-group">
                    <label htmlFor="email">Логин</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email"
                        required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                        required/>
                </div>
                <div className="form-group">
                    <button type="submit">Войти</button>
                    {errorMessage && <div style={{color: 'red', marginTop: '10px'}}>{errorMessage}</div>}
                </div>
                <div className="form-group">
                    <Link to="/register">Регистрация</Link>
                </div>
                <div className="form-group">
                    <Link to="/forgot-password">Восстановить доступ</Link>
                </div>
            </form>

        </div>
        </div>
    );
}

export default AuthForm;
