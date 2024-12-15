import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './enter-otp.css';

const EnterOtpPage = () => {
    const [otp, setOtp] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleSubmitOtp = async () => {
        try {
            const { transferId } = location.state;
            await axios.post(`${apiUrl}/transfers/confirm`, { transferId, otp }, {
                headers: {
                    'Authorization': `${token}`
                }
            });
            alert('Transfer successful!');
            navigate('/hello-auth-user');
        } catch (error) {
            console.error('OTP validation failed', error);
            alert('OTP validation failed');
        }
    };

    return (
        <div className="container">
            <h1>Enter OTP</h1>
            <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
            />
            <button onClick={handleSubmitOtp}>Submit</button>
        </div>
    );
};

export default EnterOtpPage;
