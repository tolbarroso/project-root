from flask import Flask
from flask_cors import CORS
from routes.ofertas import ofertas_blueprint
from routes.top10 import top10_blueprint

app = Flask(__name__)
CORS(app)  

app.register_blueprint(ofertas_blueprint)
app.register_blueprint(top10_blueprint)

if __name__ == "__main__":
    app.run(debug=True)
