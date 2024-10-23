from flask import Flask, render_template, jsonify, request
import pandas as pd

app = Flask(__name__)

# Carregando os dados
dados_2023 = pd.read_csv('data/dados2023.csv')
dados_2024 = pd.read_csv('data/dados2024.csv')

# Rota para renderizar a página inicial
@app.route('/')
def home():
    return render_template('index.html')

# Rota para retornar as ofertas clonadas
@app.route('/ofertas', methods=['GET'])
def ofertas():
    # Aqui você pode fazer scraping ou acessar dados do site original
    ofertas = [{"produto": "Exemplo 1", "preco": 50}, {"produto": "Exemplo 2", "preco": 100}]
    return jsonify(ofertas)

# Rota para retornar o Top 10 produtos mais vendidos
@app.route('/top-produtos', methods=['GET'])
def top_produtos():
    # Exemplo de lógica para filtrar o top 10 de 2024
    top_2024 = dados_2024.groupby('PRODUTO')['QT'].sum().nlargest(10).reset_index()
    return jsonify(top_2024.to_dict(orient='records'))

# Rota para o dashboard com dados filtrados
@app.route('/dashboard', methods=['GET'])
def dashboard():
    # Filtros de exemplo
    filtro_rca = request.args.get('rca')
    filtro_periodo_inicio = request.args.get('data_inicio')
    filtro_periodo_fim = request.args.get('data_fim')
    
    # Aplicar os filtros (exemplo)
    dados_filtrados = dados_2024  # Lógica para filtrar os dados
    
    return jsonify(dados_filtrados.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)
