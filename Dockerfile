FROM python:3.8-slim AS backend
WORKDIR /app
COPY ./backend /app
COPY ./data /app/data
RUN pip install -r requirements.txt

FROM node:14 AS frontend
WORKDIR /app
COPY ./frontend /app
RUN npm install && npm run build

FROM backend AS final
COPY --from=frontend /app/build /app/frontend
CMD ["python", "app.py"]
