import { useParams } from "next/navigation";
import React from "react";
import WorkspaceHeader from "../components/WorkspaceHeader";

const Workspace = () => {
  const { fileId } = useParams;
  return (
    <div>
      <WorkspaceHeader />
    </div>
  );
};

export default Workspace;
