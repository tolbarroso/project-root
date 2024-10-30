import React from 'react';

const SiteDiaWine = () => {
  React.useEffect(() => {
    window.location.href = 'https://www.diawine.com.br'; // Substitua pela URL oficial do site da Dia Wine
  }, []);

  return (
    <div>
      <h2>Redirecionando para o site da Dia Wine...</h2>
    </div>
  );
};

export default SiteDiaWine;
