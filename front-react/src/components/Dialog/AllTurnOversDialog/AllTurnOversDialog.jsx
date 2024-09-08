import React, { useState, useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useTranslation } from "react-i18next";
import BorderButton from "./../../Buttons/BorderButton";
import moment from "moment"; // To format the created_at timestamp

export default function AllTurnOversDialog({ turnovers }) {
  const [isOpen, setIsOpen] = useState(false);
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
    document.getElementById("all-turnovers-modal").showModal();
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    document.getElementById("all-turnovers-modal").close();
  };

  const formatCurrency = (currency) => {
    return currency === 1 ? "تومان" : "اتریوم"; // Assuming 1 = "تومان" and others = "اتریوم"
  };

  const formatSide = (side) => {
    return side === "deposit" ? t("deposit") : t("withdrawal");
  };

  return (
    <div className="card flex justify-content-center">
      {/* Button to open dialog */}
      <div
        className="w-full bg-accent hover:bg-primary text-accent-content hover:text-primary-content cursor-pointer mt-3 py-1 group rounded-lg text-center flex items-center justify-center gap-4"
        onClick={handleOpenDialog}
      >
        {t("showAll")}{" "}
        <div className="pl-4 align-middle group-hover:-translate-x-2 transition-all duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.3" stroke="currentColor" width={"1em"}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </div>
      </div>

      {/* Dialog modal */}
      <dialog id="all-turnovers-modal" className="modal w-[70vw] font-b4 sm:w-[95%] mx-auto">
        <div className="modal-box">
          <form method="dialog">
            {/* Close button */}
            <button onClick={handleCloseDialog} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-xl hover:bg-red-500 hover:text-black">
              <MdOutlineClose />
            </button>
          </form>

          {/* Header */}
          <div className="my-4">
            <p className="font-b7 text-lg">{t("sellNFT")}</p>
          </div>

          {/* Turnovers Table */}
          <div className="overflow-x-auto">
            <table className="dashboard-table w-full text-center">
              <thead>
                <tr>
                  <th className="text-md font-b4">{t("amount")}</th>
                  <th className="text-md font-b4">{t("transactionCurrency")}</th>
                  <th className="text-md font-b4">{t("side")}</th>
                  <th className="text-md font-b4">{t("status")}</th>
                  <th className="text-md font-b4">{t("createdAt")}</th>
                </tr>
              </thead>

              <tbody>
                {turnovers && turnovers.length > 0 ? (
                  turnovers.map((item, index) => (
                    <tr key={index} className="group cursor-pointer hover:bg-slate-50 rounded-xl transition-all font-b4 sm:text-xs">
                      <td>{item.amount}</td>
                      <td>{formatCurrency(item.transaction_currency)}</td>
                      <td>{formatSide(item.side)}</td>
                      <td>{t(item.status)}</td>
                      <td>{moment(item.created_at).format("YYYY-MM-DD HH:mm:ss")}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
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
