"use client";

// components/SquatCounter.tsx
import React from "react";

interface SquatCounterProps {
  count: number;
}

const SquatCounter: React.FC<SquatCounterProps> = ({ count }) => {
  return (
    <div>
      <h2 className="text-2xl">Squats Completed: {count}</h2>
    </div>
  );
};

export default SquatCounter;
