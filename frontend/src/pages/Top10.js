import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Top10 = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [topBuyers, setTopBuyers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/top10/2023');
        setTopProducts(response.data.top_products);
        setTopBuyers(response.data.top_buyers);
      } catch (error) {
        console.error("Erro ao carregar dados", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Top 10 Produtos e Compradores de 2023</h1>
      <h2>Top Produtos</h2>
      <ul>
        {topProducts.map((product, index) => (
          <li key={index}>{product.PRODUTO}: {product.QT}</li>
        ))}
      </ul>
      <h2>Top Compradores</h2>
      <ul>
        {topBuyers.map((buyer, index) => (
          <li key={index}>{buyer.FANTASIA}: {buyer.TOTAL}</li>
        ))}
      </ul>
    </div>
  );
};

export default Top10;
