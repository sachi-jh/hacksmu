import React from "react";
import Stretch1 from "@/assets/stretch1.gif";
import Image from "next/image";

const Stretch = () => {
  return (
    <div className="bg-main flex">
      <div className="bg-black w-1/2">Hello</div>
      <div className="w-1/2">
        <Image src={Stretch1} alt="hero" width={200} height={200} />
      </div>
    </div>
  );
};

export default Stretch;
