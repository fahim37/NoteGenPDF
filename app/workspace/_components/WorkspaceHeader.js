import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import React from "react";

const WorkspaceHeader = ({ fileName, saveHandler }) => {
  return (
    <div className="flex justify-between p-4 shadow-md">
      <img className="h-[28px] w-[120px]" src="/logo.png" alt="logo"></img>
      <h2 className="font-bold">{fileName}</h2>
      <div className="flex gap-2">
        <Button onClick={saveHandler}>Save</Button>
        <UserButton />

      </div>
    </div>
  );
};

export default WorkspaceHeader;
