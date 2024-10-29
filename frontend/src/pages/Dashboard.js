// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './Dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    codCliente: '',
    rca: '',
    dtInicio: '',
    dtFim: '',
    segmento: '',
    departamento: '',
    codProduto: '',
    supervisor: ''
  });

  useEffect(() => {
    const loadData = async () => {
      const response2023 = await fetch('/data/dados2023.csv');
      const response2024 = await fetch('/data/dados2024.csv');
      const text2023 = await response2023.text();
      const text2024 = await response2024.text();
      const results2023 = Papa.parse(text2023, { header: true }).data;
      const results2024 = Papa.parse(text2024, { header: true }).data;
      setData([...results2023, ...results2024]);
      setFilteredData([...results2023, ...results2024]);
    };
    loadData();
  }, []);

  const applyFilters = () => {
    const filtered = data.filter(item => {
      return (
        (!filters.codCliente || item['COD CLIENTE'] === filters.codCliente) &&
        (!filters.rca || item['RCA'] === filters.rca) &&
        (!filters.dtInicio || new Date(item['DT FAT']) >= new Date(filters.dtInicio)) &&
        (!filters.dtFim || new Date(item['DT FAT']) <= new Date(filters.dtFim)) &&
        (!filters.segmento || item['SEGUIMENTO'] === filters.segmento) &&
        (!filters.departamento || item['DEPARTAMENTO'] === filters.departamento) &&
        (!filters.codProduto || item['COD PROD'] === filters.codProduto) &&
        (!filters.supervisor || item['NOME SUPERVISOR'] === filters.supervisor)
      );
    });
    setFilteredData(filtered);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>DASHBOARD DIA WINE</h1>
      </header>
      <section className="overview">
        <h2>Visão Geral</h2>
        <div className="summary">
          <div>
            <h3>Faturamento Total</h3>
            <p>{`R$ ${filteredData.reduce((acc, item) => acc + parseFloat(item['TOTAL'] || 0), 0).toFixed(2)}`}</p>
          </div>
          <div>
            <h3>Quantidade de Garrafas</h3>
            <p>{filteredData.reduce((acc, item) => acc + parseInt(item['QT'] || 0), 0)}</p>
          </div>
          <div>
            <h3>Quantidade de Clientes</h3>
            <p>{new Set(filteredData.map(item => item['COD CLIENTE'])).size}</p>
          </div>
        </div>
      </section>
      <section className="filters">
        <h2>Filtros</h2>
        <input type="text" placeholder="Cód Cliente" value={filters.codCliente} onChange={e => setFilters({ ...filters, codCliente: e.target.value })} />
        <input type="text" placeholder="RCA" value={filters.rca} onChange={e => setFilters({ ...filters, rca: e.target.value })} />
        <input type="date" placeholder="Data Início" value={filters.dtInicio} onChange={e => setFilters({ ...filters, dtInicio: e.target.value })} />
        <input type="date" placeholder="Data Fim" value={filters.dtFim} onChange={e => setFilters({ ...filters, dtFim: e.target.value })} />
        <input type="text" placeholder="Segmento" value={filters.segmento} onChange={e => setFilters({ ...filters, segmento: e.target.value })} />
        <input type="text" placeholder="Departamento" value={filters.departamento} onChange={e => setFilters({ ...filters, departamento: e.target.value })} />
        <input type="text" placeholder="Cód Produto" value={filters.codProduto} onChange={e => setFilters({ ...filters, codProduto: e.target.value })} />
        <input type="text" placeholder="Supervisor" value={filters.supervisor} onChange={e => setFilters({ ...filters, supervisor: e.target.value })} />
        <button onClick={applyFilters}>Aplicar Filtros</button>
      </section>
    </div>
  );
};

export default Dashboard;
