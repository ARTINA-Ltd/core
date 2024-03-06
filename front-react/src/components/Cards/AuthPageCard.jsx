import { Link } from "react-router-dom";
import Avatat from "../../assets/images/man.png";

const AuthPageCard = () => {
  //   const { avatar, name, description } = props;
  return (
    <div className="bg-white h-[26rem] w-80 px-4  rounded-2xl p-1 shadow-xl hover:scale-105 ease-in-out duration-300">
      <div className="bg-[#609AF8] w-28 h-28 rounded-full mx-auto mt-5 mb-4 flex items-center justify-center">
        <img
          src={Avatat}
          alt="User Profile"
          className="w-[6.8rem] h-[6.8rem]"
        />
      </div>
      <div className="text-center">
        <h2 className="text-4xl mb-4 ">نام</h2>
        <p className="text-gray-700 mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima quam
          itaque exercitationem quibusdam nihil deserunt nesciunt debitis eaque
          aliquid dolor.
        </p>
      </div>
      <Link className="bg-[#609AF8] p-2 w-32 block text-center rounded-lg mx-auto mt-4 text-white text-xl hover:bg-[#6366F1] ease-in-out duration-300">
        بررسی
      </Link>
    </div>
  );
};
export default AuthPageCard;
