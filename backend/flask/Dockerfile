# Используем официальный образ Python
FROM python:3.9-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы requirements.txt и устанавливаем зависимости
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Копируем все остальные файлы приложения
COPY . .

# Открываем порт, на котором будет работать приложение
EXPOSE 5000

# Запускаем приложение
CMD ["gunicorn", "--bind", "0.0.0.0:80", "app:app"]
