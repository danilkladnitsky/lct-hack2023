from sahi.utils.yolov8 import download_yolov8n_model
from IPython.display import Image
import ultralytics
from sahi import AutoDetectionModel
from sahi.predict import get_sliced_prediction
from sahi.utils.yolov8 import download_yolov8m_model



def street_detect( img ,yolov8_model_path, score_limit, device = 'cpu'):
    score_limit = float(score_limit)
    # Download YOLOv8 model
    yolov8_model_path = yolov8_model_path
    download_yolov8n_model(yolov8_model_path)


    detection_model = AutoDetectionModel.from_pretrained(
        model_type='yolov8',
        model_path=yolov8_model_path,
        confidence_threshold=0.3,
        device=device,  # or 'cuda:0'
    )

    result = get_sliced_prediction(
        img,
        detection_model,
        slice_height=640,
        slice_width=640,
        overlap_height_ratio=0.2,
        overlap_width_ratio=0.2
    )

    name_list = []
    box_list = []
    object_prediction_list = result.object_prediction_list
    print(object_prediction_list)

    for prediction in result.object_prediction_list:
        if prediction.score.value >score_limit:
            box_list.append([[prediction.bbox.maxx, prediction.bbox.maxy], [prediction.bbox.minx, prediction.bbox.miny]])
            name_list.append(prediction.category.name)
            print('Box', [[prediction.bbox.maxx, prediction.bbox.maxy], [prediction.bbox.minx, prediction.bbox.miny]])
            print('Name', prediction.category.name)
    return name_list, box_list