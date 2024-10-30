from flask import Blueprint, jsonify

ofertas_blueprint = Blueprint('ofertas', __name__)

@ofertas_blueprint.route('/api/ofertas', methods=['GET'])
def get_ofertas():
    # Exemplo de dados de ofertas
    ofertas = [
        {"produto": "Vinho Tinto Malbec", "preco": 49.90},
        {"produto": "Vinho Branco Chardonnay", "preco": 39.90},
        {"produto": "Espumante Brut", "preco": 59.90},
    ]
    return jsonify(ofertas)
