import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './HelloAuthUser.css';
import Footer from '../general-page/Footer';

function HelloAuthUser() {
    const [wallets, setWallets] = useState([]);
    const [news, setNews] = useState([]);
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
            return;
        }

        const config = {
            headers: { Authorization: `${token}` }
        };

        axios.get(apiUrl + '/balance/my', config)
            .then(response => {
                setWallets(response.data);
            })
            .catch(error => {
                console.error('Ошибка при получении информации о кошельках:', error);
                navigate('/'); // Перенаправить на страницу входа
            });
    }, [apiUrl, navigate]);

    useEffect(() => {
        axios.get('https://newsapi.org/v2/everything?q=банковский&language=ru&apiKey=c584d51602644ea191a3d3f0a52c4038')
            .then(response => {
                setNews(response.data.articles);
            })
            .catch(error => {
                console.error('Ошибка при получении новостей:', error);
            });
    }, []);

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
                <img src={`${process.env.PUBLIC_URL}/EGF.png`} alt="Логотип" className="logo" />
                <nav className="navigation">
                    <button onClick={handleClickPay}>Платежи и переводы</button>
                    <button onClick={handleClickHistory}>История</button>
                    <button onClick={handleClickProd}>Продукты</button>
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
                <section className="news-section">
                    <h2>Финансовые новости</h2>
                    <div className="news-container">
                        {news.map((article, index) => (
                            <div key={index} className="news-item">
                                <a href={article.url} target="_blank" rel="noopener noreferrer">
                                    <h3>{article.title}</h3>
                                    <p>{article.description}</p>
                                </a>
                            </div>
                        ))}
                    </div>
                </section>
                <footer className="footer">
                    <button className="logout-button" onClick={handleLogout}>Выйти</button>
                </footer>
            </main>

            <Footer/>
        </div>
    );
}

export default HelloAuthUser;
