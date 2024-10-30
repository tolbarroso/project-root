import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <img src="/logo.png" alt="Dia Wine Logo" className="logo" />
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/top10">Top 10</Link></li>
      <li><Link to="/site-diawine" target="_blank">Site Dia Wine</Link></li>
      <li><Link to="/ofertas">Ofertas Atuais</Link></li>
    </ul>
  </nav>
);

export default Navbar;
