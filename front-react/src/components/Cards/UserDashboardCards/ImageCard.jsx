import React, { Fragment, useState, useCallback } from "react";
import CollectionDialog from "../../Dialog/CollectionDialog/CollectionDialog";
import BorderButton from "./../../Buttons/BorderButton";
import { useTranslation } from "react-i18next";
import SellArea from "./../../SellArea/SellArea";
import { FaEthereum } from "react-icons/fa";
import axios from "axios";
import i18n from "./../../../i18n";
import SimpleInput from "./../../Inputs/SimpleInput";
import { Notify } from "notiflix";

const ImageCard = ({ className, children, src, price, onClick, tokenId, showCancel, showSell = false, onClickShow, onClickHide, has_creator, visible, isForSale }) => {
  const [isVisible, setIsVisible] = useState(visible);
  const [isExpanded, setIsExpanded] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const { t } = useTranslation();

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

  const handleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const handleCancel = () => {
    axios
      .put(
        "https://api.artina.org/api/transaction/nfts/cancel_sell/",
        {
          token_id: tokenId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
          mode: "cors",
        }
      )
      .then((r) => {
        Notify.success("فروش برای این اثر لغو شد");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const dialog = () => {
    return (
      <dialog id="TransferDialog" className={`${i18n.dir() === "rtl" ? "text-right" : "text-left"} modal relative p-0 m-0 `}>
        <div className="modal-box p-0 m-0 bg-neutral">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost hover:bg-red-500 right-2 my-4 mx-4 mb-4">✕</button>
          </form>
          <div className="p-8">
            <SimpleInput className={"my-6"} type="text" title={t("walletaddress")} placeholder={t("example")} isValid={walletAddress !== "" && walletAddress.length > 24} validationError={t("required")} onChange={(e) => setWalletAddress(() => e.target.value)} defaultValue={""} />
            <BorderButton onClick={() => handleTransfer()}>Submit</BorderButton>
          </div>
        </div>
      </dialog>
    );
  };
  const handleTransfer = () => {
    axios
      .post(
        `https://api.artina.org/api/transaction/nfts/transferToUserWallet/`,
        {
          token_id: tokenId,
          address: walletAddress,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
          mode: "cors",
        }
      )
      .then((res) => {
        Notify.success("انتقال موفقیت آمیز بود");
      });
  };

  return (
    <div className={className}>
      <div className="relative transition-all cursor-pointer h-3/4 mb-10" onClick={onClick}>
        <img src={src} className="w-full rounded-lg object-cover p-2 h-full" alt="" />
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
                  <div className="transition-all py-2 rounded-lg px-2 hover:bg-neutral cursor-pointer duration-75" onClick={isVisible ? handleClickHide : handleClickShow}>
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
                  <div className="transition-all py-2 rounded-lg px-2 hover:bg-neutral cursor-pointer duration-75" onClick={isVisible ? handleClickHide : handleClickShow}>
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
                  </div>
                </div>
              ) : (
                showCancel && <BorderButton onClick={handleCancel}>{t("cancelSell")}</BorderButton>
              )}
            </div>
            {
              //  <BorderButton className={"font-bold mx-6 mb-1 w-20"} onClick={() => document.getElementById("TransferDialog").showModal()}>
              //     {t("transfer")}
              //   </BorderButton>
            }
            {showSell && (
              <div class="collapse collapse-arrow  -my-4 -mx-4 overflow-visible">
                <input type="checkbox" clas onClick={handleExpand} />
                <div class="collapse-title text-xl  font-medium m-0 ">
                  <BorderButton className={"font-bold w-20 mx-auto"}>{isExpanded ? t("collapse") : t("sell")}</BorderButton>
                </div>
                <div class="collapse-content w-full overflow-visible ">
                  <SellArea tokenId={tokenId} cancel={handleExpand} />
                </div>
              </div>
            )}
            {
              //dialog()
            }
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default ImageCard;
