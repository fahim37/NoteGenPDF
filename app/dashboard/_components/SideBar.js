import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Layout, Shield } from "lucide-react";
import React from "react";
import UploadPdfDialog from "./UploadPdf";

const SideBar = () => {
  return (
    <div className="shadow-md h-screen p-6">
      <img className="h-[38px] w-[190px]" src="/logo.png" alt="logo" />
      <div className="mt-7">
        <UploadPdfDialog />
        <div className="flex gap-2 mt-5 p-2 hover:bg-slate-200 cursor-pointer rounded-lg">
          <Layout />
          <h2>Workspace</h2>
        </div>
        <div className="flex gap-2 mt-1 p-2 hover:bg-slate-200 cursor-pointer rounded-lg">
          <Shield />
          <h2>Upgrade</h2>
        </div>
      </div>
      <div className="absolute bottom-24 w-[80%]">
        <Progress value={33} />
        <p className="text-sm mt-3">2 out of 5 Pdf Uploaded</p>
        <p className="text-sm mt-1 text-gray-500">Upgrade to upload more</p>
      </div>
    </div>
  );
};

export default SideBar;
