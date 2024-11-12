import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const WorkspaceHeader = ({ fileName, saveHandler }) => {
  return (
    <div className="flex justify-between p-4 shadow-md">
      <Link href={"/dashboard"}>
        <img className="h-[26px] mt-2 w-[100px] md:h-[28px] md:w-[120px]" src="/logo.png" alt="logo"></img>

      </Link>
      <h2 className="font-semibold md:font-bold pt-2">{fileName}</h2>
      <div className="flex gap-2">
        <Button onClick={saveHandler}>Save</Button>
        <UserButton />

      </div>
    </div>
  );
};

export default WorkspaceHeader;
