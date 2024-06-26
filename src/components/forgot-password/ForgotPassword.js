import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css';
import {useNavigate} from "react-router-dom";

function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [progress, setProgress] = useState(0);
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        setIsButtonDisabled(true);
        setProgress(0);

        let timeLeft = 7;
        const interval = setInterval(() => {
            setProgress((prev) => prev + 17);
            timeLeft -= 1;
            if (timeLeft <= 0) {
                clearInterval(interval);
                setIsButtonDisabled(false);
                setProgress(0);
            }
        }, 1000);

        try {
            await axios.post(apiUrl + '/password/forgot', { email });
            setMessage('Ссылка для восстановления отправлена на указанную почту');
        } catch (error) {
            setMessage('Error sending password reset email, please try again');
        }
    };

    return (
        <div className="forgot-password-container">
            <form onSubmit={handleSubmit}>
                <h2>Восстановление пароля</h2>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Введите ваш email"
                        required
                    />
                </div>
                <div className="form-group">
                    <button type="submit" disabled={isButtonDisabled}>
                        {isButtonDisabled ? (
                            <div className="progress-bar">
                                <div className="progress" style={{width: `${progress}%`}}></div>
                            </div>
                        ) : (
                            'Отправить'
                        )}
                    </button>
                    <button onClick={() => navigate('/hello-auth-user')} className="back-home-button">
                        Вернуться на главную
                    </button>
                </div>
                {message && <div>{message}</div>}
            </form>
        </div>
    );
}

export default ForgotPassword;
