import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import ImageCard from "../components/Cards/UserDashboardCards/ImageCard";
import TestLayout from "../Layouts/TestLayout";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { useContext } from "react";
import { Notify } from "notiflix";
import { useTranslation } from "react-i18next";
import i18n from "./../i18n";
import { UserContext } from "../contexts/UserContext.js";

const Collections = () => {
  const [getData, setData] = useState();
  const [getUser, setUser] = useState();
  const user = useContext(UserContext);
  const { t } = useTranslation("collections");

  const navigate = useNavigate();
  const { username } = useParams();

  useEffect(() => {
    axios.get(`https://api.artina.org/api/transaction/collection/${username}/nfts/`, {}).then((res) => {
      setData(res.data);
    });

    axios
      .get(`https://api.artina.org/api/transaction/UsersWithNFTsViewSet/`)
      .then((res) => {
        setUser(
          res.data.filter((e) => {
            return e.username == username;
          })[0]
        );
      })
      .catch((res) => {});
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
        Notify.success("مجموعه ی شما برای عموم قابل نمایش است");
      });
    childIsVisible(true);
  };

  const handleClickHide = (e, childIsVisible, tokenid) => {
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
        Notify.success("مجموعه ی شما فقط برای شما نمایش داده میشود");
      });
    childIsVisible(false);
  };

  return (
    <TestLayout>
      {user && getUser && getData && user.data.username !== username && (
        <div>
          <div className="w-full flex gap-16 items-start p-6 bg-base-100 rounded-xl mb-4 sm:p-3 sm:gap-4 sm:flex-col">
            <img src={getUser.profile_picture} className="rounded-full object-cover h-52 w-52 flex-shrink-0 sm:w-[120px] sm:h-[120px]" alt="" />
            <div className="w-full flex flex-col font-b6">
              <div>
                {t("artist")} <span className="font-b3 px-1">{getUser.name}</span>
              </div>
              <div>
                {t("ID")} <span className="font-b3 px-1">{getUser.username}</span>
              </div>
              <div>
                {t("about")} <span className="font-b3 px-1">{getUser.bio}</span>
              </div>
              <div>
                {t("count")} <span className="font-b3 px-1">{getUser.nft_count}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {getData && getData.length > 0 ? (
        ""
      ) : (
        <div className="w-full flex items-center justify-center  text-lg font-b3">
          <div className="hover:bg-red-100 bg-red-50 border-[1px] border-red-500 text-red-500 transition-all rounded-2xl py-1 px-5">{t("nothingYet")} </div>
        </div>
      )}
      {getData && (
        <div className="flex flex-wrap grow gap-8 w-full mx-auto my-4 items-center sm:mx-auto">
          {user.data.username === username ? (
            <div className="min-h-[480px] w-80 px-4 sm:w-full sm:mx-auto shadow-md max-w-[25rem] hover:shadow-xl ease-in-out duration-300 grow p-4 bg-neutral hover:bg-[#0000aa08] rounded-2xl group flex items-center justify-center cursor-pointer  transition-all md:h-[300px] sm:h-[250px] sm:wf" onClick={() => document.getElementById("AddNftPopup").showModal()}>
              <div className="text-base-content opacity-20 group-hover:opacity-40 transition-all group-hover:scale-105 ease-out duration-150 flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="0.6" stroke="currentColor" width={"4em"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="font-b6">{t("addNftFromOut")}</div>
              </div>
            </div>
          ) : null}

          {getData.map((item, index) => (
            <ImageCard key={index} className="bg-base-100 min-h-[480px] w-80 sm:w-full my-auto shadow-md max-w-[25rem] p-6 hover:shadow-xl ease-in-out duration-300 grow sm:mx-auto rounded-xl flex-col" src={item.image_url} price={item.last_price} onClick={() => navigate(`/nft-details/${item.token_id}`)} tokenId={item.token_id} showCancel={user?.data.username === username} showSell={user ? user.data.username === username && item.is_for_sale === false : false} visible={item.is_visible} onClickShow={(e, x) => handleClickShow(e, x, item.token_id)} onClickHide={(e, x) => handleClickHide(e, x, item.token_id)}>
              {item.name}
            </ImageCard>
          ))}
        </div>
      )}
      <dialog id="AddNftPopup" className={`${i18n.dir() === "rtl" ? "text-right" : "text-left"} modal relative p-0 m-0 `}>
        <div className="modal-box p-0 m-0 bg-neutral">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost hover:bg-red-500 right-2 my-4 mx-4 mb-4">✕</button>
          </form>
          <p className="py-4 z-10 mx-8">{t("addingLater")}</p>
          <div className="mx-auto container max-w-[50%] flex">
            <a href="/" className={"btn bg-primary hover:text-base-content text-primary-content glass mx-auto self-center my-4"}>
              {t("backHome")}{" "}
            </a>
          </div>
        </div>
      </dialog>
    </TestLayout>
  );
};

export default Collections;
