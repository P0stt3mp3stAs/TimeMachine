import { NextPage } from "next";
import Stopwatch from "@/components/Stopwatch";

const BlogIndex:NextPage = () => {
  return (
  <div className="h-screen w-screen bg-creamblack flex items-center justify-center">
    <Stopwatch/>
  </div>
  );
}

export default BlogIndex;