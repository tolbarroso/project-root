import React from 'react';
import Navbar from './components/Navbar';
import { Link } from 'react-router-dom'; 
import './styles.css'; 

const App = () => {
  return (
    <div>
      <Navbar />
      <h1>Bem-vindo a Dia Wine</h1>
      <div className="button-container">
        <a href="https://www.diawine.com.br/" className="button" target="_blank" rel="noopener noreferrer">Site</a>
        <a href="https://www.diawine.com.br/c/7/promocoes" className="button" target="_blank" rel="noopener noreferrer">Ofertas Atuais</a>
        <Link to="/top10" className="button">Top 10</Link>
        <Link to="/dashboard" className="button">Dashboard</Link>
      </div>
    </div>
  );
};

export default App;
