from flask import Flask
from .ofertas import ofertas_blueprint
from .top10 import top10_blueprint

def create_app():
    app = Flask(__name__)
    app.register_blueprint(ofertas_blueprint)
    app.register_blueprint(top10_blueprint)
    return app
