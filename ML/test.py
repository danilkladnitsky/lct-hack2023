import cv2 as cv
import numpy as np
import base64_covertion



# img = cv.imread("D:/OPEN CV/YOLOV object detection/room_ser.jpg")
img = base64_covertion.image_to_base64("2.png")
# print(img)
# img = base64_covertion.base64_to_image(img)

import requests
import json

# URL сервера Flask
url = 'http://127.0.0.1:5000/process_base64'

# Данные для отправки
data_to_send = {
    'base64_string': img,
}

# Отправка POST-запроса на сервер Flask
response = requests.post(url, json=data_to_send)

# Печать ответа от сервера
print('Response from Flask Server:')
print('Status Code:', response.status_code)
print('Response JSON:', response.json())