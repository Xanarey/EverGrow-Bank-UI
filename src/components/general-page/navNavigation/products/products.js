import React from 'react';
import { useNavigate } from 'react-router-dom';
import './products.css'

const Products = () => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <h1>Тут будут внешние ресурсы new 123 REACT_APP_API_URL </h1>
            <button onClick={() => navigate('/hello-auth-user')}>Вернуться на главную</button>
        </div>
    );
}

export default Products;
