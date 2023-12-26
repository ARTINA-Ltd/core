import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import ImageCard from "../components/Cards/UserDashboardCards/ImageCard";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import TestLayout from "../Layouts/TestLayout";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { useContext } from "react";
import { UserContext } from "../App";
import { Notify } from "notiflix";

const Collections = () => {
  const [getData, setData] = useState();
  const [getUser, setUser] = useState();
  const user = useContext(UserContext);

  const navigate = useNavigate();
  const { username } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://api.artina.org/api/transaction/collection/${username}/nfts/`,
        {}
      )
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      });

      axios
      .get(`https://api.artina.org/api/transaction/UsersWithNFTsViewSet/`)
      .then((res) => {
        console.log(res);
        setUser(res.data.filter((e)=>{return e.username == username})[0]);
      })
      .catch((res) => {
        console.log(res);
      });


  }, [username]);

  const handleClickShow = (e, childIsVisible, tokenid) => {
    axios
      .put(
        `https://api.artina.org/api/transaction/nfts/toggle_visibility/`,
        {
          token_id: tokenid,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
          mode: "cors",
        }
      )
      .then((res) => {
        Notify.success("مجموعه ی شما برای عموم قابل نمایش است")
        console.log(res.data);
      });
    childIsVisible(true);
  };

  const handleClickHide = (e, childIsVisible,tokenid) => {
    axios
      .put(
        `https://api.artina.org/api/transaction/nfts/toggle_visibility/`,
        {
          token_id: tokenid,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
          mode: "cors",
        }
      )
      .then((res) => {
        Notify.success("مجموعه ی شما فقط برای شما نمایش داده میشود")

        console.log(res.data);
      });
    childIsVisible(false);
  };
  return (
    <TestLayout>
      {user && getUser && user.data.username != username &&
      
      <>
      <div className="w-full flex gap-16 items-center p-6 bg-white rounded-xl mb-4 sm:p-3 sm:gap-4 sm:flex-col">
        <img src={getUser.profile_picture} className="rounded-full object-cover h-52 w-52 flex-shrink-0 sm:w-[120px] sm:h-[120px]" alt="" />
        <div className="w-full flex flex-col font-b6">
          <div>هنرمند: <span className="font-b3 px-1">{getUser.name}</span></div>
          <div>شناسه هنرمند:  <span className="font-b3 px-1">{getUser.username}</span></div>
          <div>درباره هنرمند:  <span className="font-b3 px-1">{getUser.bio}</span></div>
          <div>تعداد ان اف تی: <span className="font-b3 px-1">{getUser.nft_count} عدد</span></div>
        </div>
      </div>
      </>
      }
      {getData && getData.length > 0 ? (
        ""
      ) : (
        <div className="w-full flex items-center justify-center  text-lg font-b3">
          <div className="hover:bg-red-100 bg-red-50 border-[1px] border-red-500 text-red-500 transition-all rounded-2xl py-1 px-5">
            هنوز مجموعه ای ندارید!
          </div>
        </div>
      )}
      <div className="grid grid-cols-4 gap-5 w-full items-center lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {getData
          ? getData.map((item, index) => (
              <div className="col-span-1" key={index}>
                <ImageCard
                  className="bg-white"
                  src={item.image_url}
                  price={item.last_price}
                  onClick={() => navigate(`/nft-details/${item.token_id}`)}
                  tokenId={item.token_id}
                  showSell={user ? user.data.username === username : false}
                  visible={item.is_visible}
                  onClickShow={(e, x) => handleClickShow(e, x, item.token_id)}
                  onClickHide={(e, x) => handleClickHide(e, x, item.token_id)}
                >
                  {item.name}
                </ImageCard>
              </div>
            ))
          : ""}
      </div>
    </TestLayout>
  );
};

export default Collections;
