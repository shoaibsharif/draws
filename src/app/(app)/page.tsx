import { auth } from "@clerk/nextjs/server";
import ProjectList from "../_components/ProjectList";

export default async function Home() {
  auth().protect();

  return (
    <>
      <ProjectList />
    </>
  );
}
