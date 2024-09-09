import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../App.js";
import { useNavigate } from "react-router";
import artinaLogo from "../../assets/images/Artina-Logo-1.jpeg";
import BuyHeart from "../Nts/BuyHeart.jsx";

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
        console.log(e.data);

        setUserProfile(e.data);
      })
      .catch((e) => {});
  }, [refetch]);

  return (
    userProfile && (
      <div className="h-26 p-4 bg-base-300 z-[100] overflow-hidden">
        <div className="w-[80vw] md:w-[95vw] mx-auto flex md:justify-around justify-between">
          <div className="flex md:flex-col gap-8 h-fit my-auto items-center">
            <div className="flex gap-8 h-fit my-auto items-center">
              <div className="tooltip tooltip-right md:tooltip-bottom" data-tip="Enter Artina Website">
                <img className="h-16 sm:h-12 rounded-lg cursor-pointer" src={artinaLogo} alt="logo" onClick={() => navigate("/")} />
              </div>
              <img alt="" src={userProfile.profile_picture} onClick={() => navigate("/nts")} className="h-16 aspect-square object-cover cursor-pointer rounded-full p-1 border" />
            </div>
            <div className="flex gap-8 h-fit my-auto items-center">
              <h1 className="text-3xl lg:text-base">My points:</h1>
              <h2 className="text-2xl lg:text-base">{userProfile.points}</h2>
            </div>
          </div>
          <div className="flex md:flex-col gap-4 cursor-pointer">
            <div className="bg-base-100 border rounded-xl flex items-center justify-center w-32 text-center h-16 p-2">
              <p onClick={() => navigate("/nts/play-with-friend")}>My games</p>
            </div>
            <div className="tooltip tooltip-left " data-tip={`All Hearts: ${userProfile.hearts}`}>
              <div onClick={() => document.getElementById("buy-heart").showModal()} className="flex md:p-1  flex-col gap-2 w-32 h-16 bg-base-100 border rounded-xl justify-center items-center p-2">
                <h1>buymore</h1>
                {userProfile.hearts === 3 || userProfile.hearts > 3 ? (
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

        <BuyHeart />
      </div>
    )
  );
};

export default NTSNavbar;
