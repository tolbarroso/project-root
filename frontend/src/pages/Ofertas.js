import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Ofertas = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get('/api/ofertas'); // Configurar backend para retornar ofertas atuais
        setOffers(response.data);
      } catch (error) {
        console.error("Erro ao carregar ofertas", error);
      }
    };

    fetchOffers();
  }, []);

  return (
    <div>
      <h1>Ofertas Atuais</h1>
      {offers.length > 0 ? (
        <ul>
          {offers.map((offer, index) => (
            <li key={index}>{offer.produto}: R$ {offer.preco}</li>
          ))}
        </ul>
      ) : (
        <p>Carregando ofertas...</p>
      )}
    </div>
  );
};

export default Ofertas;
