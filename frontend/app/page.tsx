"use client";
import React from "react";
import Hero from "../assets/hero.gif";
import Wave from "../assets/wave.png";
import Beach from "../assets/beach.png";
import Image from "next/image";
import Clouds from "../assets/clouds.png";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { TypeAnimation } from "react-type-animation";
import Boat from "../assets/boat.png";

export default function Home() {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center">
            <motion.h1
                initial={{ opacity: 0, y: 20 }} // Start off invisible and below its final position
                animate={{ opacity: 1, y: 0 }} // Fade in, move up, and scale
                transition={{ duration: 0.75 }} // Animation duration
                className="text-gray-700 text-6xl mt-5"
            >
                Welcome to Ebby
            </motion.h1>

            <motion.h1
                initial={{ opacity: 0, y: 20 }} // Optional for the second element if you'd like a similar effect
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }} // Slight delay for a staggered effect
                className="text-gray-700 text-2xl"
            >
                Your personal health secretary.
            </motion.h1>
            <motion.div
                animate={{
                    y: [0, 150, 0], // Moves up and down continuously
                }}
                transition={{
                    opacity: { duration: 2, delay: 0.5 }, // Only animate opacity once
                    y: {
                        duration: 4.95, // Duration for the up-down movement
                        repeat: Infinity, // Loops the movement animation
                        ease: "easeInOut", // Smooth transition for movement
                    },
                }}
                className="absolute text-main text-center text-[40px] mt-72 italic h-24 flex flex-col items-center z-10 w-3/4"
            >
                <TypeAnimation
                    sequence={[
                        "Life is a series of ebbs and flows. Embrace the rhythm.",
                        3000,
                        "All things pass",
                        3000,
                        "Take care of your body. It's the only place you have to live.",
                        3000,
                        "The greatest wealth is health.",
                        3000,
                        "You can't pour from an empty cup. Take care of yourself first.",
                        3000,
                        "Healing is not linear.",
                        3000,
                        "It's not the load that breaks you down, it's the way you carry it.",
                        3000,
                    ]}
                    repeat={Infinity}
                />
                <Image src={Boat} alt="" className="h-24 w-24" />
            </motion.div>

            <div className="absolute bottom-0 flex">
                <Image src={Hero} alt="hero" width={500} height={500} />
                <Image src={Hero} alt="hero" width={500} height={500} />
                <Image src={Hero} alt="hero" width={500} height={500} />
            </div>
            <div className="absolute top-full mx-16">
                <div className="h-24"></div>
                <div className="flex">
                    <motion.div
                        className="w-96"
                        initial={{ opacity: 0, y: 50 }} // Start slightly below and invisible
                        whileInView={{ opacity: 1, y: 0 }} // Fade in and move up when in view
                        transition={{ duration: 2, delay: 1 }} // Adjust duration for a smoother effect
                        viewport={{ once: false }} // Animates only once when it comes into view
                    >
                        <Image
                            className="mt-48 rounded-2xl object-cover w-full"
                            src={Wave}
                            alt=""
                            width={500}
                        />
                    </motion.div>

                    <div className="w-1/6"></div>

                    <motion.div
                        className="w-96"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 2, delay: 0.5 }} // Delay for a staggered effect
                        viewport={{ once: false }} // Ensures animation happens only once
                    >
                        <Image
                            className="mt-24 rounded-2xl object-cover w-full"
                            src={Clouds}
                            alt=""
                            width={500}
                        />
                    </motion.div>

                    <div className="w-1/6"></div>

                    <motion.div
                        className="w-96"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 2 }}
                        viewport={{ once: false }} // Ensures animation happens only once
                    >
                        <Image
                            className="rounded-2xl object-cover w-full"
                            src={Beach}
                            alt=""
                            width={500}
                        />
                    </motion.div>
                </div>
                <h1 className="ml-24 mt-24 font-semibold text-3xl">
                    What is Ebby exactly?
                </h1>
                <h1 className="mx-36 mt-5 text-xl">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Labore dolorum nostrum nam accusamus iusto cum animi
                    repudiandae voluptatem necessitatibus alias perspiciatis
                    temporibus atque obcaecati adipisci sunt et, iure error?
                    Repudiandae, molestiae! Ducimus eligendi culpa corrupti
                    quasi, eveniet excepturi facilis fugiat ipsam similique
                    sunt. Placeat eaque impedit quibusdam commodi perferendis
                    corrupti, dolorum nam magnam, maxime dignissimos, quod qui
                    nesciunt nihil. Saepe sed atque aut fugiat consectetur eius
                    ratione hic natus aperiam! Nostrum maxime placeat cum.
                    Dolore nam minima quas vel, et sapiente, perferendis
                    corrupti laborum ea hic labore dolor iste soluta! Vitae sit
                    harum nihil, reprehenderit quidem cum vel, minima
                    consequatur recusandae ipsa, aliquid praesentium pariatur
                    mollitia cupiditate sed. Dolores dolor fugiat nisi placeat
                    nulla excepturi, suscipit consequuntur repellendus eveniet
                    reiciendis. Itaque repellat, suscipit illum dolorem porro
                    nostrum aut quia corporis exercitationem corrupti laboriosam
                    ut iure accusamus minus dignissimos obcaecati omnis, optio
                    vel unde voluptas delectus deleniti! Consequuntur
                    repellendus culpa sequi quod tenetur, accusamus odio aliquid
                    perspiciatis iusto explicabo sunt nam? Inventore unde esse
                    similique qui cumque vel eligendi nulla nobis consequatur
                    iure soluta illo rem error, sequi doloremque animi fuga
                    numquam delectus maiores, sit excepturi facere! Tempore
                    corporis, quas ad modi sequi error iusto, vitae neque cumque
                    necessitatibus explicabo alias.
                </h1>
                <div className="flex justify-center">
                    <motion.button
                        whileHover={{ scale: 1.1 }} // Scale up on hover
                        whileTap={{ scale: 0.9 }} // Scale down on click
                        onClick={() => {
                            router.push("https://4525409.propelauthtest.com/");
                        }}
                        className="rounded-2xl mt-10 px-3 py-2 text-main hover:bg-main hover:text-white text-3xl font-semibold"
                    >
                        Get started
                    </motion.button>
                </div>
                <div className="h-24"></div>
            </div>
        </div>
    );
}
