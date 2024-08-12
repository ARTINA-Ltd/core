import { FaRegHeart } from "react-icons/fa6";
import { FaHeart, FaUserAlt } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../App.js";
import { useNavigate } from "react-router";
import artinaLogo from "../../assets/images/Artina-Logo-1.jpeg";

const NTSNavbar = ({ refetch }) => {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [userProfile, setUserProfile] = useState("");
  useEffect(() => {
    axios
      .post(
        "https://api.artina.org/api/game/user-profiles/user_profile/",
        { id: user?.data.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
          mode: "cors",
        }
      )
      .then((e) => {
        setUserProfile(e.data);
      })
      .catch((e) => {});
  }, [refetch]);
  if (userProfile) console.log(userProfile);

  return (
    userProfile && (
      <div className="h-32 p-4 bg-base-300 sticky top-0 z-[100]">
        <div className="w-[80vw] mx-auto flex justify-between">
          <div className="flex gap-8 h-fit my-auto items-center">
            <img className="h-16 sm:h-12 rounded-lg cursor-pointer" src={artinaLogo} alt="logo" onClick={() => navigate("/")} />
            <img alt="" src={userProfile.profile_picture} className="w-20 h-20 object-cover" />
            <h1 className="text-5xl">My points:</h1>
            <h2 className="text-5xl">{userProfile.points}</h2>
          </div>
          <div className="flex gap-4 cursor-pointer" onClick={() => navigate("./play-with-friend")}>
            <div className="bg-base-100 flex items-center justify-center w-32 text-center h-20 rounded-md p-2">
              <p>My games</p>
            </div>
            <div className="flex flex-col gap-2 w-32 bg-base-100 rounded-md justify-center items-center p-2">
              <h1>buymore</h1>
              {userProfile.hearts === 3 ? (
                <div className="flex gap-2">
                  <FaHeart />
                  <FaHeart />
                  <FaHeart />
                </div>
              ) : userProfile.hearts === 2 ? (
                <div className="flex gap-2">
                  <FaHeart />
                  <FaHeart />
                  <FaRegHeart />
                </div>
              ) : userProfile.hearts === 1 ? (
                <div className="flex gap-2">
                  <FaHeart />
                  <FaRegHeart />
                  <FaRegHeart />
                </div>
              ) : (
                <div className="flex gap-2">
                  <FaRegHeart />
                  <FaRegHeart />
                  <FaRegHeart />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default NTSNavbar;
