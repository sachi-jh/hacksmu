"use client";

// components/ExerciseDetection.tsx
import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "./SocketContext";
import WebcamStream from "./WebcamStreamCapture";
import SquatCounter from "./SquatCounter";

const ExerciseDetection: React.FC = () => {
  const { socket } = useContext(SocketContext);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (socket) {
      socket.on("feedback", (data: any) => {
        // You can also handle 'feedback' messages if needed
        setCount(data.count);
      });
    }

    // Cleanup on component unmount
    return () => {
      if (socket) {
        socket.off("feedback");
      }
    };
  }, [socket]);

  const handleFrameCaptured = (dataURL: string) => {
    if (!socket) {
      console.error("Socket not connected yet");
      return;
    }
    console.log("Emitting video frame");
    socket.emit("video_frame", dataURL);
  };

  if (!socket) {
    return <div>Connecting to server...</div>; // Show a loading state while the socket is being initialized
  }

  return (
    <div className="absolute mt-2 left-1/2 transform -translate-x-1/2  w-[640px] h-[480px]">
      <WebcamStream onFrameCaptured={handleFrameCaptured} />
      <div>
        <SquatCounter count={count} />
      </div>
    </div>
  );
};

export default ExerciseDetection;
