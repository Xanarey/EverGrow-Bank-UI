import React, { useState } from 'react';
import axios from 'axios';
import './RegisterForm.css';
import { useNavigate } from "react-router-dom";

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
                <img src={`${process.env.PUBLIC_URL}/EGF.png`} alt="Логотип" className="logo"/>
                <div className="form-group">
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                           placeholder="Введите ваш email" required/>
                </div>
                <div className="form-group">
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                           placeholder="Введите ваш пароль" required/>
                </div>
                <div className="form-group">
                    <input type="text" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}
                           placeholder="Введите ваш номер телефона" required/>
                </div>
                <div className="form-group">
                    <select value={walletType} onChange={e => setWalletType(e.target.value)}>
                        <option value="CURRENT">Текущий</option>
                        <option value="CREDIT">Кредитный</option>
                        <option value="CUMULATIVE">Накопительный</option>
                    </select>
                </div>
                <div className="form-group">
                    <button type="submit" className="submit-button">Сохранить</button>
                    <button type="button" onClick={() => navigate('/hello-auth-user')} className="submit-button">
                        Вернуться на главную
                    </button>
                </div>


                {errorMessage && <div style={{color: 'red'}}>{errorMessage}</div>}
            </form>

        </div>
    );
}

export default RegisterForm;
