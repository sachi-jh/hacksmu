import React from "react";
import MainNavLinks from "./MainNavLinks";

const MainNav = () => {
  return (
    <div className="flex justify-between">
      <div>Logo</div>
      <div className="flex items-center gap-4">
        <MainNavLinks />
      </div>
    </div>
  );
};

export default MainNav;
