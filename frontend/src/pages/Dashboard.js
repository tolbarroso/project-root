import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Select from 'react-select';
import './Dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    codCliente: [],
    rca: [],
    dtInicio: '',
    dtFim: '',
    segmento: [],
    departamento: [],
    codProduto: [],
    supervisor: []
  });
  const [options, setOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log("Iniciando o carregamento dos dados...");
        const response2023 = await fetch('/data/dados2023.csv');
        const response2024 = await fetch('/data/dados2024.csv');
        
        if (!response2023.ok) throw new Error('Erro ao carregar dados de 2023');
        if (!response2024.ok) throw new Error('Erro ao carregar dados de 2024');

        const text2023 = await response2023.text();
        const text2024 = await response2024.text();
        const results2023 = Papa.parse(text2023, { header: true }).data;
        const results2024 = Papa.parse(text2024, { header: true }).data;
        const combinedData = [...results2023, ...results2024];
        
        setData(combinedData);
        setFilteredData(combinedData);
        
        console.log("Dados carregados:", combinedData); // Logando dados carregados

        setOptions({
          codCliente: [...new Set(combinedData.map(item => item['CODCLI']))],
          rca: [...new Set(combinedData.map(item => item['CODUSUR']))],
          segmento: [...new Set(combinedData.map(item => item['RAMO']))],
          departamento: [...new Set(combinedData.map(item => item['DEPARTAMENTO']))],
          codProduto: [...new Set(combinedData.map(item => item['CODPROD']))],
          supervisor: [...new Set(combinedData.map(item => item['SUPERVISOR']))]
        });
        
        console.log("Opções definidas:", options); // Logando as opções geradas
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const applyFilters = () => {
    console.log("Aplicando filtros:", filters); // Logando filtros aplicados
    const filtered = data.filter(item => {
      return (
        (!filters.codCliente.length || filters.codCliente.includes(item['CODCLI'])) &&
        (!filters.rca.length || filters.rca.includes(item['CODUSUR'])) &&
        (!filters.dtInicio || new Date(item['DTFAT']) >= new Date(filters.dtInicio)) &&
        (!filters.dtFim || new Date(item['DTFAT']) <= new Date(filters.dtFim)) &&
        (!filters.segmento.length || filters.segmento.includes(item['RAMO'])) &&
        (!filters.departamento.length || filters.departamento.includes(item['DEPARTAMENTO'])) &&
        (!filters.codProduto.length || filters.codProduto.includes(item['CODPROD'])) &&
        (!filters.supervisor.length || filters.supervisor.includes(item['SUPERVISOR']))
      );
    });
    
    setFilteredData(filtered);
    console.log("Dados filtrados:", filtered); // Logando dados filtrados
  };

  const getComparisonData = (year) => {
    const yearData = filteredData.filter(item => new Date(item['DTFAT']).getFullYear() === year);
    const totalRevenue = yearData.reduce((acc, item) => acc + parseFloat(item['TOTAL'] || 0), 0);
    const totalBottles = yearData.reduce((acc, item) => acc + parseInt(item['QT'] || 0), 0);
    const totalClients = new Set(yearData.map(item => item['CODCLI'])).size;
    
    console.log(`Dados de comparação para ${year}:`, { totalRevenue, totalBottles, totalClients }); // Logando dados de comparação
    return { totalRevenue, totalBottles, totalClients };
  };

  const comparison2023 = getComparisonData(2023);
  const comparison2024 = getComparisonData(2024);

  if (loading) {
    return <div>Carregando dados...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div className="dashboard">
      {/* Visão Geral */}
      <section className="overview">
        <h2>Visão Geral</h2>
        <div className="summary">
          <div className="card">
            <h3>Faturamento Total</h3>
            <p>2023: R$ {comparison2023.totalRevenue.toFixed(2)}</p>
            <p>2024: R$ {comparison2024.totalRevenue.toFixed(2)}</p>
            <p>Crescimento: {(((comparison2024.totalRevenue - comparison2023.totalRevenue) / comparison2023.totalRevenue) * 100).toFixed(2)}%</p>
          </div>
          <div className="card">
            <h3>Quantidade de Garrafas</h3>
            <p>2023: {comparison2023.totalBottles}</p>
            <p>2024: {comparison2024.totalBottles}</p>
            <p>Crescimento: {(((comparison2024.totalBottles - comparison2023.totalBottles) / comparison2023.totalBottles) * 100).toFixed(2)}%</p>
          </div>
          <div className="card">
            <h3>Quantidade de Clientes</h3>
            <p>2023: {comparison2023.totalClients}</p>
            <p>2024: {comparison2024.totalClients}</p>
            <p>Crescimento: {(((comparison2024.totalClients - comparison2023.totalClients) / comparison2023.totalClients) * 100).toFixed(2)}%</p>
          </div>
        </div>
      </section>

      {/* Filtros */}
      <section className="filters">
        <h2>Filtros</h2>
        <div className="filters-container">
          <Select
            isMulti
            options={options.codCliente.map(cod => ({ value: cod, label: cod }))}
            placeholder="Cód Cliente"
            onChange={selected => setFilters({ ...filters, codCliente: selected.map(s => s.value) })}
          />
          <Select
            isMulti
            options={options.rca.map(rca => ({ value: rca, label: rca }))}
            placeholder="RCA"
            onChange={selected => setFilters({ ...filters, rca: selected.map(s => s.value) })}
          />
          <input type="date" placeholder="Data Início" value={filters.dtInicio} onChange={e => setFilters({ ...filters, dtInicio: e.target.value })} />
          <input type="date" placeholder="Data Fim" value={filters.dtFim} onChange={e => setFilters({ ...filters, dtFim: e.target.value })} />
          <Select
            isMulti
            options={options.segmento.map(seg => ({ value: seg, label: seg }))}
            placeholder="Segmento"
            onChange={selected => setFilters({ ...filters, segmento: selected.map(s => s.value) })}
          />
          <Select
            isMulti
            options={options.departamento.map(dep => ({ value: dep, label: dep }))}
            placeholder="Departamento"
            onChange={selected => setFilters({ ...filters, departamento: selected.map(s => s.value) })}
          />
          <Select
            isMulti
            options={options.codProduto.map(prod => ({ value: prod, label: prod }))}
            placeholder="Cód Produto"
            onChange={selected => setFilters({ ...filters, codProduto: selected.map(s => s.value) })}
          />
          <Select
            isMulti
            options={options.supervisor.map(sup => ({ value: sup, label: sup }))}
            placeholder="Supervisor"
            onChange={selected => setFilters({ ...filters, supervisor: selected.map(s => s.value) })}
          />
          <button onClick={applyFilters}>Aplicar Filtros</button>
        </div>
      </section>

      {/* Tabela de Dados Filtrados */}
      <section className="filtered-data">
        <h2>Dados Filtrados</h2>
        {filteredData.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Código Cliente</th>
                <th>Nome Fantasia</th>
                <th>Razão Social</th>
                <th>Departamento</th>
                <th>Data Faturamento</th>
                <th>Total</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{item['CODCLI']}</td>
                  <td>{item['NOMEFANTASIA']}</td>
                  <td>{item['RAZAOSOCIAL']}</td>
                  <td>{item['DEPARTAMENTO']}</td>
                  <td>{item['DTFAT']}</td>
                  <td>{item['TOTAL']}</td>
                  <td>{item['QT']}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhum dado encontrado com os filtros aplicados.</p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
