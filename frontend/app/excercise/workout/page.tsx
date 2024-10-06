import React from "react";
import { SocketProvider } from "@/components/SocketContext";
import SquatDetection from "@/components/SquatDetection";
import Stretch1 from "@/assets/stretch1.gif";
import Image from "next/image";

const Workout = () => {
  return (
    <div className="bg-main flex">
      <div className="bg-transparent w-3/4">
        <SocketProvider>
          <div style={{ textAlign: "center" }}>
            <h1 className="text-2xl">Squat Counter</h1>
            <SquatDetection />
          </div>
        </SocketProvider>
      </div>
      <div className="w-1/4">
        <Image src={Stretch1} alt="hero" width={200} height={200} />
      </div>
    </div>
  );
};

export default Workout;
