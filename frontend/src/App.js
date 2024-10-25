// src/App.js
import React from 'react';
import Navbar from './components/Navbar';
import './styles.css'; // Certifique-se de que o caminho esteja correto

const App = () => {
  return (
    <div>
      <Navbar />
      <h1>Bem-vindo ao Dia Wine</h1>
      <div className="button-container">
        <a href="https://www.diawine.com.br/" className="button">Site</a>
        <a href="https://www.diawine.com.br/c/7/promocoes" className="button">Ofertas Atuais</a>
        <a href="/top10" className="button">Top 10 Produtos Mais Vendidos</a>
        <a href="/dashboard" className="button">Dashboard</a>
      </div>
    </div>
  );
};

export default App;
