// pages/index.tsx
import React from "react";
import { SocketProvider } from "@/components/SocketContext";
import ExerciseDetection from "@/components/ExerciseDetection";

const HomePage: React.FC = () => {
  return (
    <SocketProvider>
      <div style={{ textAlign: "center" }}>
        <h1 className="text-2xl">Squat Counter</h1>
        <ExerciseDetection />
      </div>
    </SocketProvider>
  );
};

export default HomePage;
