import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './history.css';

const History = () => {
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;


    useEffect(() => {
        const fetchTransactions = async () => {
            const token = localStorage.getItem('token'); // Предполагаем, что токен сохраняется в localStorage
            try {
                const response = await axios.get(apiUrl + '/transactions/my', {
                    headers: {
                        Authorization: token, // Также проверьте формат токена, возможно, нужно 'Bearer ' + token
                    },
                });
                setTransactions(response.data);
            } catch (error) {
                console.error('Ошибка при получении истории транзакций:', error);
                // Обработайте ошибки, например, перенаправьте на страницу входа
            }
        };

        fetchTransactions();
    }, [apiUrl]); // Пустой массив зависимостей означает, что эффект выполнится один раз после монтирования компонента

    return (
        <div className="container">
            <h1>История всех транзакций</h1>
            <div className="transaction-container">
                {transactions.map((transaction, index) => (
                    <div key={index} className="transaction-info">
                        <p>Сумма: {transaction.amount}</p>
                        <p>Валюта: {transaction.currency}</p>
                        <p>Дата: {transaction.dateTime}</p>
                        <p>Номер отправителя: {transaction.senderPhoneNumber}</p>
                        <p>Номер получателя: {transaction.recipientPhoneNumber}</p>
                        <p>Статус транзакции: {transaction.status}</p>
                        <p>Тип перевода: {transaction.type}</p>
                        <p>Примечание: {transaction.description}</p>

                    </div>
                ))}
            </div>
            <button onClick={() => navigate('/hello-auth-user')}>Вернуться на главную</button>
        </div>
    );

};

export default History;
