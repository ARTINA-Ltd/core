import Avatar from "../../assets/images/man.png";
import { Link } from "react-router-dom";
import BorderButton from "./../Buttons/BorderButton";

const AuthPageCard = (props) => {
  const { profileImage, name, bio, destination } = props;

  return (
    <div className=" flex flex-col justify-around bg-white min-h-[26rem] w-80 px-4 sm:w-full rounded-2xl p-1 shadow-md max-w-[25rem] hover:shadow-xl ease-in-out duration-300 grow">
      <div className="">
        <div className="bg-[#609AF8] w-28 h-28 rounded-full mx-auto mt-5 mb-4 flex items-center justify-center">
          {profileImage ? (
            <img
              src={profileImage}
              alt="User Profile"
              className="w-[6.5rem] h-[6.5rem] rounded-full"
            />
          ) : (
            <img
              src={Avatar}
              alt="User Profile"
              className="w-[6.8rem] h-[6.8rem] rounded-full"
            />
          )}
        </div>
        <div className="text-center">
          <h2 className="text-4xl mb-4 ">{name}</h2>
          <p className="text-gray-700 mb-4 ">{bio}</p>
        </div>
      </div>
      <div>
        <BorderButton className={"w-1/3 mx-auto my-4"}>
          <Link to={`/authenticate/${destination}`} className="font-bold">
            بررسی
          </Link>
        </BorderButton>
      </div>
    </div>
  );
};
export default AuthPageCard;
