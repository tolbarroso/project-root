import React from 'react';

const Ofertas = () => {
  React.useEffect(() => {
    window.location.href = 'https://www.diawine.com.br/c/7/promocoes'; 
  }, []);

  return (
    <div>
      <h2>Redirecionando para a Aba de Ofertas...</h2>
    </div>
  );
};

export default Ofertas;
