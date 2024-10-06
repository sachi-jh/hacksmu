"use client";

// components/WebcamStream.tsx
import React, { useEffect, useRef } from "react";

interface WebcamStreamProps {
    onFrameCaptured: (dataURL: string) => void;
}

const WebcamStream: React.FC<WebcamStreamProps> = ({ onFrameCaptured }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null); // To hold the interval ID

    useEffect(() => {
        const startWebcam = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;

                    // Play video once metadata is loaded to avoid timing issues
                    videoRef.current.onloadedmetadata = () => {
                        videoRef.current?.play().catch((error) => {
                            console.error("Error playing video:", error);
                        });
                    };

                    startVideoProcessing();
                }
            } catch (error) {
                console.error("Error accessing webcam:", error);
            }
        };

        startWebcam();

        // Cleanup the stream when the component is unmounted
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach((track) => track.stop());
            }

            // Clear the interval when the component is unmounted
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const startVideoProcessing = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (video && canvas) {
            const captureFrame = () => {
                if (video.paused || video.ended) return;

                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                const context = canvas.getContext("2d");

                if (context) {
                    context.drawImage(video, 0, 0, canvas.width, canvas.height);

                    // Convert canvas image to data URL
                    const dataURL = canvas.toDataURL("image/jpeg", 0.5); // Adjust quality if needed
                    // Call the callback function with the data URL
                    onFrameCaptured(dataURL);
                }
            };

            // Set up an interval to capture frames every 200 milliseconds (adjustable)
            intervalRef.current = setInterval(captureFrame, 100); // Captures a frame every 200ms
        }
    };

    return (
        <div>
            <video
                ref={videoRef}
                style={{
                    width: "1080px",
                    height: "500px",
                    transform: "scaleX(-1)", // Flip the video horizontally
                }}
                className="my-4"
                autoPlay
                muted
            />
            <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
    );
};

export default WebcamStream;
