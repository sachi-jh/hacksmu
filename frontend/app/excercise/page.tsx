"use client";

import React from "react";
import { Tilt } from "react-tilt";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
    <div className="flex h-1/2 mt-12 justify-evenly min-h-screen">
      <Tilt
        options={defaultOptions}
        style={{ height: 350, width: 300 }}
        className="bg-main rounded-2xl shadow-2xl opacity-70"
      >
        <div className="mt-10 space-y-3 px-7">
          <h1 className="text-4xl text-white">Breathe</h1>
          <p className="text-black">
            Deep breathing helps calm the nervous system, reducing stress and
            anxiety. It improves focus and enhances overall mental clarity and
            emotional balance.
          </p>
          <div className="">
            <Link href="/excercise/breathe">
              <Button variant={"secondary"} className="text-1xl rounded-2xl ">
                Start
              </Button>
            </Link>
          </div>
        </div>
      </Tilt>
      <Tilt
        options={defaultOptions}
        style={{ height: 350, width: 300 }}
        className="bg-main rounded-2xl shadow-2xl opacity-70"
      >
        <div className="mt-10 space-y-3 px-7">
          <h1 className="text-4xl text-white">Stretch</h1>
          <p className="text-black">
            Stretching releases muscle tension, increases flexibility, and
            enhances circulation. It can improve mood and relieve stress,
            promoting a relaxed state of mind.
          </p>
          <div className="">
            <Link href="/excercise/stretch">
              <Button variant={"secondary"} className="text-1xl rounded-2xl">
                Start
              </Button>
            </Link>
          </div>
        </div>
      </Tilt>
      <Tilt
        options={defaultOptions}
        style={{ height: 350, width: 300 }}
        className="bg-main rounded-2xl shadow-2xl opacity-70"
      >
        <div className="mt-10 space-y-3 px-7">
          <h1 className="text-4xl text-white">Workout</h1>
          <p className="text-black">
            Exercise boosts endorphins, the body's natural mood lifters. Regular
            physical activity reduces symptoms of anxiety and depression,
            enhancing overall emotional well-being and resilience.
          </p>
          <div className="">
            <Link href="/excercise/workout">
              <Button variant={"secondary"} className="text-1xl rounded-2xl">
                Start
              </Button>
            </Link>
          </div>
        </div>
      </Tilt>
    </div>
  );
};

export default GetStarted;