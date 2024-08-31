import React, { useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { MdOutlineClose } from "react-icons/md";
import SimpleInput from "../../Inputs/SimpleInput";
import { Notify } from "notiflix";
import { useTranslation } from "react-i18next";
import { UserContext } from "../../../App.js";

const BalanceDialog = () => {
  const [getData, setData] = useState();
  const [depoAmount, setDepoAmount] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const { t } = useTranslation(["wallets"]);
  const user = useContext(UserContext);

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
  }, [refresh]);

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
        console.log("on routing");
        window.open(res.data.url);
        setRefresh(!refresh);
      })
      .catch(console.log);
  };

  const updateBalanceWithdraw = () => {
    if (withdrawAmount === "" || withdrawAmount === undefined) {
      Notify.failure("مقدار عددی را وارد کنید");
      return;
    }
    if (withdrawAmount < 10000) {
      Notify.failure("مقدار وارد شده باید بیشتر از 10000 تومان باشد");
      return;
    }
    axios
      .post(
        "https://api.artina.org/api/account/WithdrawalViewSet/",
        {
          shaba_number: user.data.shaba_number,
          amount: withdrawAmount,
          user: user.data.id,
          reference_number: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
          mode: "cors",
        }
      )
      .then((res) => {
        Notify.success("درخواست شما با موفقیت ثبت شد");
        setRefresh(!refresh);
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
        setRefresh(!refresh);
        Notify.failure("خطا");
      });
  };

  return (
    <div className="card flex justify-content-center">
      <div
        className="w-full cursor-pointer py-2 px-3 text-sm hover:bg-[#0000aa07]"
        onClick={() => {
          document.getElementById("wallet").showModal();
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
              onClick={updateBalanceDepo}
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
              isValid={withdrawAmount != ""}
              validationError={t("required")}
              onChange={(e) => setWithdrawAmount(e.target.value)}
            />
            <div
              className="border-[1px] cursor-pointer border-red-500 bg-red-50 w-36 text-center text-red-500 rounded-xl py-2  hover:scale-105 transition-all sm:text-xs sm:px-4 sm:w-[50%]"
              onClick={updateBalanceWithdraw}
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
