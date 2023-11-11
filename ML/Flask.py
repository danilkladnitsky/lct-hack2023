from flask import Flask, request, jsonify
import base64_covertion
import street_detect
import configparser
import cv2 as cv
from pathlib import Path
app = Flask(__name__)


@app.route('/process_base64', methods=['POST'])
def hello_world():

    try:
        data = request.get_json()
        config = configparser.ConfigParser()
        config.read("config.ini")

        # Получаем строку base64 из данных
        base64_string = data.get('base64_string', '')
        img = base64_covertion.base64_to_image(base64_string)

        names, boxes = street_detect.street_detect(img,
                                                     str(Path(config.get("Model", "yolov8_model_path"))),
                                                     str(Path(config.get("Model", "score_limit"))),
                                                     str(Path(config.get("Model", "device"))))

        result = {
            'names': names,
            'boxes': boxes
        }


        return jsonify(result)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)