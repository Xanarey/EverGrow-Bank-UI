import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './pay.css';

const Pay = () => {
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [senderPhoneNumber, setSenderPhoneNumber] = useState('');
    const [recipientPhoneNumber, setRecipientPhoneNumber] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('TRANSFER');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');
    const [progress, setProgress] = useState(0);
    const apiUrl = process.env.REACT_APP_API_URL;

    const [sampleTransactions, setSampleTransactions] = useState(() => {
        const savedTransactions = localStorage.getItem('sampleTransactions');
        return savedTransactions ? JSON.parse(savedTransactions) : [];
    });

    const translateType = (typeCode) => {
        const types = {
            TRANSFER: 'Перевод',
            PAYMENT: 'Платеж',
            DEPOSIT: 'Внесение депозита',
        };
        return types[typeCode] || typeCode;
    };

    useEffect(() => {
        localStorage.setItem('sampleTransactions', JSON.stringify(sampleTransactions));
    }, [sampleTransactions]);

    const addSampleTransaction = (newSample) => {
        setSampleTransactions(prevSamples => [...prevSamples, newSample]);
    };

    const fillFormWithSample = (sample) => {
        setAmount(sample.amount);
        setCurrency(sample.currency);
        setSenderPhoneNumber(sample.senderPhoneNumber);
        setRecipientPhoneNumber(sample.recipientPhoneNumber);
        setDescription(sample.description);
        setType(sample.type);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/transfers`, {
                amount,
                currency,
                senderPhoneNumber,
                recipientPhoneNumber,
                description,
                type
            }, {
                headers: {
                    'Authorization': `${token}`
                }
            });

            if (response.data.requiresOtp) {

                navigate('/enter-otp', { state: { transferId: response.data.transferId } });
            } else {
                setShowModal(true);
                const interval = setInterval(() => {
                    setProgress(oldProgress => {
                        if (oldProgress === 100) {
                            clearInterval(interval);
                            return 100;
                        }
                        return Math.min(oldProgress + 33, 100);
                    });
                }, 500);

                addSampleTransaction({ amount, currency, senderPhoneNumber, recipientPhoneNumber, description, type });
                setMessage(response.data.message);
                setShowModal(true);
                setTimeout(() => {
                    setShowModal(false);
                    navigate('/hello-auth-user');
                }, 3000);
            }

        } catch (error) {
            console.error('Ошибка при выполнении перевода:', error);
        }
    };

    return (
        <div className="container">
            <h1>Логика осуществления перевода денег</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Сумма"
                />
                <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="RUB">RUB</option>
                    <option value="GBP">GBP</option>
                    <option value="JPY">JPY</option>
                </select>
                <input
                    type="text"
                    value={senderPhoneNumber}
                    onChange={(e) => setSenderPhoneNumber(e.target.value)}
                    placeholder="Номер отправителя"
                />
                <input
                    type="text"
                    value={recipientPhoneNumber}
                    onChange={(e) => setRecipientPhoneNumber(e.target.value)}
                    placeholder="Номер получателя"
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Описание"
                />
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="TRANSFER">Перевод</option>
                    <option value="PAYMENT">Платеж</option>
                    <option value="DEPOSIT">Внесение депозита</option>
                </select>
                <button type="submit">Выполнить перевод</button>
            </form>
            <div className="progress-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>

            <div className="sample-transactions">
                {sampleTransactions.length > 0 &&
                    <div className="last-transaction">
                        <h3>Последняя транзакция:</h3>
                    </div>
                }

                {showModal && (
                    <div className="modal">
                        <p>{message}</p>
                    </div>
                )}

                {sampleTransactions.slice(-1).map((sample, index) => (
                    <div key={index} className="sample-transaction" onClick={() => fillFormWithSample(sample)}>
                        <p><strong>Сумма:</strong> {sample.amount} {sample.currency}</p>
                        <p><strong>Отправитель:</strong> {sample.senderPhoneNumber}</p>
                        <p><strong>Получатель:</strong> {sample.recipientPhoneNumber}</p>
                        <p><strong>Описание:</strong> {sample.description}</p>
                        <p><strong>Тип:</strong> {translateType(sample.type)}</p>
                    </div>
                ))}

            </div>

            <button onClick={() => navigate('/hello-auth-user')}>Вернуться на главную</button>
        </div>
    );
};

export default Pay;
