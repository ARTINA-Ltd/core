import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router";
import FancyText from "@carefully-coded/react-text-gradient";

const Announcement = () => {
  const navigate = useNavigate();
  const [close, setClose] = useState(false);
  return (
    <div className={`flex font-bold w-full items-center bg-base-100 h-12 sticky top-0 text-center z-30  text-info-content justify-between border border-primary py-3  ${close && "hidden"}`}>
      <FancyText className={"mx-auto"} gradient={{ from: "#F305B8", to: "#00F0F7", type: "linear" }} animateTo={{ from: "#FFFFFF", to: "#F305B8" }} animateDuration={1000}>
        Enter Artina's Game From{" "}
        <span className="hover:text-accent hover:underline cursor-pointer" onClick={() => navigate("/nts")}>
          Here
        </span>
      </FancyText>
      <IoCloseSharp className="mx-4 cursor-pointer" onClick={() => setClose(true)} />
    </div>
  );
};
export default Announcement;
