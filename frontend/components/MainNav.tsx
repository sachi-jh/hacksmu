"use client";
import React from "react";
import MainNavLinks from "./MainNavLinks";
import logo from "../assets/logo.png";
import Image from "next/image";
import { motion } from "framer-motion";
import { Scale } from "lucide-react";
import { useRouter } from "next/navigation";

const MainNav = () => {
  const router = useRouter();
  return (
    <div className="flex justify-between">
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image src={logo} alt="Logo" width={50} height={25} />
      </motion.div>

      <div className="flex items-center gap-4">
        <MainNavLinks />
      </div>
    </div>
  );
};

export default MainNav;
