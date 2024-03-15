import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './components/auth/AuthForm';
import HelloAuthUser from './components/general-page/HelloAuthUser';
import ChangeCredentials from "./components/general-page/navNavigation/change-cred/ChangeCredentials";
import Products from "./components/general-page/navNavigation/products/products";
import './App.css';
import History from "./components/general-page/navNavigation/history/history";
import Pay from "./components/general-page/navNavigation/pay/pay";

function App() {


    return (
        <Router>
            <Routes>
                <Route path="/" element={<AuthForm />} />
                <Route path="/hello-auth-user" element={<HelloAuthUser />} />
                <Route path="/change-credentials" element={<ChangeCredentials />} />
                <Route path="/products" element={<Products />} />
                <Route path="/history" element={<History />} />
                <Route path="/pay" element={<Pay />} />
            </Routes>
        </Router>
    );
}

export default App;
