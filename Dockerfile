# Base para o backend
FROM python:3.8-slim AS backend

WORKDIR /app
COPY ./backend /app
COPY ./data /app/data

RUN pip install -r requirements.txt

# Base para o frontend
FROM node:14 AS frontend

WORKDIR /app
COPY ./frontend /app

RUN npm install
RUN npm run build

# Copiar arquivos de build frontend para o backend
FROM backend AS final

COPY --from=frontend /app/build /app/frontend

CMD ["python", "app.py"]
