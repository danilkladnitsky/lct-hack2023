import cv2
import numpy as np
import base64

def image_to_base64(image_path):
    # Read the image using OpenCV
    with open(image_path, "rb") as image_file:
        img_data = image_file.read()
        img_np = cv2.imdecode(
            np.frombuffer(img_data, np.uint8), cv2.IMREAD_COLOR
        )

    # Convert the image to base64
    _, img_encoded = cv2.imencode(".png", img_np)
    base64_string = base64.b64encode(img_encoded.tobytes()).decode("utf-8")

    return base64_string

def base64_to_image(base64_string):
    # Decode the base64 string
    img_data = base64.b64decode(base64_string)

    # Convert the binary data to a NumPy array
    img_np = np.frombuffer(img_data, np.uint8)

    # Decode the NumPy array into an image
    img = cv2.imdecode(img_np, cv2.IMREAD_COLOR)

    return img