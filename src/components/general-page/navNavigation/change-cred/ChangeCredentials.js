import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './change-credentials.css';
import axios from 'axios';

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
    const [passwordMessage, setPasswordMessage] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL;

    // Загрузка данных пользователя
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/users/me`, {
                    headers: { Authorization: token },
                });
                setUserData(response.data);
            } catch (err) {
                setError('Ошибка при получении данных пользователя');
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [apiUrl, token]);

    // Обновление email
    const handleEmailUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `${apiUrl}/users`,
                { email: newEmail },
                { headers: { Authorization: token } }
            );
            setSuccessMessage(response.data);
            setUserData((prev) => ({ ...prev, email: newEmail }));
        } catch (err) {
            setError('Ошибка при обновлении email');
        }
    };

    // Смена пароля
    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setPasswordMessage('Новый пароль и подтверждение не совпадают.');
            return;
        }

        try {
            const response = await axios.put(
                `${apiUrl}/users/change-password`,
                { oldPassword, newPassword, confirmPassword },
                { headers: { Authorization: token } }
            );
            setPasswordMessage(response.data); // Сообщение от сервера
        } catch (err) {
            setPasswordMessage('Ошибка при смене пароля');
        }
    };

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error}</div>;

    return (
        <div className="container">
            <h1>Изменение учетных данных</h1>
            {userData && <p>Текущий Email: {userData.email}</p>}

            {/* Форма для обновления email */}
            <form onSubmit={handleEmailUpdate} className="email-update-form">
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

            {/* Форма для смены пароля */}
            <div className="change-password-container">
                <h2>Смена пароля</h2>
                <form onSubmit={handlePasswordChange}>
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
                {passwordMessage && <p>{passwordMessage}</p>}
            </div>

            <button onClick={() => navigate('/hello-auth-user')} className="back-home-button">
                Вернуться на главную
            </button>
        </div>
    );
};

export default ChangeCredentials;
