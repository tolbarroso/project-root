// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './Dashboard.css'; // Estilo para a página

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
      const response2023 = await fetch('/path/to/dados2023.csv'); // Ajuste o caminho
      const response2024 = await fetch('/path/to/dados2024.csv'); // Ajuste o caminho

      const text2023 = await response2023.text();
      const text2024 = await response2024.text();

      const results2023 = Papa.parse(text2023, { header: true }).data;
      const results2024 = Papa.parse(text2024, { header: true }).data;

      setData([...results2023, ...results2024]);
      setFilteredData([...results2023, ...results2024]); // Inicialmente, mostre todos os dados
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

  // Cálculos para a seção de Visão Geral
  const totalFaturamento = filteredData.reduce((total, item) => total + parseFloat(item['TOTAL'] || 0), 0);
  const totalGarrafas = filteredData.reduce((total, item) => total + parseFloat(item['QT'] || 0), 0);
  const totalClientes = new Set(filteredData.map(item => item['COD CLIENTE'])).size;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <img src="/path/to/logo.png" alt="Logo" className="logo" /> {/* Ajuste o caminho */}
        <h1>DASHBOARD DIA WINE</h1>
      </header>
      <section className="overview">
        <h2>Visão Geral</h2>
        <div className="summary">
          <div>
            <h3>Faturamento Total</h3>
            <p>{`R$ ${totalFaturamento.toFixed(2)}`}</p> {/* Formatação de valor */}
          </div>
          <div>
            <h3>Quantidade de Garrafas</h3>
            <p>{totalGarrafas}</p>
          </div>
          <div>
            <h3>Quantidade de Clientes</h3>
            <p>{totalClientes}</p>
          </div>
        </div>
      </section>
      <section className="filters">
        <h2>Filtros</h2>
        <input
          type="text"
          placeholder="Cód Cliente"
          value={filters.codCliente}
          onChange={(e) => setFilters({ ...filters, codCliente: e.target.value })}
        />
        <input
          type="text"
          placeholder="RCA"
          value={filters.rca}
          onChange={(e) => setFilters({ ...filters, rca: e.target.value })}
        />
        <input
          type="date"
          placeholder="Data Início"
          value={filters.dtInicio}
          onChange={(e) => setFilters({ ...filters, dtInicio: e.target.value })}
        />
        <input
          type="date"
          placeholder="Data Fim"
          value={filters.dtFim}
          onChange={(e) => setFilters({ ...filters, dtFim: e.target.value })}
        />
        <input
          type="text"
          placeholder="Segmento"
          value={filters.segmento}
          onChange={(e) => setFilters({ ...filters, segmento: e.target.value })}
        />
        <input
          type="text"
          placeholder="Departamento"
          value={filters.departamento}
          onChange={(e) => setFilters({ ...filters, departamento: e.target.value })}
        />
        <input
          type="text"
          placeholder="Cód Produto"
          value={filters.codProduto}
          onChange={(e) => setFilters({ ...filters, codProduto: e.target.value })}
        />
        <input
          type="text"
          placeholder="Supervisor"
          value={filters.supervisor}
          onChange={(e) => setFilters({ ...filters, supervisor: e.target.value })}
        />
        <button onClick={applyFilters}>Aplicar Filtros</button>
      </section>
      <section className="data-table">
        <h2>Tabela de Dados</h2>
        <table>
          <thead>
            <tr>
              <th>CNPJ</th>
              <th>Cód Cliente</th>
              <th>Nome Fantasia</th>
              <th>Razão Social</th>
              <th>Bairro</th>
              <th>Município</th>
              <th>Cód Prod</th>
              <th>Produto</th>
              <th>Embalagem</th>
              <th>Quantidade</th>
              <th>Total</th>
              <th>RCA</th>
              <th>Nome Vendedor</th>
              <th>Nome Supervisor</th>
              <th>Cód Depto</th>
              <th>Departamento</th>
              <th>Condição de Venda</th>
              <th>Data de Faturamento</th>
              <th>Segmento</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item['CNPJ']}</td>
                <td>{item['COD CLIENTE']}</td>
                <td>{item['NOME FANTASIA']}</td>
                <td>{item['RAZÃO SOCIAL']}</td>
                <td>{item['BAIRRO']}</td>
                <td>{item['MUNICIPIO']}</td>
                <td>{item['COD PROD']}</td>
                <td>{item['PRODUTO']}</td>
                <td>{item['EMBALAGEM']}</td>
                <td>{item['QT']}</td>
                <td>{`R$ ${item['TOTAL']}`}</td>
                <td>{item['RCA']}</td>
                <td>{item['NOME VENDEDOR']}</td>
                <td>{item['NOME SUPERVISOR']}</td>
                <td>{item['COD DEPTO']}</td>
                <td>{item['DEPARTAMENTO']}</td>
                <td>{item['COND VENDA']}</td>
                <td>{item['DT FAT']}</td>
                <td>{item['SEGUIMENTO']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Dashboard;
