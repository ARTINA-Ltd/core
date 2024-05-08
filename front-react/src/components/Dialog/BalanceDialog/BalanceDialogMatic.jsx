import { Dialog } from "primereact/dialog";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import SimpleInput from "../../Inputs/SimpleInput";
import { Notify } from "notiflix";
import { useTranslation } from "react-i18next";

const BalanceDialogMatic = () => {
  const [visible, setVisible] = useState(false);
  const [getData, setData] = useState();
  const [isCharge, setIsCharge] = useState(false);
  const [amount, setAmount] = useState();
  const [action, setAction] = useState();
  const [address, setAddress] = useState("");
  const { t } = useTranslation(["wallets"]);

  useEffect(() => {
    axios
      .get("https://api.artina.org/api/account/Transaction/get_balance/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
        mode: "cors",
      })
      .then((res) => {
        setData(res.data);
        if (res.data && res.data.wallet_address) {
          setAddress(res.data.wallet_address);
        }
      })
      .catch((e) => {});
  }, []);

  const createWallet = () => {
    axios
      .post(
        "https://api.artina.org/api/account/wallet/create_wallet/",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
          mode: "cors",
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          const createdAddress = res.data.address;
          setAddress(createdAddress);
          Notify.success("کیف پول شما با موفقیت ساخته شد");
        }
      })
      .catch((error) => {
        console.log(error);
        Notify.failure("خطا در ساخت کیف پول");
      });
  };

  const updateBalance = (act) => {
    if (act === "deposit") {
      axios
        .post(
          "https://api.artina.org/api/account/Transaction/",
          { matic_amount: amount },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
            },
            mode: "cors",
          }
        )
        .then((res) => {
          if (res.status === 200) {
            Notify.success("کیف پول شما با موفقیت شارژ شد");
          } else if (res.status === 400) {
            Notify.failure("موجودی شما برای انجام تراکنش کافی نمی‌باشد");
          }
          // window.open(res.data.url)
        })
        .catch(console.log);
    } else {
      axios
        .post(
          "https://api.artina.org/api/account/user-balance/updating_balance/",
          {
            currency: "rial",
            transaction_type: act, //withraw
            amount: amount,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
            },
            mode: "cors",
          }
        )
        .then((res) => {
          if (act === "deposit") {
            Notify.success("با موفقیت شارژ شد");
          } else {
            Notify.failure("با موفقیت برداشت شد");
          }
        })
        .catch((res) => {
          console.log(res);
          Notify.failure("خطا");
        });
    }
  };

  const Header = (
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
  );

  const footer = () => {
    if (isCharge === false) {
      return (
        <div className="w-full flex flex-col justify-center items-center gap-4">
          {address && (
            <div className="text-lg lg:text-sm sm:text-xs">
              {t("walletAddress")}
              {address}
            </div>
          )}
          {!address && (
            <div
              className="border-[1px] cursor-pointer border-indigo-500 bg-indigo-100 text-indigo-500 rounded-xl py-2 px-3 hover:scale-105 transition-all"
              onClick={() => {
                createWallet();
              }}
            >
              ساخت کیف پول
            </div>
          )}
          <div className="flex gap-2  lg:w-[60%] sm:w-[90%] items-center">
            <div
              className="border-[1px] cursor-pointer w-48 text-center border-red-500 bg-red-50 text-red-500 rounded-xl py-2 px-3 hover:scale-105 transition-all sm:px-2 sm:text-xs sm:w-32 sm:flex sm:justify-center"
              onClick={() => {
                if (isCharge === true) {
                  updateBalance("withraw");
                } else {
                  setIsCharge(true);
                }
                setAction("withraw");
              }}
            >
              {t("withdraw")}
            </div>
            <div
              className="border-[1px] cursor-pointer w-48 text-center border-green-500 bg-green-50 text-green-500 rounded-xl py-2 px-6 hover:scale-105 transition-all sm:text-xs sm:px-4"
              onClick={() => {
                if (isCharge === true) {
                  updateBalance("deposit");
                } else {
                  setIsCharge(true);
                }
                setAction("deposit");
              }}
            >
              {t("recharge")}
            </div>
          </div>
        </div>
      );
    } else if (action === "deposit") {
      return (
        <div
          className="border-[1px] cursor-pointer border-green-500 bg-green-50 text-green-500 rounded-xl py-2 px-6 hover:scale-105 transition-all sm:text-xs sm:px-4"
          onClick={() => {
            if (isCharge === true) {
              updateBalance("deposit");
            } else {
              setIsCharge(true);
            }
            setAction("deposit");
          }}
        >
          {t("recharge")}
        </div>
      );
    } else {
      return (
        <div
          className="border-[1px] cursor-pointer border-red-500 bg-red-50 text-red-500 rounded-xl py-2 px-10 hover:scale-105 transition-all sm:text-xs sm:px-4"
          onClick={() => {
            if (isCharge === true) {
              updateBalance("withraw");
            } else {
              setIsCharge(true);
            }
            setAction("withraw");
          }}
        >
          {t("withdraw")}
        </div>
      );
    }
  };
  return (
    <div className="card flex justify-content-center">
      <div
        className="w-full cursor-pointer py-2 px-3 text-sm hover:bg-[#0000aa07]"
        onClick={() => {
          setVisible(true);
          setIsCharge(false);
        }}
      >
        {t("maticWallet")}{" "}
      </div>

      <Dialog
        header={Header}
        visible={visible}
        style={{ direction: "rtl" }}
        onHide={() => {
          setVisible(false);
          setIsCharge(false);
        }}
        className="w-[70vw] font-b4 sm:w-[90%]"
      >
        {!isCharge ? (
          <div className="w-full flex gap-4 font-b4">
            <div className="bg-[#4e45d0] rounded-xl w-full py-20 flex flex-col items-start justify-center text-white gap-4 relative group overflow-hidden sm:py-5">
              <img alt="" src="/mand1.png" className=" opacity-[15%] absolute top-1/2 -translate-y-1/2 pointer-events-none overflow-hidden group-hover:scale-110 transition-all  duration-700" />
              <div className="text-2xl font-b6 px-10 sm:text-sm"> {t("maticInventory")}</div>
              <div className="text-lg text-yellow-300 px-10 self-end lg:text-md sm:px-2 sm:text-sm">{getData ? getData.matic_balance : ""} Matic</div>
            </div>
          </div>
        ) : (
          <div>
            <div className="w-full flex gap-4 flex-col items-center font-b4 mt-4">
              <SimpleInput type="number" title="مقدار(Matic)" placeholder="مثلا: 100" isValid={amount != ""} validationError="نمی‌تواند خالی باشد" onChange={(e) => setAmount(e.target.value)} />
            </div>
          </div>
        )}
        <div className="font-b4 w-full flex justify-end items-center mt-7 gap-3 lg:flex-col">{footer()}</div>
      </Dialog>
    </div>
  );
};

export default BalanceDialogMatic;
