// frontend/src/pages/Top10.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Top10 = () => {
  const [topProducts2023, setTopProducts2023] = useState([]);
  const [topProducts2024, setTopProducts2024] = useState([]);
  const [topBuyers2023, setTopBuyers2023] = useState([]);
  const [topBuyers2024, setTopBuyers2024] = useState([]);

  useEffect(() => {
    const fetchTop10Data = async (year) => {
      try {
        const response = await axios.get(`/api/top10/${year}`);
        if (year === 2023) {
          setTopProducts2023(response.data.top_products);
          setTopBuyers2023(response.data.top_buyers);
        } else if (year === 2024) {
          setTopProducts2024(response.data.top_products);
          setTopBuyers2024(response.data.top_buyers);
        }
      } catch (error) {
        console.error(`Erro ao carregar dados de ${year}:`, error);
      }
    };

    fetchTop10Data(2023);
    fetchTop10Data(2024);
  }, []);

  return (
    <div>
      <Link to="/" className="back-button">← Voltar para Página Inicial</Link>
      <h1>Top 10 Produtos Mais Vendidos e Maiores Compradores</h1>

      <h2>Top 10 Produtos Mais Vendidos - 2023</h2>
      <ul>
        {topProducts2023.map((product, index) => (
          <li key={index}>{product.PRODUTO}: {product.QT} unidades</li>
        ))}
      </ul>

      <h2>Top 10 Produtos Mais Vendidos - 2024</h2>
      <ul>
        {topProducts2024.map((product, index) => (
          <li key={index}>{product.PRODUTO}: {product.QT} unidades</li>
        ))}
      </ul>

      <h2>Top 10 Maiores Compradores - 2023</h2>
      <ul>
        {topBuyers2023.map((buyer, index) => (
          <li key={index}>{buyer.FANTASIA}: R$ {buyer.TOTAL.toFixed(2)}</li>
        ))}
      </ul>

      <h2>Top 10 Maiores Compradores - 2024</h2>
      <ul>
        {topBuyers2024.map((buyer, index) => (
          <li key={index}>{buyer.FANTASIA}: R$ {buyer.TOTAL.toFixed(2)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Top10;
