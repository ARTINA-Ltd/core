import React, { useState, useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import BorderButton from "./../../Buttons/BorderButton";

export default function AllNftDialog({ likedNfts }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation(["dashboard"]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [setIsOpen]);

  const handleOpenDialog = () => {
    document.getElementById("all-nft-modal").showModal();
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    document.getElementById("all-nft-modal").close();
  };

  return (
    <div className="card flex justify-content-center">
      {/* Button to open dialog */}
      <div
        className="w-full bg-accent hover:bg-primary text-accent-content hover:text-primary-content cursor-pointer mt-3 py-1 group rounded-lg text-center flex items-center justify-center gap-4"
        onClick={handleOpenDialog}
      >
        {t("showAll")}
        <div className="pl-4 align-middle group-hover:-translate-x-2 transition-all duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.3" stroke="currentColor" width={"1em"}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </div>
      </div>

      {/* Dialog modal */}
      <dialog id="all-nft-modal" className="modal w-[70vw] font-b4 sm:w-[95%] mx-auto">
        <div className="modal-box">
          <form method="dialog">
            {/* Close button */}
            <button onClick={handleCloseDialog} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-xl hover:bg-red-500 hover:text-black">
              <MdOutlineClose />
            </button>
          </form>

          {/* Header */}
          <div className="my-8">
            <p className="font-b7 text-lg">{t("likedNFTs")}</p>
          </div>

          {/* Liked NFTs Table */}
          <div className="overflow-x-auto">
            <table className="dashboard-table w-full text-center">
              <thead>
                <tr>
                  <th className="text-md font-b4">{t("nftPhoto")}</th>
                  <th className="text-md font-b4">{t("name")}</th>
                  <th className="text-md font-b4">{t("price")}</th>
                  <th />
                </tr>
              </thead>

              <tbody>
                {likedNfts && likedNfts.length > 0 ? (
                  likedNfts.map((item, index) => (
                    <tr key={index} className="group cursor-pointer hover:bg-slate-50 rounded-xl transition-all font-b4 sm:text-xs" onClick={() => navigate(`/nft-details/${item.token_id}`)}>
                      <td>
                        <div className="flex justify-center w-full">
                          <img src={item.image_url} alt="" className="w-[42px] h-[42px] rounded-xl" />
                        </div>
                      </td>
                      <td>{item.name}</td>
                      <td>{item.last_price}</td>
                      <td className="pl-4 align-middle group-hover:-translate-x-2 transition-all duration-200 sm:pl-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.3" stroke="currentColor" width={"1em"}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      {t("noData")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex justify-end items-center mt-7 gap-3">
            <BorderButton onClick={handleCloseDialog} className="font-b4 text-center">
              {t("cancel")}
            </BorderButton>
          </div>
        </div>
      </dialog>
    </div>
  );
}
