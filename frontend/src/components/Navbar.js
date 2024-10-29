// src/components/Navbar.js
import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Dia Wine Logo" className="logo" />
      <h2>DASHBOARD DIA WINE</h2>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="https://www.diawine.com.br/">Site</a></li>
        <li><a href="https://www.diawine.com.br/c/7/promocoes">Ofertas Atuais</a></li>
        <li><a href="/top-produtos">Top 10</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
