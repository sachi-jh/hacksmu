from flask import Flask, request
from flask_socketio import SocketIO, emit
import cv2
import mediapipe as mp
import numpy as np
import base64

app = Flask(__name__)
app.config['SECRET_KEY'] = 'saodhfpeyy48390fijd'  # Replace with a secure secret key
socketio = SocketIO(app, cors_allowed_origins='http://localhost:3000', async_mode='eventlet')

def calculate_angle(a, b, c):
    a = np.array(a)  # First point (e.g., hip)
    b = np.array(b)  # Middle point (e.g., knee)
    c = np.array(c)  # End point (e.g., ankle)

    radians = np.arctan2(c[1]-b[1], c[0]-b[0]) - \
              np.arctan2(a[1]-b[1], a[0]-b[0])
    angle = np.abs(radians*180.0/np.pi)

    if angle > 180.0:
        angle = 360 - angle

    return angle

# Initialize MediaPipe Pose
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(min_detection_confidence=0.5,
                    min_tracking_confidence=0.5)

# Initialize variables
counters = {}  # Dictionary to keep track of squat counts per client
stages = {}    # Dictionary to keep track of stages per client
is_doing_stretch = {}  # Dictionary to keep track of standing forward bend status per client

@socketio.on('connect')
def handle_connect():
    print(f'Client connected: {request.sid}')
    counters[request.sid] = 0
    stages[request.sid] = None
    is_doing_stretch[request.sid] = False
    emit('connected', {'data': 'Connected to server'})

@socketio.on('disconnect')
def handle_disconnect():
    print(f'Client disconnected: {request.sid}')
    counters.pop(request.sid, None)
    stages.pop(request.sid, None)
    is_doing_stretch.pop(request.sid, None)

@socketio.on('video_frame')
def handle_video_frame(data):
    sid = request.sid
    # Decode the base64 image
    img_data = data.split(',')[1]
    img_bytes = base64.b64decode(img_data)
    np_img = np.frombuffer(img_bytes, np.uint8)
    frame = cv2.imdecode(np_img, cv2.IMREAD_COLOR)
    
    # Process the frame
    feedback, count, stretch_status = process_frame(frame, sid)

    # Send feedback to the client
    emit('feedback', {'feedback': feedback, 'count': count, 'is_doing_stretch': stretch_status})

def process_frame(frame, sid):
    # Recolor image to RGB
    image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    image.flags.writeable = False

    # Make detection
    result = pose.process(image)

    # Extract landmarks
    try:
        landmarks = result.pose_landmarks.landmark

        # Squat detection logic
        feedback, count = process_squat(landmarks, sid)
        
        # Standing forward bend detection logic
        stretch_status = process_standing_forward_bend(landmarks, sid)
        is_doing_stretch[sid] = stretch_status
    
    except Exception as e:
        print(e)
        feedback = "No person detected"
        count = counters.get(sid, 0)
        stretch_status = False

    return feedback, count, stretch_status

def process_squat(landmarks, sid):
    # Get coordinates for left leg
    hip = [landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x,
           landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y]
    knee = [landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].x,
            landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].y]
    ankle = [landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].x,
             landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].y]

    # Calculate knee angle
    knee_angle = calculate_angle(hip, knee, ankle)

    # Squat counter logic
    if knee_angle > 160:
        stages[sid] = "up"
    if knee_angle < 90 and stages[sid] == 'up':
        stages[sid] = "down"
        counters[sid] += 1
        print(f"Squat Count for {sid}: {counters[sid]}")

    feedback = f"Knee Angle: {int(knee_angle)}"
    count = counters[sid]

    return feedback, count

def process_standing_forward_bend(landmarks, sid):
    # Get coordinates for hips and ankles
    hip = [landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x,
           landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y]
    ankle = [landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].x,
             landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].y]
    
    # Calculate vertical distance between hip and ankle
    vertical_distance = hip[1] - ankle[1]

    # Standing forward bend detection logic
    # If the hip is close to the ankle vertically, it indicates a bend
    if vertical_distance < 0.2:  # Threshold value, adjust as needed
        return True
    else:
        return False

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=8080, debug=True)