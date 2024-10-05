import cv2
import mediapipe as mp
import numpy as np

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
mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose

# Start capturing video from webcam
cap = cv2.VideoCapture(0)

# Initialize variables
counter = 0
stage = None  # Indicates whether the user is in the 'up' or 'down' position

with mp_pose.Pose(min_detection_confidence=0.5,
                  min_tracking_confidence=0.5) as pose:
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        # Recolor image to RGB
        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        image.flags.writeable = False

        # Make detection
        result = pose.process(image)

        # Recolor back to BGR
        image.flags.writeable = True
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

        # Extract landmarks
        try:
            landmarks = result.pose_landmarks.landmark

            # Get coordinates for left leg
            hip = [landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x,
                   landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y]
            knee = [landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].x,
                    landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].y]
            ankle = [landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].x,
                     landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].y]

            # Calculate knee angle
            knee_angle = calculate_angle(hip, knee, ankle)

            # Visualize angle
            cv2.putText(image, str(int(knee_angle)),
                        tuple(np.multiply(knee, [640, 480]).astype(int)),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)

            # Squat counter logic
            if knee_angle > 160:
                stage = "up"
            if knee_angle < 90 and stage == 'up':
                stage = "down"
                counter += 1
                print(f"Squat Count: {counter}")

        except Exception as e:
            print(e)
            pass

        # Render squat count on frame
        cv2.rectangle(image, (0, 0), (225, 73), (245, 117, 16), -1)

        cv2.putText(image, 'SQUATS', (15, 12),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 1, cv2.LINE_AA)
        cv2.putText(image, str(counter),
                    (10, 60),
                    cv2.FONT_HERSHEY_SIMPLEX, 2, (255, 255, 255), 2, cv2.LINE_AA)

        # Render detections
        mp_drawing.draw_landmarks(
            image, result.pose_landmarks, mp_pose.POSE_CONNECTIONS,
            mp_drawing.DrawingSpec(color=(245, 117, 66),
                                   thickness=2, circle_radius=2),
            mp_drawing.DrawingSpec(color=(245, 66, 230),
                                   thickness=2, circle_radius=2)
        )

        # Display the frame
        cv2.imshow('Squat Counter', image)

        if cv2.waitKey(10) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()
