import React from "react";
import BoardList from "./_components/BoardList";
import { auth } from "@clerk/nextjs/server";

interface Props {
  params: { projectId: string };
}
const ProjectBoards: React.FC<Props> = ({ params }) => {
  auth().protect();
  return <BoardList projectId={params.projectId} />;
};

export default ProjectBoards;
