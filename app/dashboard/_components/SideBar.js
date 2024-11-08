import { Button } from "@/components/ui/button";
import { Layout } from "lucide-react";
import React from "react";

const SideBar = () => {
  return (
    <div className="shadow-md h-screen p-6">
      <img className="h-[50px] w-[170px]" src="/logo.png" alt="logo" />
      <div className="mt-7">
        <Button className="w-full">+ Upload PDF</Button>
      </div>
      <div>
        <Layout />
        <h2>Workspace</h2>
      </div>
    </div>
  );
};

export default SideBar;
