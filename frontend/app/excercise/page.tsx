"use client";

import React from "react";
import { Tilt } from "react-tilt";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Boat from "@/assets/boat-exercise.png";
import Image from "next/image";
import Box from "@/assets/box.png";

const defaultOptions = {
  reverse: false, // reverse the tilt direction
  max: 35, // max tilt rotation (degrees)
  perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1.1, // 2 = 200%, 1.5 = 150%, etc..
  speed: 1000, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
};

const GetStarted = () => {
  return (
    <div className="flex mt-12 justify-evenly min-h-screen">
      <div className="absolute left-0 w-full h-1/2 bg-white" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[#3e586c] " />
      <Image
        src={Box}
        alt="box"
        className="absolute bottom-0 left-0 w-full h-1/2"
        style={{ width: "100px", height: "75px" }}
      />
      <Tilt
        options={defaultOptions}
        style={{ height: 350, width: 300 }}
        className="bg-main rounded-2xl shadow-2xl opacity-80 mt-20 text-opacity-100"
      >
        <div className="mt-10 space-y-3 px-7">
          <h1 className="text-4xl text-white">Breathe</h1>
          <p className="text-black text-lg">
            Deep breathing helps calm the nervous system, reducing stress and
            anxiety. It improves focus and enhances overall mental clarity and
            emotional balance.
          </p>
          <Link href="/excercise/breathe">
            <Button
              variant={"secondary"}
              className="text-1xl rounded-2xl absolute bottom-5 left-5 "
            >
              Start
            </Button>
          </Link>
        </div>
      </Tilt>

      <Tilt
        options={defaultOptions}
        style={{ height: 350, width: 300 }}
        className="bg-main rounded-2xl shadow-2xl opacity-80 mt-20 text-opacity-100"
      >
        <div className="mt-10 space-y-3 px-7">
          <h1 className="text-4xl text-white ">Stretch</h1>
          <p className="text-black ">
            Stretching releases muscle tension, increases flexibility, and
            enhances circulation. It can improve mood and relieve stress,
            promoting a relaxed state of mind.
          </p>
          <Link href="/excercise/stretch">
            <Button
              variant={"secondary"}
              className="text-1xl rounded-2xl absolute bottom-5 left-5"
            >
              Start
            </Button>
          </Link>
        </div>
      </Tilt>

      <Tilt
        options={defaultOptions}
        style={{ height: 350, width: 300 }}
        className="bg-main rounded-2xl shadow-2xl opacity-80 mt-20 text-opacity-100"
      >
        <div className="mt-10 space-y-3 px-7">
          <h1 className="text-4xl text-white">Workout</h1>
          <p className="text-black ">
            Exercise boosts endorphins, the body's natural mood lifters. Regular
            physical activity reduces symptoms of anxiety and depression,
            enhancing overall emotional well-being and resilience.
          </p>
          <Link href="/excercise/workout">
            <Button
              variant={"secondary"}
              className="text-1xl rounded-2xl absolute bottom-5 left-5"
            >
              Start
            </Button>
          </Link>
        </div>
      </Tilt>

      <Image
        src={Boat}
        alt="boat"
        className="absolute bottom-1 left-1/4 transform -translate-x-1/2 z-0"
        style={{ width: "325px" }} // Optional: Adjust size as needed
      />
      <Image
        src={Boat}
        alt="boat"
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-0"
        style={{ width: "325px" }} // Optional: Adjust size as needed
      />
      <Image
        src={Boat}
        alt="boat"
        className="absolute bottom-5 left-3/4 transform -translate-x-1/2 z-0"
        style={{ width: "325px" }} // Optional: Adjust size as needed
      />
    </div>
  );
};

export default GetStarted;
