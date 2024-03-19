import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './HelloAuthUser.css';

function HelloAuthUser() {
    const [wallets, setWallets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
            return;
        }

        const config = {
            headers: { Authorization: `${token}` }
        };

        axios.get('http://51.250.90.24:8080/balance/my', config)
            .then(response => {
                setWallets(response.data);
            })
            .catch(error => {
                console.error('Ошибка при получении информации о кошельках:', error);
                navigate('/'); // Перенаправить на страницу входа
            });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };


    const translateWalletType = (type) => {
        const types = {
            CURRENT: "Текущий",
            CREDIT: "Кредитный",
            CUMULATIVE: "Сберегательный"
        };

        return types[type] || type;
    };

    const handleClickCred = () => {
        navigate('/change-credentials');
    };

    const handleClickProd = () => {
        navigate('/products');
    };

    const handleClickHistory = () => {
        navigate('/history');
    };

    const handleClickPay = () => {
        navigate('/pay');
    };

    return (
        <div className="app-container">
            <header className="top-bar">
                <img src={`${process.env.PUBLIC_URL}/DALL·E - logo  'EverGrowFinance' .png`} alt="Логотип" className="logo"/>
                <nav className="navigation">
                    <button onClick={handleClickPay}>Платежи и переводы</button>
                    <button onClick={handleClickHistory}>История</button>
                    <button onClick={handleClickProd}>Продукты</button>
                    <input type="search" className="search-input" placeholder="Поиск"/>
                    <button onClick={handleClickCred}>Учетные данные</button>
                </nav>
            </header>
            <main className="main-content">
                <aside className="sidebar">
                    <div className="wallets-container">
                        {wallets.map((wallet, index) => (
                            <div key={index} className="wallet-info">
                                <div>
                                    <p>Тип кошелька: {translateWalletType(wallet.walletType)}</p>
                                    <p>Баланс: {wallet.balance.toFixed(2)}</p>
                                    <p>Номер телефона: {wallet.phoneNumber}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>
            </main>
            <footer className="footer">
                <button className="logout-button" onClick={handleLogout}>Выйти</button>
            </footer>
        </div>
    );
}

export default HelloAuthUser;
