import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { MdOutlineClose } from "react-icons/md";
import SimpleInput from "../../Inputs/SimpleInput";
import { Notify } from "notiflix";
import { useTranslation } from "react-i18next";

const BalanceDialog = () => {
  const [getData, setData] = useState();
  const [isCharge, setIsCharge] = useState(false);
  const [depoAmount, setDepoAmount] = useState("");
  const [widthdrawAmount, setWidthdeawAmount] = useState("");
  const { t } = useTranslation(["wallets"]);

  useEffect(() => {
    axios
      .get("https://api.artina.org/api/account/user-balance/get_balance/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
        mode: "cors",
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => {});
  }, []);

  const updateBalanceDepo = () => {
    if (depoAmount === "" || depoAmount === undefined) {
      Notify.failure("مقدار عددی را وارد کنید");
      return;
    }
    if (depoAmount < 10000) {
      Notify.failure("مقدار وارد شده باید بیشتر از 10000 تومان باشد");
      return;
    }
    axios
      .post(
        "https://api.artina.org/api/account/payment/",
        { amount: depoAmount * 10 },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
          mode: "cors",
        }
      )
      .then((res) => {
        window.open(res.data.url);
      })
      .catch(console.log);
  };
  const updateBalancedthdraw = () => {
    if (widthdrawAmount === "" || widthdrawAmount === undefined) {
      Notify.failure("مقدار عددی را وارد کنید");
      return;
    }
    if (widthdrawAmount < 10000) {
      Notify.failure("مقدار وارد شده باید بیشتر از 10000 تومان باشد");
      return;
    }
    axios
      .post(
        "https://api.artina.org/api/account/user-balance/updating_balance/",
        {
          currency: "rial",
          transaction_type: "withraw", //withraw
          amount: widthdrawAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
          mode: "cors",
        }
      )
      .then((res) => {
        Notify.failure("با موفقیت برداشت شد");
      })
      .catch((res) => {
        console.log(res);
        Notify.failure("خطا");
      });
  };
  return (
    <div className="card flex justify-content-center">
      <div
        className="w-full cursor-pointer py-2 px-3 text-sm hover:bg-[#0000aa07]"
        onClick={() => {
          document.getElementById("wallet").showModal();

          setIsCharge(false);
        }}
      >
        {t("wallet")}
      </div>

      <dialog id="wallet" className="modal w-[60rem] font-b4 sm:w-[90%] mx-auto">
        <div className="modal-box">
          <form method="dialog" className="my-8">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-xl hover:bg-red-500 hover:text-black">
              <MdOutlineClose />
            </button>
          </form>
          <div className="flex gap-4">
            {isCharge ? (
              <div className="cursor-pointer" onClick={() => setIsCharge(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            ) : (
              ""
            )}

            <p className="font-b9">{t("wallet")}</p>
          </div>
          <div className="w-full gap-12 font-b4 flex flex-col mt-8 mb-12">
            <div className="flex w-full pb-4 justify-between items-start gap-4 relative group overflow-hidden sm:py-4 border-b-2 border-b-primary border-opacity-60">
              <div className="text-xl font-b6  sm:text-xs"> {t("negotiable")}</div>
              <div className="text-lg text-accent px-10 self-end">
                {getData ? getData.rial_available_balance : ""} {t("tooman")}
              </div>
            </div>
            <div className="flex w-full -mt-8 items-start justify-between gap-4 relative group overflow-hidden sm:py-4">
              <div className="text-xl font-b6  sm:text-xs">{t("unNegotiable")}</div>
              <div className="text-lg text-accent px-10 self-end">
                {getData ? getData.rial_unavailable_balance : ""} {t("tooman")}
              </div>
            </div>
          </div>
          <div className="pb-8 border-b-2 border-primary border-opacity-60 flex flex-col gap-4">
            <div className="text-xl font-b6  sm:text-xs">{t("recharge")}</div>
            <div>
              <SimpleInput
                type="number"
                title={t("amount")}
                placeholder="ex: 100000"
                // eslint-disable-next-line eqeqeq
                isValid={depoAmount != ""}
                validationError={t("required")}
                onChange={(e) => setDepoAmount(e.target.value)}
              />
            </div>
            <div
              className="border-[1px] cursor-pointer border-green-500 bg-green-50 w-36 text-center text-green-500 rounded-xl py-2 hover:scale-105 transition-all sm:text-xs sm:px-4"
              onClick={() => {
                if (isCharge === true) {
                  updateBalanceDepo();
                } else {
                  setIsCharge(true);
                }
              }}
            >
              {t("recharge")}{" "}
            </div>
          </div>

          <div className="py-4 mt-4 flex flex-col gap-4">
            <div className="text-xl font-b6  sm:text-xs">{t("withdraw")}</div>

            <SimpleInput
              type="number"
              title={t("amount")}
              placeholder="ex: 100000"
              // eslint-disable-next-line eqeqeq
              isValid={widthdrawAmount != ""}
              validationError={t("required")}
              onChange={(e) => setWidthdeawAmount(e.target.value)}
            />
            <div
              className="border-[1px] cursor-pointer border-red-500 bg-red-50 w-36 text-center text-red-500 rounded-xl py-2  hover:scale-105 transition-all sm:text-xs sm:px-4 sm:w-[50%]"
              onClick={() => {
                if (isCharge === true) {
                  updateBalancedthdraw();
                } else {
                  setIsCharge(true);
                }
              }}
            >
              {t("withdraw")}
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default BalanceDialog;
