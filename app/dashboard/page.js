"use client"
import { useUser } from "@clerk/nextjs";
import React from "react";
import { useQuery } from 'convex/react';
import { api } from "@/convex/_generated/api";
import Link from "next/link";

const Dashboard = () => {
  const { user } = useUser()
  const fileList = useQuery(api.fileStorage.GetUserPDF, {
    userEmail: user?.primaryEmailAddress?.emailAddress
  })
  return (
    <div>
      <h2 className="font-medium text-2xl">Workspace</h2>
      <div className="grid grid-cols-2 gap-5 mt-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
        {fileList?.length > 0 ? fileList.map((file, index) => (
          <Link key={index} href={"/workspace/" + file.fileId}>
            <div className="flex flex-col shadow-md items-center justify-center border gap-3 rounded-lg p-1 cursor-pointer hover:scale-105 transition-all">
              <img src="/pdf.png" alt="pdf-logo" className="h-20 w-20" />
              <h2 className="ml-1">{file.fileName}</h2>
            </div>
          </Link>
        ))
          : [1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
            <div key={index} className="bg-slate-200 rounded-md h-[150px] animate-pulse">

            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Dashboard;
