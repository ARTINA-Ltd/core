import { Dialog } from "primereact/dialog";
import React, { useEffect } from "react";
import { useState } from "react";
import BorderButton from "../../Buttons/BorderButton";
import axios from "axios";
import { Notify } from "notiflix";
import NftRequestsCard from "./../../Cards/UserDashboardCards/NftRequestsCard";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n.js";

const ApplicationReqDialog = ({ user, nfts = [], description, exhibition, application }) => {
  const [visible, setVisible] = useState(false);
  const [getData, setData] = useState();
  const [nftDetails, setNftDetails] = useState([]);
  const [exhibitionName, setExhebitionName] = useState();
  var temp = 0;
  const { t } = useTranslation(["exhibitor"]);

  const navigate = useNavigate();
  var q = 0;
  const btnClick = (action) => {
    const authTokens = JSON.parse(localStorage.getItem("authTokens"));
    axios
      .put(
        `https://api.artina.org/api/exhibition/applications/${application}/`,
        {
          action: action,
        },
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      )
      .then((res) => {
        setData(res.data);
        setVisible(false);
        Notify.success(t("successfulOperation"));
        window.location.reload(true);
      })
      .catch(() => {});
  };
  useEffect(() => {
    axios
      .get(`https://api.artina.org/api/account/userpicture/${user}/`, {
        action: "accept",
      })
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {});
    if (temp === 0) {
      temp = 1;
      for (let i = 0; i < nfts.length; i++) {
        axios
          .get(`https://api.artina.org/api/transaction/nfts/${nfts[i]-71}/`, {})
          .then((res) => {
            if (!nftDetails.includes(res.data)) {
              setNftDetails((prev) => [...prev, res.data]);
            }
          })
          .catch(() => {});
      }
    }
  }, []);

  useEffect(() => {
    const authTokens = JSON.parse(localStorage.getItem("authTokens"));
    axios
      .get("https://api.artina.org/api/exhibition/exhibitions/", {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
        mode: "cors",
      })
      .then((res) => {
        res.data.map((item) => {
          if (item.id === exhibition) {
            setExhebitionName(item.marketName);
          }
        });
      });
  }, []);
  useEffect(() => {
    console.log(nftDetails);
  }, [nftDetails]);

  const Footer = (
    <div className="flex gap-5 sm:gap-2 textbol sm:mt-2 sm:pt-2 py-4">
      <BorderButton onClick={() => setVisible(false)} className="w-full  font-bold text-right">
        {t("cancel")}
      </BorderButton>

      <BorderButton
        onClick={() => {
          btnClick("ignored");
        }}
        className="w-full font-bold text-right"
      >
        {t("reject")}
      </BorderButton>

      <BorderButton
        onClick={() => {
          btnClick("accept");
        }}
        className="w-full font-bold text-right"
      >
        {t("confirm")}
      </BorderButton>
    </div>
  );

  const Header = (
    <div>
      <p className="font-b9">{t("requests")}</p>
    </div>
  );

  return (
    <div className="card flex justify-content-center grow max-w-md lg:max-w-[calc(50%-1rem)] md:max-w-full">
      <NftRequestsCard image={getData ? getData.profile_picture : ""} firstName={getData ? getData.first_name : ""} lastName={getData ? getData.last_name : ""} exhibition={exhibitionName} onClick={() => setVisible(true)} />

      <Dialog header={Header} visible={visible} style={{ direction: i18n.dir() }} onHide={() => setVisible(false)} footer={Footer} className="font-b4 w-[35rem] md:w-[90%]">
        <div className={`flex flex-col w-full gap-4 font-b4 items-center sm:gap-2`}>
          <img src={getData ? getData.profile_picture : ""} className="h-[150px] w-[150px] shrink-0 object-cover rounded-full sm:h-[120px] sm:w-[120px]" alt="" />
          <div className="flex gap-1 text-2xl font-b6">
            <div>{getData ? getData.first_name : ""}</div>
            <div>{getData ? getData.last_name : ""}</div>
          </div>
        </div>
        <div className="w-full rounded-2xl my-4 bg-slate-100 text-slate-400 px-4 py-2 font-b5 sm:px-2">
          {t("description")}:{description}
        </div>
        {nftDetails.map((item, index) => (
          <div key={index} onClick={() => navigate(`/nft-details/${item.token_id}`)} className="flex gap-4 w-full cursor-pointer group my-2 bg-slate-50 hover:bg-slate-200 transition-all items-center justify-between rounded-2xl font-b5 p-2 sm:rounded-sm sm:flex-col sm:gap-2">
            <img src={item.image_url} className="rounded-full h-[60px] w-[60px] object-cover my-1 sm:h-[90px] sm:w-[90px] shrink-0" alt="" />
            <div className="font-b7">{item.name}</div>
            <div className="font-b3">
              {item.last_price}
              {t("ehereum")}
            </div>
            <div className="pl-4 align-middle group-hover:-translate-x-2 transition-all duration-200 sm:pl-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.3" stroke="currentColor" width={"1em"}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </div>
          </div>
        ))}
      </Dialog>
    </div>
  );
};

export default ApplicationReqDialog;
