import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './change-credentials.css';
import axios from "axios";

const ChangeCredentials = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [newEmail, setNewEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('http://51.250.90.24:8080/users/me', {
            method: 'GET',
            headers: {
                Authorization: token,
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка при получении данных');
                }
                return response.json();
            })
            .then(data => {
                setUserData(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        fetch('http://51.250.90.24:8080/users', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify({email: newEmail}),
        })
            .then(async response => {
                if (!response.ok) {
                    const text = await response.text(); // Получаем текст ответа для чтения сообщения об ошибке
                    throw new Error('Ошибка при обновлении данных: ' + text);
                }
                return response.text(); // Используем response.text() вместо response.json(), если ожидаем текстовый ответ
            })
            .then(text => {
                setSuccessMessage(text); // Устанавливаем текстовое сообщение от сервера
                // Опционально: обновите email в текущем состоянии пользователя
                setUserData(prevState => ({...prevState, email: newEmail}));
            })
            .catch(error => {
                setError(error.message);
            });

        if (newPassword !== confirmPassword) {
            setMessage("Новый пароль и подтверждение не совпадают.");
            return;
        }

        try {
            const response = await axios.put('http://51.250.90.24:8080/users/change-password', {
                oldPassword,
                newPassword,
                confirmPassword
            }, {
                headers: {
                    'Authorization': token
                }
            });

            setMessage(response.data); // Предполагается, что сервер возвращает строку
        } catch (error) {
            setMessage(error.response.data);
        }
    };




    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    // В компоненте ChangeCredentials.jsx
// ...
    return (
        <div className="container">
            <h1>Изменение учетных данных</h1>
            {userData && (
                <div className="user-data">
                    <p>Текущий Email: {userData.email}</p>
                </div>
            )}
            <form onSubmit={handleSubmit} className="email-update-form">
                <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="Новый Email"
                    required
                />
                <button type="submit">Сохранить</button>
            </form>
            {successMessage && <div className="success-message">{successMessage}</div>}
            <button onClick={() => navigate('/hello-auth-user')} className="back-home-button">
                Вернуться на главную
            </button>
            <div className="change-password-container">
                <h2>Смена пароля</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder="Текущий пароль"
                        required
                    />
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Новый пароль"
                        required
                    />
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Подтвердите новый пароль"
                        required
                    />
                    <button type="submit">Сменить пароль</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
// ...

}

export default ChangeCredentials;
