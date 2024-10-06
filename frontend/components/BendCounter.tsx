"use client";

// components/SquatCounter.tsx
import React from "react";

interface BendCounterProps {
  count: number;
}

const SquatCounter: React.FC<BendCounterProps> = ({ count }) => {
  return (
    <div>
      <h2 className="text-2xl">Bends Completed: {count}</h2>
    </div>
  );
};

export default SquatCounter;
