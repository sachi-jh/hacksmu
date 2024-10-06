"use client";

// components/SquatCounter.tsx
import React from "react";

interface BendCounterProps {
  count: number;
}

const SquatCounter: React.FC<BendCounterProps> = ({ count }) => {
  return (
    <div>
      <h2 className="text-5xl text-white text-center mb-4">Bends Completed: {count}</h2>
    </div>
  );
};

export default SquatCounter;
