import Timer from "@/components/Timer";
import { NextPage } from "next";

const ClanderIndex:NextPage = () => {
  return (
    <div className="h-screen w-screen bg-creamblack flex items-center justify-center">
        <Timer/>
    </div>
  );
}

export default ClanderIndex;