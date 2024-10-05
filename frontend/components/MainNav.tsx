import React from "react";
import MainNavLinks from "./MainNavLinks";
import ToggleMode from "./ToggleMode";

const MainNav = () => {
  return (
    <div className="flex justify-between">
      <ToggleMode />
      <div className="flex items-center gap-4">
        <MainNavLinks />
      </div>
    </div>
  );
};

export default MainNav;
