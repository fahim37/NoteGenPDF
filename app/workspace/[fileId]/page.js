"use client";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import PdfViewer from "../_components/PdfViewer";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const Workspace = () => {
  const { fileId } = useParams();
  const fileInfo = useQuery(api.fileStorage.getFileRecord, {
    fileId: fileId
  })
  return (
    <div>
      <WorkspaceHeader />
      <div className="grid grid-cols-2 gap-5">
        <div>
          <p>note</p>
        </div>
        <div>
          {fileInfo?.fileUrl && <PdfViewer fileUrl={fileInfo.fileUrl} />}
        </div>
      </div>
    </div>
  );
};

export default Workspace;
