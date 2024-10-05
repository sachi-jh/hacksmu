"use client";
import React from "react";
import { getUser } from "@propelauth/nextjs/server/app-router";
import Hero from "../assets/hero.gif";
import Wave from "../assets/wave.png";
import Beach from "../assets/beach.png";
import Image from "next/image";
import { motion } from "framer-motion";
const Home = async () => {
    const user = await getUser();

    return (
        <div className="flex flex-col items-center justify-center">
            <motion.h1
                animate={{ scale: 2, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-gray-700 text-6xl"
            >
                Welcome to Ebby
            </motion.h1>
            <motion.h1 className="text-gray-700 text-2xl">
                Your personal health secretary.
            </motion.h1>
            <div className="absolute bottom-0 flex">
                <Image src={Hero} alt="hero" width={500} height={500} />
                <Image src={Hero} alt="hero" width={500} height={500} />
                <Image src={Hero} alt="hero" width={500} height={500} />
            </div>
            <motion.div className="">
                <Image className="rounded-3xl" src={Wave} alt="" width={300} />
            </motion.div>
            <motion.div className="">
                <Image className="rounded-3xl" src={Beach} alt="" width={300} />
            </motion.div>
        </div>
    );
};

export default Home;
