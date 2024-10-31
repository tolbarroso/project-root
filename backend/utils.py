import pandas as pd

# Carregar dados de ambas as planilhas
def load_data():
    data_2023 = pd.read_csv('../data/dados2023.csv')
    data_2024 = pd.read_csv('../data/dados2024.csv')
    data = pd.concat([data_2023, data_2024], ignore_index=True)
    return data

# Função para aplicar filtros nos dados
def filter_data(data, filters):
    for key, value in filters.items():
        if value:
            if key in ["dtInicio", "dtFim"]:
                date_column = 'DTFAT'
                if key == "dtInicio":
                    data = data[data[date_column] >= value]
                elif key == "dtFim":
                    data = data[data[date_column] <= value]
            else:
                data = data[data[key].astype(str) == value]
    return data.to_dict(orient="records")
