import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-left">
                    <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Логотип" className="footer-logo" />
                </div>

                <div className="footer-center">
                    <nav className="footer-nav">
                        <a href="#about">О банке</a>
                        <a href="#news">Новости</a>
                        <a href="#blog">Блог</a>
                        <a href="#jobs">Работа</a>
                        <a href="#locations">Точки пополнения</a>
                        <a href="#atms">Банкоматы</a>
                        <a href="#rates">Курсы валют</a>
                        <a href="#contacts">Контакты</a>
                        <a href="#help">Помощь</a>
                        <a href="#investors">For investors</a>

                    </nav>
                </div>
                <div className="footer-right">
                    <div className="footer-phone">xenor.flow@mail.ru</div>
                    <div className="footer-phone-info">Контактный центр</div>

                </div>

            </div>
        </footer>
    );
}

export default Footer;
