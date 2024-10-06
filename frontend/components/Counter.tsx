"use client";

import { useEffect, useState } from "react";

interface CounterProps {
  seconds: number;
}

const Counter: React.FC<CounterProps> = ({ seconds }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    // If timeLeft is greater than 0, start the countdown
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000); // Decrement by 1 every second

      // Cleanup interval on component unmount or when timer finishes
      return () => clearInterval(timerId);
    }
  }, [timeLeft]);

  return (
    <div className="flex justify-center mt-5">
      <div className="text-5xl text-white">
        {timeLeft > 0 ? `${timeLeft}s` : "Time's up!"}
      </div>
    </div>
  );
};

export default Counter;
