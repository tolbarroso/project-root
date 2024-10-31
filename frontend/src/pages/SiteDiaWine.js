import React from 'react';

const SiteDiaWine = () => {
  React.useEffect(() => {
    window.location.href = 'https://www.diawine.com.br'; 
  }, []);

  return (
    <div>
      <h2>Redirecionando para o site da Dia Wine...</h2>
    </div>
  );
};

export default SiteDiaWine;
