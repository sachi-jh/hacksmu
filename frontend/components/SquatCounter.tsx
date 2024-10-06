"use client";

// components/SquatCounter.tsx
import React from "react";

interface SquatCounterProps {
  count: number;
}

const SquatCounter: React.FC<SquatCounterProps> = ({ count }) => {
  return (
    <div>
      <h2 className="text-5xl text-white text-center mb-4">Squats Completed: {count}</h2>
      </div>
  );
};

export default SquatCounter;
