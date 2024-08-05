import rock from "../../assets/images/rock.png";
import paper from "../../assets/images/paper.png";
import scissors from "../../assets/images/scissors.png";
import { FaLongArrowAltDown } from "react-icons/fa";

const PaperRockScissors = () => {
  return (
    <div className="w-1/2 lg:w-full mx-auto bg-base-200 rounded-lg p-12">
      <div className="mx-auto flex justify-between my-12 text-3xl">
        <div>
          {" "}
          <p>Your choice </p>
          <FaLongArrowAltDown className="mx-auto text-primary h-32" />
          <div className="bg-primary text-center text-primary-content w-44 h-44 flex justify-center items-center hover:bg-secondary  cursor-pointer z-50 ease-out duration-200 rounded-xl p-2">Choose Your Move </div>
        </div>
        <div>
          <p className="w-fit mx-auto">Status</p>
          <FaLongArrowAltDown className="mx-auto text-primary h-32" />
          <div className="bg-primary text-center text-primary-content w-44 h-44 flex justify-center items-center hover:bg-secondary  cursor-pointer z-50 ease-out duration-200 rounded-xl p-2">Draw </div>
        </div>
        <div>
          <p>Server Answer</p>
          <FaLongArrowAltDown className="mx-auto text-primary h-32" />
          <div className="bg-primary text-center text-primary-content w-44 h-44 flex justify-center items-center hover:bg-secondary  cursor-pointer z-50 ease-out duration-200 rounded-xl p-2">Waiting For you </div>
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div className="bg-primary w-44 h-44 flex justify-center items-center hover:bg-secondary  cursor-pointer z-50 ease-out duration-200 rounded-full p-2">
          <img src={paper} alt="" className="sm:w-32 z-[10] object-cover" />
        </div>
        <div className="bg-primary w-44 h-44 flex justify-center items-center hover:bg-secondary  cursor-pointer z-50 ease-out duration-200 rounded-full p-2">
          <img src={rock} alt="" className="sm:w-24 sm:h-24 object-cover" />
        </div>
        <div className="bg-primary w-44 h-44 flex justify-center items-center hover:bg-secondary  cursor-pointer z-50 ease-out duration-200 rounded-full p-2">
          <img src={scissors} alt="" className="sm:w-32 object-cover" />
        </div>
      </div>
    </div>
  );
};
export default PaperRockScissors;
