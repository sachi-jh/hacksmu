"use client";

// components/ExerciseDetection.tsx
import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "./SocketContext";
import WebcamStream from "./WebcamStreamCapture";
import SquatCounter from "./SquatCounter";
import BendCounter from "./BendCounter";
import Link from "next/link";
import { Button } from "./ui/button";

const BendDetection: React.FC = () => {
  const { socket } = useContext(SocketContext);
  const [bendCount, setBendCount] = useState(0);

  useEffect(() => {
    if (socket) {
      socket.on("feedback", (data: any) => {
        console.log(data);
        // You can also handle 'feedback' messages if needed
        setBendCount(data.bend_count);
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
    <div>
      <WebcamStream onFrameCaptured={handleFrameCaptured} />
      <div>
        <BendCounter count={bendCount} />
      </div>
      {bendCount >= 5 && (
        <Link href="/excercise/workout">
          <div className="flex justify-center">
            <Button
              variant={"secondary"}
              className="rounded-2xl text-4xl px-5 py-4 mb-5"
            >
              Next
            </Button>
          </div>
        </Link>
      )}
    </div>
  );
};

export default BendDetection;
