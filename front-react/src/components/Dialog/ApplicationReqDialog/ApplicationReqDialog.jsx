import React, { useEffect, useState } from "react";
import BorderButton from "../../Buttons/BorderButton";
import axios from "axios";
import { Notify } from "notiflix";
import NftRequestsCard from "./../../Cards/UserDashboardCards/NftRequestsCard";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n.js";
import { MdOutlineClose } from "react-icons/md";

const ApplicationReqDialog = ({ user, nfts = [], description, exhibition, application }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [getData, setData] = useState();
  const [nftDetails, setNftDetails] = useState([]);
  const [exhibitionName, setExhibitionName] = useState("");
  const { t } = useTranslation(["exhibitor"]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://api.artina.org/api/account/userpicture/${user}/`)
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {});

    nfts.forEach((nft) => {
      axios
        .get(`https://api.artina.org/api/transaction/nfts/${nft}/`)
        .then((res) => {
          if (!nftDetails.includes(res.data)) {
            setNftDetails((prev) => [...prev, res.data]);
          }
        })
        .catch(() => {});
    });
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
        res.data.forEach((item) => {
          if (item.id === exhibition) {
            setExhibitionName(item.marketName);
          }
        });
      });
  }, []);

  const btnClick = (action) => {
    const authTokens = JSON.parse(localStorage.getItem("authTokens"));
    axios
      .put(
        `https://api.artina.org/api/exhibition/applications/${application}/`,
        { action: action },
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      )
      .then(() => {
        Notify.success(t("successfulOperation"));
        setIsOpen(false);
        window.location.reload(true);
      })
      .catch(() => {});
  };

  const handleOpenDialog = () => {
    setIsOpen(true);
    document.getElementById("application-dialog").showModal();
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    document.getElementById("application-dialog").close();
  };

  return (
    <div className="card flex justify-content-center grow max-w-md lg:max-w-[calc(50%-1rem)] md:max-w-full">
      <NftRequestsCard
        image={getData ? getData.profile_picture : ""}
        firstName={getData ? getData.first_name : ""}
        lastName={getData ? getData.last_name : ""}
        exhibition={exhibitionName}
        onClick={handleOpenDialog}
      />

      {/* Dialog */}
      <dialog id="application-dialog" className="modal w-[70vw] sm:w-[95%] mx-auto">
        <div className="modal-box">
          <form method="dialog">
            {/* Close button */}
            <button onClick={handleCloseDialog} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-xl hover:bg-red-500 hover:text-black">
              <MdOutlineClose />
            </button>
          </form>

          {/* Header */}
          <div className="my-4">
            <p className="font-b9">{t("requests")}</p>
          </div>

          {/* User Information */}
          <div className={`flex flex-col w-full gap-4 font-b4 items-center sm:gap-2`}>
            <img src={getData ? getData.profile_picture : ""} className="h-[150px] w-[150px] object-cover rounded-full sm:h-[120px] sm:w-[120px]" alt="" />
            <div className="flex gap-1 text-2xl font-b6">
              <div>{getData ? getData.first_name : ""}</div>
              <div>{getData ? getData.last_name : ""}</div>
            </div>
          </div>

          {/* Description */}
          <div className="w-full rounded-2xl my-4 bg-slate-100 text-slate-400 px-4 py-2 font-b5 sm:px-2">
            {t("description")}: {description}
          </div>

          {/* NFT Details */}
          {nftDetails.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/nft-details/${item.token_id}`)}
              className="flex gap-4 w-full cursor-pointer group my-2 bg-slate-50 hover:bg-slate-200 transition-all items-center justify-between rounded-2xl font-b5 p-2 sm:rounded-sm sm:flex-col sm:gap-2"
            >
              <img src={item.image_url} className="rounded-full h-[60px] w-[60px] object-cover my-1 sm:h-[90px] sm:w-[90px]" alt="" />
              <div className="font-b7">{item.name}</div>
              <div className="font-b3">
                {item.last_price} {t("ethereum")}
              </div>
            </div>
          ))}

          {/* Footer */}
          <div className="flex justify-center gap-5 sm:gap-2 text-bold sm:mt-2 sm:pt-2 py-4">
            <BorderButton onClick={handleCloseDialog} className="font-bold text-right px-10">
              {t("cancel")}
            </BorderButton>
            <BorderButton onClick={() => btnClick("ignored")} className="font-bold text-right px-10">
              {t("reject")}
            </BorderButton>
            <BorderButton onClick={() => btnClick("accept")} className="font-bold text-right px-10">
              {t("confirm")}
            </BorderButton>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ApplicationReqDialog;
