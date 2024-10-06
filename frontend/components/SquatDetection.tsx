"use client";

// components/ExerciseDetection.tsx
import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "./SocketContext";
import WebcamStream from "./WebcamStreamCapture";
import SquatCounter from "./SquatCounter";
import Link from "next/link";
import { Button } from "./ui/button";

const SquatDetection: React.FC = () => {
  const { socket } = useContext(SocketContext);
  const [squatCount, setSquatCount] = useState(0);

  useEffect(() => {
    if (socket) {
      socket.on("feedback", (data: any) => {
        console.log(data);
        // You can also handle 'feedback' messages if needed
        setSquatCount(data.count);
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
    <div className=" rounded-2xl">
      <WebcamStream onFrameCaptured={handleFrameCaptured} />
      <div>
        <SquatCounter count={squatCount} />
      </div>
      {squatCount >= 3 && (
        <Link href="/excercise">
          <div className="flex justify-center">
            <Button
              variant={"secondary"}
              className="rounded-2xl text-4xl px-5 py-4 mb-5"
            >
              Finished
            </Button>
          </div>
        </Link>
      )}
    </div>
  );
};

export default SquatDetection;
