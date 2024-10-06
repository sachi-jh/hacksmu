import React from "react";
import { SocketProvider } from "@/components/SocketContext";
import SquatDetection from "@/components/SquatDetection";
import Squat from "@/assets/squat.gif";
import Image from "next/image";

const Workout = () => {
    return (
        <div className="bg-main max-h-full rounded-2xl flex justify-between items-center">
            <div className="flex flex-col items-center">
                <h1 className="text-5xl text-white mt-6">Stretch Counter</h1>
                <div className="ml-6">
                    <SocketProvider>
                        <SquatDetection />
                    </SocketProvider>
                </div>
            </div>
            <div className="w-6/12">
                <Image src={Squat} alt="hero" className="mr-16 transform scale-x-[-1]" />
            </div>
        </div>
    );
};

export default Workout;
