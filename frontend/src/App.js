import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Top10 from './pages/Top10';
import SiteDiaWine from './pages/SiteDiaWine';
import Ofertas from './pages/Ofertas';

const App = () => (
  <div>
    <Navbar />
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/top10" element={<Top10 />} />
      <Route path="/site-diawine" element={<SiteDiaWine />} />
      <Route path="/ofertas" element={<Ofertas />} />
    </Routes>
  </div>
);

export default App;
