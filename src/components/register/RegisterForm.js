import React, { useState } from 'react';
import axios from 'axios';
import './RegisterForm.css';
import {useNavigate} from "react-router-dom";


function RegisterForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [walletType, setWalletType] = useState('CURRENT');
    const [errorMessage, setErrorMessage] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080';

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`${apiUrl}/register`, {
                email,
                password,
                phoneNumber,
                walletType
            });

            alert('Регистрация успешно завершена!');
            window.location.href = '/hello-auth-user';
        } catch (error) {
            console.error('Ошибка регистрации:', error);
            setErrorMessage(error.response?.data?.message || 'Ошибка при регистрации.');
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleRegister}>
                <h2>Регистрация</h2>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required/>
                </div>
                <div>
                    <label>Пароль:</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required/>
                </div>
                <div>
                    <label>Номер телефона:</label>
                    <input type="text" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required/>
                </div>
                <div>
                    <label>Тип кошелька:</label>
                    <select value={walletType} onChange={e => setWalletType(e.target.value)}>
                        <option value="CURRENT">Текущий</option>
                        <option value="CREDIT">Кредитный</option>
                        <option value="CUMULATIVE">Накопительный</option>
                    </select>
                </div>
                <div>
                    <button type="submit">Сохранить</button>
                </div>
                {/* eslint-disable-next-line no-undef */}
                <button onClick={() => navigate('/hello-auth-user')} className="back-home-button">
                    Вернуться на главную
                </button>

                {errorMessage && <div style={{color: 'red'}}>{errorMessage}</div>}
            </form>
        </div>
    );
}

export default RegisterForm;
