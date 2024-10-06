"use client"; // For Next.js if needed

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Counter from "./Counter";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const BreathingCircle: React.FC = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Set a timer to show the button after 10 seconds (10,000 milliseconds)
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 10000);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Scroll to the bottom or the desired section on page load
    window.scrollTo({
      top: document.body.scrollHeight, // Scroll to the bottom of the page
      behavior: "smooth", // Enables smooth scrolling
    });
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <section id="scroll-target">
      <div className="flex justify-center items-center h-screen">
        <motion.div
          className="relative flex justify-center items-center"
          initial={{ scale: 0.9 }}
          animate={{ scale: [0.9, 1.2, 0.9] }}
          transition={{
            duration: 4, // Simulate slow inhale/exhale for relaxation
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          {/* Breathing Circle */}
          <motion.div
            className="w-80 h-80 bg-main rounded-full flex items-center justify-center"
            style={{ boxShadow: "0 0 40px rgba(136, 183, 205)" }} // Increase shadow size too
          >
            <div className="text-center z-10">
              <h1 className="text-3xl">Breathe</h1>
              <Counter seconds={10} />
              {showButton ? (
                <Link href="/excercise/stretch">
                  <Button
                    variant={"secondary"}
                    className="text-xl rounded-xl mt-8 cursor-pointer"
                  >
                    Stretch
                  </Button>
                </Link>
              ) : (
                <p></p>
              )}
            </div>

            {/* Larger text */}
          </motion.div>

          {/* Outer Waves */}
          <motion.div
            className="absolute w-96 h-96 rounded-full border-4 border-blue-300"
            initial={{ scale: 0.9, opacity: 0.5 }}
            animate={{ scale: [1.0, 1.3], opacity: [0.5, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "loop",
            }}
          ></motion.div>
          <motion.div
            className="absolute w-[30rem] h-[30rem] rounded-full border-4 border-blue-200"
            initial={{ scale: 0.9, opacity: 0.5 }}
            animate={{ scale: [1.1, 1.4], opacity: [0.5, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "loop",
            }}
          ></motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BreathingCircle;
