import React from 'react';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div>
      <Navbar />
      <h1>Bem-vindo ao Dashboard Dia Wine</h1>
      {/* Rotas ou componentes dinâmicos podem ser renderizados aqui */}
    </div>
  );
};

export default App;
