# Dia Wine Dashboard

Este projeto é um dashboard para a empresa Dia Wine, que inclui uma landing page com botões para acessar o site, ofertas atuais, o top 10 produtos mais vendidos, e o dashboard com dados filtrados.

## Como rodar o projeto

### Frontend
1. Acesse a pasta `frontend/`
2. Instale as dependências com `npm install`
3. Rode a aplicação com `npm start`

### Backend
1. Acesse a pasta `backend/`
2. Instale as dependências com `pip install -r requirements.txt`
3. Rode o servidor Flask com `python app.py`

### Docker
Você pode rodar o projeto usando Docker:
```bash
docker build -t diawine-dashboard .
docker run -p 5000:5000 diawine-dashboard
```

### Estrutura
1. Frontend: React.js
2. Backend: Flask e Pandas
3. Banco de Dados: Planilhas CSV