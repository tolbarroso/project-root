from flask import Flask, jsonify, request
from utils import load_data, filter_data

app = Flask(__name__)

@app.route('/api/data', methods=['GET'])
def get_filtered_data():
    filters = request.args.to_dict()
    data = load_data()
    filtered_data = filter_data(data, filters)
    return jsonify(filtered_data)
