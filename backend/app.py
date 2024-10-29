import os
from flask import Flask, jsonify, abort
import pandas as pd

app = Flask(__name__)

def get_data(file_path):
    if not os.path.exists(file_path):
        abort(404, description=f'Arquivo {file_path} não encontrado')
    return pd.read_csv(file_path)

@app.route('/api/top10/2023', methods=['GET'])
def get_top10_2023():
    data = get_data('../data/dados2023.csv')
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
    data = get_data('../data/dados2024.csv')
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
