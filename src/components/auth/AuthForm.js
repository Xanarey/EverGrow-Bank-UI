import React, { useState } from 'react';
import axios from 'axios';
import './AuthForm.css';


function AuthForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Состояние для хранения сообщения об ошибке
    const apiUrl = "http://158.160.165.159:8080";


    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage(''); // Очистка предыдущего сообщения об ошибке при новой попытке отправки формы

        try {
            const response = await axios.post(apiUrl + '/auth', { email, password });
            localStorage.setItem('token', response.data.token); // Сохраняем токен в localStorage
            window.location.href = '/hello-auth-user'; // Перенаправляем на страницу
        } catch (error) {
            console.error('Ошибка аутентификации', error);
            // Установка сообщения об ошибке, если аутентификация не удалась
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
            </form>

        </div>
        </div>
    );
}

export default AuthForm;
