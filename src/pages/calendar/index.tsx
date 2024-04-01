import Calendar from "@/components/Calendar";
import { NextPage } from "next";

const ClanderIndex:NextPage = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
        <Calendar />
    </div>
  );
}

export default ClanderIndex;