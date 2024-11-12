import { UserButton } from "@clerk/nextjs";
import React from "react";
import { MenuIcon } from "lucide-react";

const Header = ({ toggleSidebar }) => {
  return (
    <div className="flex justify-between items-center p-5 shadow-sm">
      <button onClick={toggleSidebar} className="md:hidden text-2xl">
        <MenuIcon />
      </button>

      <div className="flex justify-end w-full md:w-full">
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
