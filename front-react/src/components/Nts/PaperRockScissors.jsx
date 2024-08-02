import rock from "../../assets/images/rock.png";
import paper from "../../assets/images/paper.png";
import scissors from "../../assets/images/scissors.png";

const PaperRockScissors = () => {
  return (
    <div className="w-1/2 mx-auto bg-base-200 rounded-lg p-4">
      <div className="mx-auto mb-16  bg-accent w-44 h-44 flex justify-center items-center hover:bg-primary  cursor-pointer z-50 ease-out duration-200 rounded-full p-2">
        <img src={paper} alt="" className="sm:w-32 object-cover" />
      </div>
      <div className="flex w-full justify-between">
        <div className="bg-accent w-44 h-44 flex justify-center items-center hover:bg-primary  cursor-pointer z-50 ease-out duration-200 rounded-full p-2">
          <img src={rock} alt="" className="sm:w-24 sm:h-24 object-cover" />
        </div>
        <div className="bg-accent w-44 h-44 flex justify-center items-center hover:bg-primary  cursor-pointer z-50 ease-out duration-200 rounded-full p-2">
          <img src={scissors} alt="" className="sm:w-32 object-cover" />
        </div>
      </div>
    </div>
  );
};
export default PaperRockScissors;
