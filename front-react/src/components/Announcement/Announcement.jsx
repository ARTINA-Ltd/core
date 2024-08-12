import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

const Announcement = () => {
  const [close, setClose] = useState(false);
  return (
    <div className={`flex w-full items-center h-12 sticky top-0 text-center z-30 bg-info text-info-content justify-between border border-primary py-3  ${close && "hidden"}`}>
      <h1 className="self-center mx-16">Announcement</h1>
      <IoCloseSharp className="mx-4 cursor-pointer" onClick={() => setClose(true)} />
    </div>
  );
};
export default Announcement;
