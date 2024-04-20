import axios from "axios";
import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import ImageCard from "../components/Cards/UserDashboardCards/ImageCard";
import TestLayout from "../Layouts/TestLayout";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { useContext } from "react";
import { UserContext } from "../App";
import { Notify } from "notiflix";
import { useTranslation } from "react-i18next";
import { Dialog } from "primereact/dialog";
import BorderButton from "../components/Buttons/BorderButton";
import SimpleInput from "../components/Inputs/SimpleInput";
import SellArea from "../components/SellArea/SellArea";

const Collections = () => {
  const [getData, setData] = useState();
  const [getUser, setUser] = useState();
  const user = useContext(UserContext);
  const { t } = useTranslation("collections");

  const [visible, setVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();
  const { username } = useParams();

  useEffect(() => {
    axios.get(`https://api.artina.org/api/transaction/collection/${username}/nfts/`, {}).then((res) => {
      setData(res.data);
      console.log(res.data);
    });

    axios
      .get(`https://api.artina.org/api/transaction/UsersWithNFTsViewSet/`)
      .then((res) => {
        console.log(res);
        setUser(
          res.data.filter((e) => {
            return e.username == username;
          })[0]
        );
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
        Notify.success("مجموعه ی شما برای عموم قابل نمایش است");
        console.log(res.data);
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

        console.log(res.data);
      });
    childIsVisible(false);
  };

  const handleSubmit = () => {
    setIsChecked(true);
    setVisible(false);
  };

  const Footer = (
    <div className="flex gap-5 justify-end">
      <BorderButton onClick={() => setVisible(false)} className="font-b4 text-center">
        لغو
      </BorderButton>
      <BorderButton onClick={() => handleSubmit()} className="font-b4 text-center" disabled={!isChecked}>
        ثبت
      </BorderButton>
    </div>
  );

  const Header = (
    <div>
      <p className="font-b9">افزودن ان اف تی خارج از آرتینا</p>
    </div>
  );

  return (
    <TestLayout>
      {user && getUser && user.data.username != username && (
        <div>
          <div className="w-full flex gap-16 items-center p-6 bg-white rounded-xl mb-4 sm:p-3 sm:gap-4 sm:flex-col">
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
      <div className="grid grid-cols-4 gap-5 w-full items-center lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {getData ? (
          <Fragment>
            <div className="col-span-1 h-full">
              <div className="h-full w-full bg-[#0000aa05] hover:bg-[#0000aa08] rounded-2xl group flex items-center justify-center cursor-pointer  transition-all md:h-[300px] sm:h-[250px]" onClick={() => setVisible(true)}>
                <div className="text-[#000022] opacity-20 group-hover:opacity-40 transition-all group-hover:scale-105 ease-out duration-150 flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="0.6" stroke="currentColor" width={"4em"}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="font-b6">افزودن ان اف تی های خارج از آرتینا</div>
                </div>
              </div>
            </div>
            <Dialog header={Header} visible={visible} style={{ direction: "rtl" }} onHide={() => setVisible(false)} footer={Footer} className="w-[35%] lg:w-[70%] sm:w-[85%]">
              <div className="flex flex-col gap-5 items-center mt-5">
                <SimpleInput
                  title="آدرس کانترکت"
                  placeholder="0x..."
                  className="w-full"
                  type="text"
                  validationError="نمی‌تواند خالی باشد"
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                />
                <SimpleInput title="توکن ایدی" placeholder="1234..." className="w-full" type="text" validationError="نمی‌تواند خالی باشد" />
              </div>
            </Dialog>
            {getData.map((item, index) => (
              <div className="col-span-1" key={index}>
                <ImageCard className="bg-white max-h-[420px] " src={item.image_url} price={item.last_price} onClick={() => navigate(`/nft-details/${item.token_id}`)} tokenId={item.token_id} showSell={user ? user.data.username === username : false} visible={item.is_visible} onClickShow={(e, x) => handleClickShow(e, x, item.token_id)} onClickHide={(e, x) => handleClickHide(e, x, item.token_id)}>
                  {item.name}
                </ImageCard>
              </div>
            ))}
          </Fragment>
        ) : (
          ""
        )}
      </div>
    </TestLayout>
  );
};

export default Collections;
