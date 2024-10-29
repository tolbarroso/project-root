# backend/app.py
from flask import Flask, jsonify
import pandas as pd

app = Flask(__name__)

@app.route('/api/top10/2023', methods=['GET'])
def get_top10_2023():
    data = pd.read_csv('../data/dados2023.csv')
    # Processa os dados, por exemplo, somando as quantidades e ordenando
    top_products = (
        data.groupby('PRODUTO')['QT']
        .sum()
        .sort_values(ascending=False)
        .head(10)
        .reset_index()
        .to_dict(orient='records')
    )
    top_buyers = (
        data.groupby('FANTASIA')['TOTAL']
        .sum()
        .sort_values(ascending=False)
        .head(10)
        .reset_index()
        .to_dict(orient='records')
    )
    return jsonify({"top_products": top_products, "top_buyers": top_buyers})

@app.route('/api/top10/2024', methods=['GET'])
def get_top10_2024():
    data = pd.read_csv('../data/dados2024.csv')
    top_products = (
        data.groupby('PRODUTO')['QT']
        .sum()
        .sort_values(ascending=False)
        .head(10)
        .reset_index()
        .to_dict(orient='records')
    )
    top_buyers = (
        data.groupby('FANTASIA')['TOTAL']
        .sum()
        .sort_values(ascending=False)
        .head(10)
        .reset_index()
        .to_dict(orient='records')
    )
    return jsonify({"top_products": top_products, "top_buyers": top_buyers})

if __name__ == '__main__':
    app.run(debug=True)
