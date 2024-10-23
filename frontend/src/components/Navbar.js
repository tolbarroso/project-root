import React from 'react';

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <img src="/logo.png" alt="Dia Wine Logo" />
      </div>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="https://www.diawine.com.br/">Site</a></li>
        <li><a href="/ofertas">Ofertas Atuais</a></li>
        <li><a href="/top-produtos">Top 10 Produtos</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
