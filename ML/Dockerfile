# Выкачиваем из dockerhub образ с python версии 3.9
FROM python:3.9-alpine3.17
# Устанавливаем рабочую директорию для проекта в контейнере
WORKDIR /ml
# Скачиваем/обновляем необходимые библиотеки для проекта 
COPY requirements.txt /ml
RUN pip install -r requirements.txt
COPY . /ml
# Устанавливаем порт, который будет использоваться для сервера
EXPOSE 5000
