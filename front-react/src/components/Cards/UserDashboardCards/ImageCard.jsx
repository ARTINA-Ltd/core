import React, { Fragment, useState, useCallback } from "react";
import BorderButton from "./../../Buttons/BorderButton";
import { useTranslation } from "react-i18next";
import SellArea from "./../../SellArea/SellArea";
import { FaEthereum } from "react-icons/fa";
import axios from "axios";
import { Notify } from "notiflix";
import SimpleInput from "../../Inputs/SimpleInput.jsx";
import { MdOutlineVerified } from "react-icons/md";
import { FaCircleQuestion } from "react-icons/fa6";
import { BiErrorAlt } from "react-icons/bi";

const ImageCard = ({ className, children, src, price, onClick, tokenId, showCancel, showSell = false, onClickShow, onClickHide, has_creator, visible, isForSale }) => {
  const [isVisible, setIsVisible] = useState(visible);
  const [expandedSection, setExpandedSection] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog state
  const [nftId, setNftId] = useState(null); // Store NFT ID from API response

  const handleExpand = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  const { t } = useTranslation("usercollection");
  const [address, setAddress] = useState();
  const [isAddressValid, setIsAddressValid] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleClickShow = useCallback(
    (e) => {
      onClickShow(e, setIsVisible);
    },
    [onClickShow]
  );

  const handleClickHide = useCallback(
    (e) => {
      onClickHide(e, setIsVisible);
    },
    [onClickHide]
  );

  const handleTransfer = () => {
    const authTokens = JSON.parse(localStorage.getItem("authTokens"));
    console.log(tokenId);
    axios
      .post(
        `https://api.artina.org/api/transaction/nfts/transferToUserWallet/`,
        {
          token_id: tokenId,
          address: address,
        },
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
          mode: "cors",
        }
      )
      .then((res) => {
        const nftId = res.data.nftId; // Assuming the API returns the NFT ID here
        setNftId(nftId); // Set the retrieved NFT ID
        setIsDialogOpen(true); // Open the dialog
        Notify.success(t("transferSuccessful"));
      })
      .catch((e) => {
        console.log(e);
        Notify.failure(t("transferFailed"));
      });
  };

  const handleCancel = () => {
    const authTokens = JSON.parse(localStorage.getItem("authTokens"));
    axios
      .put(
        "https://api.artina.org/api/transaction/nfts/cancel_sell/",
        {
          token_id: tokenId,
        },
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
          mode: "cors",
        }
      )
      .then((r) => {
        Notify.success(t("saleCanceled"));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const checkWalletExists = async () => {
    await axios
      .post("https://api.artina.org/api/transaction/wallet-validation/validate_wallet/", { wallet_address: address })
      .then((e) => {
        if (e.data.message === "Valid Polygon wallet address") {
          setIsAddressValid(true);
        } else {
          setIsAddressValid(false);
        }
      })
      .catch((e) => {
        setIsAddressValid(false);
        console.log(e);
      });
  };

  const handleMouseOver = (e) => {
    setShowTooltip(true);
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseOut = () => {
    setShowTooltip(false);
  };

  // Callback function for handling successful sale
  const handleSellSuccess = () => {
    setExpandedSection(null); // Collapse the sell section
  };

  return (
    <div className={className}>
      <div className="relative transition-all cursor-pointer mb-10" onClick={onClick} style={{ width: "100%", height: "0", paddingBottom: "100%", position: "relative" }}>
        <img src={src} className="w-full h-full absolute top-0 left-0 rounded-lg object-cover" alt="" />
      </div>
      <div>
        {has_creator ? (
          <div className="flex justify-between px-4 -mt-6">
            <div className="text-[18px] cursor-pointer" onClick={onClick}>
              {children}
            </div>
            <div className="flex justify-between items-center">
              <div className="text-[19px] flex items-center justify-center">
                <div className="pt-1">{price}</div>
                <FaEthereum className="text-xl my-2" />
              </div>
              {showSell && (
                <div className="flex items-center gap-2">
                  <div className="transition-all py-2 rounded-lg px-2 hover:bg-neutral cursor-pointer duration-75 relative" onClick={isVisible ? handleClickHide : handleClickShow} onMouseOver={handleMouseOver} onMouseMove={handleMouseMove} onMouseOut={handleMouseOut}>
                    {isVisible ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.1" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.1" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    )}
                    {showTooltip && (
                      <div
                        className="absolute text-sm bg-black text-white p-1 rounded"
                        style={{
                          left: `${tooltipPosition.x + 10}px`,
                          top: `${tooltipPosition.y + 10}px`,
                        }}
                      >
                        {t("changingVisibility")}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Fragment>
            <div className="text-[18px] mt-2 cursor-pointer" onClick={onClick}>
              {children}
            </div>
            <div className="flex justify-between pb-8 items-center">
              <div className="text-[19px] flex items-center">
                <div className="pt-1">{price}</div>
                <FaEthereum className="text-2xl mx-2" />
              </div>
              {showSell ? (
                <div className="flex items-end gap-2">
                  <div className="transition-all py-2 rounded-lg px-2 hover:bg-neutral cursor-pointer duration-75" onClick={isVisible ? handleClickHide : handleClickShow} onMouseOver={handleMouseOver} onMouseMove={handleMouseMove} onMouseOut={handleMouseOut}>
                    {isVisible ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.1" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.1" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    )}
                    {showTooltip && (
                      <div
                        className="absolute text-sm bg-black text-white p-1 rounded"
                        style={{
                          left: `${tooltipPosition.x + 10}px`,
                          top: `${tooltipPosition.y + 10}px`,
                        }}
                      >
                        {t("changingVisibility")}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                showCancel && <BorderButton onClick={handleCancel}>{t("cancelSell")}</BorderButton>
              )}
            </div>
            {showSell && (
              <>
                <div className="flex justify-center gap-4 mb-4">
                  <div>
                    <BorderButton className={"font-bold w-32"} onClick={() => handleExpand("sell")}>
                      {expandedSection === "sell" ? t("collapse") : t("sell")}
                    </BorderButton>
                  </div>

                  <div>
                    <BorderButton className="w-32" onClick={() => handleExpand("transfer")}>
                      {t("transfer")}
                    </BorderButton>
                  </div>
                </div>

                <div className={`overflow-hidden transition-all duration-500 ${expandedSection === "sell" ? "max-h-[500px]" : "max-h-0"}`}>
                  <SellArea tokenId={tokenId} onSuccess={handleSellSuccess} />
                </div>

                <div className={`overflow-hidden transition-all duration-500 ${expandedSection === "transfer" ? "max-h-[500px]" : "max-h-0"}`}>
                  <div className="grid gap-3">
                    <SimpleInput
                      className={"mt-6"}
                      type="text"
                      name="Address"
                      title="Address"
                      placeholder="Address"
                      isValid={address?.length !== 0}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    />
                    <div onClick={checkWalletExists} className="flex gap-1 hover:text-warning cursor-pointer transition-colors items-center text-lg">
                      <p>{t("checkAddress")}</p>
                      <FaCircleQuestion size={20} className="h-8 text-info" />
                    </div>
                    {isAddressValid && (
                      <div className="flex gap-1 cursor-default transition-colors items-center text-lg">
                        <p>{t("addressIsValid")}</p>
                        <MdOutlineVerified size={20} className="h-8 text-success" />
                      </div>
                    )}{" "}
                    {isAddressValid === false && (
                      <div className="flex gap-1 cursor-default transition-colors items-center text-lg">
                        <p>{t("addressNotValid")}</p>
                        <BiErrorAlt size={20} className="h-8 text-error" />
                      </div>
                    )}
                    <BorderButton onClick={handleTransfer}>{t("transfer")}</BorderButton>
                  </div>
                </div>
              </>
            )}
          </Fragment>
        )}
      </div>

      {/* Div for Transfer Success */}
      {isDialogOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setIsDialogOpen(false)} // Click outside to close
        >
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-lg w-full">
            <button
              className="btn btn-sm btn-circle btn-ghost hover:bg-red-500 right-2 top-2"
              onClick={() => setIsDialogOpen(false)}
            >
              ✕
            </button>
            <p className="text-lg font-semibold mb-2">
              {t("transferSuccess")}
            </p>
            <div className="flex items-center justify-center gap-2">
              <p className="flex justify-center text-lg bg-green-400 p-1 rounded-lg mt-2 font-semibold mb-2">
                {t("tokenNumber")}: {tokenId}
              </p>
            </div>
            <p className="text-lg font-semibold mb-2">
              {t("yourNftIsNowTrackableAt")}
            </p>
            <div className="flex items-center justify-center gap-2 mb-2">
              <a
                href={`https://polygonscan.com/token/0xb0df35d093752d7faf6bc3d4304cefccabe7a86a?a=${tokenId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-400 p-1 rounded-lg mt-2"
              >
                {t("viewOnPolygonScan")}
              </a>
            </div>
            <p className="text-lg font-semibold mb-2">
              {t("visitDocumentation")}
              <a href="/help-transfer-nft"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400"
              >
                {" "}{t("visitDocumentationLink")}{" "}
              </a>
              {t("visitDocumentationEnd")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCard;
