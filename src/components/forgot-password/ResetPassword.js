import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const { token } = useParams();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(apiUrl + '/password/reset', { token, password });
            setMessage('Password reset successful');
            navigate('/'); // Перенаправить на главную страницу после успешного сброса пароля
        } catch (error) {
            setMessage('Error resetting password, please try again');
        }
    };

    return (
        <div className="reset-password-container">
            <form onSubmit={handleSubmit}>
                <h2>Сброс пароля</h2>
                <div className="form-group">
                    <label htmlFor="password">Новый пароль</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Новый пароль"
                        required />
                </div>
                <div className="form-group">
                    <button type="submit">Сбросить пароль</button>
                </div>
                {message && <div>{message}</div>}
            </form>
        </div>
    );
}

export default ResetPassword;
