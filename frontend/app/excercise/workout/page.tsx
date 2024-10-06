import React from "react";
import { SocketProvider } from "@/components/SocketContext";
import ExerciseDetection from "@/components/ExerciseDetection";

const Workout = () => {
  return (
    <div>
      <SocketProvider>
        <div style={{ textAlign: "center" }}>
          <h1 className="text-2xl">Squat Counter</h1>
          <ExerciseDetection />
        </div>
      </SocketProvider>
    </div>
  );
};

export default Workout;
