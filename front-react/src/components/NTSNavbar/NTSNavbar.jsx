import { FaRegHeart } from "react-icons/fa6";
import { FaHeart, FaUserAlt } from "react-icons/fa";

const NTSNavbar = () => {
  return (
    <div className="h-32 p-4 bg-base-300 sticky top-0 z-[100]">
      <div className="w-[80vw] mx-auto flex justify-between">
        <div className="flex gap-8 h-fit my-auto items-center">
          <FaUserAlt className="w-20 h-16" />
          <h1 className="text-5xl">My points:</h1>
          <h2 className="text-5xl">130</h2>
        </div>
        <div className="flex gap-4">
          <div className="bg-base-100 w-32 text-center h-20 rounded-md p-2">My games</div>
          <div className="flex flex-col gap-2 w-32 bg-base-100 rounded-md justify-center items-center p-2">
            <h1>buymore</h1>
            <div className="flex gap-2">
              <FaHeart />
              <FaHeart />
              <FaRegHeart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NTSNavbar;
