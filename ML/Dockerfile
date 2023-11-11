# Выкачиваем из dockerhub образ с python версии 3.9
FROM python:3.9-alpine3.17
# Устанавливаем рабочую директорию для проекта в контейнере
WORKDIR /ml
# Скачиваем/обновляем необходимые библиотеки для проекта 
COPY requirements.txt /ml
RUN apt-get install -y libgl1-mesa-dev
RUN apt-get update && apt-get install ffmpeg libsm6 libxext6  -y
RUN pip install -r requirements.txt
COPY . /ml
# Устанавливаем порт, который будет использоваться для сервера
EXPOSE 5000
