"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Groups() {
    const router = useRouter();
    return (
        <div>
            <div className="flex items-center gap-8">
                <h1 className="text-2xl">
                    Fill out questionaire for group assignment:
                </h1>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="hover:bg-main hover:text-white py-2 px-3 rounded-3xl text-2xl text-main"
                    onClick={() => {
                        router.push("/questionaire");
                    }}
                >
                    Questionaire
                </motion.button>
            </div>
            <h1 className="text-3xl font-bold mt-24">Support Groups</h1>
            {/* Support groups */}
        </div>
    );
}
