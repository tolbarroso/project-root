from flask import Blueprint, jsonify, abort
from utils import get_data

top10_blueprint = Blueprint('top10', __name__)

@top10_blueprint.route('/api/top10/<int:year>', methods=['GET'])
def get_top10(year):
    file_path = f'data/dados{year}.csv'
    try:
        data = get_data(file_path)
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
    except FileNotFoundError:
        abort(404, description=f'Dados para o ano {year} não encontrados.')
