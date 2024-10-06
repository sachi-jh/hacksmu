import React from "react";
import { SocketProvider } from "@/components/SocketContext";
import BendDetection from "@/components/BendDetection";
import Stretch1 from "@/assets/stretch1.gif";
import Image from "next/image";

const Workout = () => {
  return (
    <div className="bg-main max-h-full rounded-2xl flex justify-between items-center">
      <div className="flex flex-col items-center">
        <h1 className="text-5xl text-white mt-6">Stretches</h1>
        <div className="ml-6">
          <SocketProvider>
            <BendDetection />
          </SocketProvider>
        </div>
      </div>
      <div className="w-6/12">
        <Image src={Stretch1} alt="hero" className="-rotate-90 mr-16" />
      </div>
    </div>
  );
};

export default Workout;
