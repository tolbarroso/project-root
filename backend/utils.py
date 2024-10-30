import pandas as pd
import os

def get_data(file_path):
    """Carrega os dados de um arquivo CSV especificado."""
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Arquivo {file_path} não encontrado.")
    return pd.read_csv(file_path)
