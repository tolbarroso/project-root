from flask import Flask, jsonify
from flask_cors import CORS
from routes.top10 import top10_routes

app = Flask(__name__)
CORS(app)

# Registra as rotas
app.register_blueprint(top10_routes)

@app.route('/')
def home():
    return jsonify({"message": "Backend funcionando!"})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
