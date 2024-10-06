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
bend_counters = {}  # Dictionary to keep track of forward bend counts per client
bend_stages = {}  # Dictionary to keep track of stages for forward bend per client
is_sitting_criss_cross = {}  # Dictionary to keep track of criss-cross apple sauce status per client

@socketio.on('connect')
def handle_connect():
    print(f'Client connected: {request.sid}')
    counters[request.sid] = 0
    stages[request.sid] = None
    is_doing_stretch[request.sid] = False
    bend_counters[request.sid] = 0
    bend_stages[request.sid] = "up"  # Initialize to "up" stage
    is_sitting_criss_cross[request.sid] = False
    emit('connected', {'data': 'Connected to server'})

@socketio.on('disconnect')
def handle_disconnect():
    print(f'Client disconnected: {request.sid}')
    counters.pop(request.sid, None)
    stages.pop(request.sid, None)
    is_doing_stretch.pop(request.sid, None)
    bend_counters.pop(request.sid, None)
    bend_stages.pop(request.sid, None)
    is_sitting_criss_cross.pop(request.sid, None)

@socketio.on('video_frame')
def handle_video_frame(data):
    sid = request.sid
    # Decode the base64 image
    img_data = data.split(',')[1]
    img_bytes = base64.b64decode(img_data)
    np_img = np.frombuffer(img_bytes, np.uint8)
    frame = cv2.imdecode(np_img, cv2.IMREAD_COLOR)
    
    # Process the frame
    feedback, count, stretch_status, bend_count, criss_cross_status = process_frame(frame, sid)

    # Send feedback to the client
    emit('feedback', {'feedback': feedback, 'count': count, 'is_doing_stretch': stretch_status, 'bend_count': bend_count, 'is_sitting_criss_cross': criss_cross_status})
    

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
        stretch_status, bend_count = process_standing_forward_bend(landmarks, sid)
        is_doing_stretch[sid] = stretch_status

        # Sitting criss-cross apple sauce detection logic
        criss_cross_status = process_criss_cross_applesauce(landmarks, sid)
        is_sitting_criss_cross[sid] = criss_cross_status
    
    except Exception as e:
        print(e)
        feedback = "No person detected"
        count = counters.get(sid, 0)
        stretch_status = False
        bend_count = bend_counters.get(sid, 0)
        criss_cross_status = False

    return feedback, count, stretch_status, bend_count, criss_cross_status

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
    # Get coordinates for left hand, left foot, and knee
    left_hand = [landmarks[mp_pose.PoseLandmark.LEFT_INDEX.value].x,
                 landmarks[mp_pose.PoseLandmark.LEFT_INDEX.value].y]
    left_foot = [landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].x,
                 landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].y]
    left_knee = [landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].x,
                 landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].y]
    
    # Calculate vertical distance between left hand and left foot
    hand_to_foot_distance = np.linalg.norm(np.array(left_hand) - np.array(left_foot))
    
    # Calculate knee angle to ensure the leg is straight
    hip = [landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x,
           landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y]
    knee_angle = calculate_angle(hip, left_knee, left_foot)

    # Standing forward bend detection logic
    # If the hand is close to the foot and the leg is straight, it indicates a bend
    if hand_to_foot_distance < 0.1 and knee_angle > 160:  # Threshold values, adjust as needed
        if bend_stages[sid] == "up":
            bend_stages[sid] = "bending"
    elif hand_to_foot_distance > 0.2 and bend_stages[sid] == "bending":
        bend_stages[sid] = "up"
        bend_counters[sid] += 1
        print(f"Bend Count for {sid}: {bend_counters[sid]}")
    
    return bend_stages[sid] == "bending", bend_counters[sid]

def process_criss_cross_applesauce(landmarks, sid):
    # Get coordinates for left and right knees and ankles
    left_knee = [landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].x,
                 landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].y]
    right_knee = [landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value].x,
                  landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value].y]
    left_ankle = [landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].x,
                  landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].y]
    right_ankle = [landmarks[mp_pose.PoseLandmark.RIGHT_ANKLE.value].x,
                   landmarks[mp_pose.PoseLandmark.RIGHT_ANKLE.value].y]
    
    # Check if knees are close to each other and ankles are crossed
    knees_distance = np.linalg.norm(np.array(left_knee) - np.array(right_knee))
    ankles_distance = np.linalg.norm(np.array(left_ankle) - np.array(right_ankle))
    
    # Threshold values to determine if sitting criss-cross
    if knees_distance < 0.2 and ankles_distance < 0.2:  # Adjust thresholds as needed
        return True
    else:
        return False

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=8080, debug=True)