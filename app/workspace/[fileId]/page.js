"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import PdfViewer from "../_components/PdfViewer";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import TextEditor from "../_components/TextEditor";

const Workspace = () => {
  const { fileId } = useParams();
  const fileInfo = useQuery(api.fileStorage.getFileRecord, {
    fileId: fileId
  })
  const [triggerSave, setTriggerSave] = useState(false);
  const saveHandler = () => {
    setTriggerSave(true);
  };

  return (
    <div>
      <WorkspaceHeader fileName={fileInfo?.fileName} saveHandler={saveHandler} />
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        <div>
          <TextEditor fileId={fileId} triggerSave={triggerSave} setTriggerSave={setTriggerSave} />
        </div>
        <div>
          {fileInfo?.fileUrl && <PdfViewer fileUrl={fileInfo.fileUrl} />}
        </div>
      </div>
    </div>
  );
};

export default Workspace;
