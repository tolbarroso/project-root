import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Dashboard from './pages/Dashboard';
import Top10 from './Top10'; 

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/top10" element={<Top10 />} />
    </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
