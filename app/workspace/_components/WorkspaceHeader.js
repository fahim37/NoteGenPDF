import { UserButton } from "@clerk/nextjs";
import React from "react";

const WorkspaceHeader = () => {
  return (
    <div className="flex justify-between p-4 shadow-md">
      <img className="h-[28px] w-[120px]" src="/logo.png" alt="logo"></img>
      <UserButton />
    </div>
  );
};

export default WorkspaceHeader;
