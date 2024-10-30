from flask import Flask
from routes.top10 import top10_blueprint
from routes.ofertas import ofertas_blueprint

app = Flask(__name__)
app.register_blueprint(top10_blueprint)
app.register_blueprint(ofertas_blueprint)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
