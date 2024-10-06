import React from "react";
import Link from "next/link";
import Image from "next/image";
import Gyatt from "@/assets/56010-gyatt.png";

const Gyat = () => {
  return (
    <Link href={"/"}>
      <Image src={Gyatt} alt="GYATTTT" className="hover:scale-150" />
      <h1 className="text-9xl">YOU'VE GYATT TO BE KIDDING ME</h1>
    </Link>
  );
};

export default Gyat;
