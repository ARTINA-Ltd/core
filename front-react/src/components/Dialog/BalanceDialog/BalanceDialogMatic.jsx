import { Dialog } from "primereact/dialog";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import SimpleInput from "../../Inputs/SimpleInput";
import { Notify } from "notiflix";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n.js";
const BalanceDialogMatic = () => {
  const [visible, setVisible] = useState(false);
  const [getData, setData] = useState();
  const [isCharge, setIsCharge] = useState(false);
  const [amount, setAmount] = useState();
  const [address, setAddress] = useState("");
  const { t } = useTranslation(["wallets"]);
  const [currentTab, setCurrentTab] = useState(1);

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
  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    Notify.success("آدرس در کلیپ بورد کپی شد.");
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
        .catch((res) => {
          if (res.status === 400) {
            Notify.failure("موجودی شما برای انجام تراکنش کافی نمی‌باشد");
          }
          Notify.failure("عملیات ناموفق بود لطفا بعدا دوباره تلاش کنید.");
        });
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
          Notify.success("با موفقیت برداشت شد");
        })
        .catch((res) => {
          Notify.failure("خطا");
          console.log(res);
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
            <div className="text-sm sm:text-xs cursor-pointer" onClick={handleCopy}>
              {t("walletAddress")} <span> </span>
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
        style={{ backgroundColor: "black", direction: i18n.dir() === "rtl" && "rtl" }}
        onHide={() => {
          setVisible(false);
          setIsCharge(false);
        }}
        className="w-[30rem] font-b4 sm:w-[90%] background"
      >
        <div role="tablist" className="tabs tabs-boxed">
          <div
            role="tab"
            onClick={() => {
              setCurrentTab(1);
            }}
            className={`tab ${currentTab === 1 && "tab-active"}`}
          >
            Tab 1
          </div>
          <div
            role="tab"
            onClick={() => {
              setCurrentTab(2);
            }}
            className={`tab ${currentTab === 2 && "tab-active"}`}
          >
            Tab 2
          </div>
        </div>
        <div className="w-full gap-4 font-b4">
          <div className=" rounded-xl w-full py-8 flex items-start justify-between  gap-4 relative group overflow-hidden sm:py-5">
            <div className="text-2xl font-b6 px-4 sm:text-sm"> {t("maticInventory")}</div>
            <div className="text-lg px-10 self-end lg:text-md sm:px-2 sm:text-sm">{getData ? getData.matic_balance : ""} Matic</div>
          </div>
          <div className="w-full flex flex-col gap-8  my-4  shadow-md bg-base-100 p-4 rounded-md">
            <div className="w-full flex gap-4 flex-col items-center font-b4 mt-4">
              <p className="self-start font-bold mb-4">شارژ کیف پول</p>
              <SimpleInput type="number" title="مقدار شارژ (Matic)" placeholder="مثلا: 100" isValid={amount != ""} validationError="نمی‌تواند خالی باشد" onChange={(e) => setAmount(e.target.value)} />
              <div
                className="border-[1px] cursor-pointer border-green-500 bg-green-50 text-green-500 rounded-xl py-2 px-6 hover:scale-105 transition-all sm:text-xs sm:px-4 self-start"
                onClick={() => {
                  updateBalance("deposit");
                }}
              >
                {t("recharge")}
              </div>
            </div>

            <div className="w-full flex gap-4 flex-col items-center font-b4 border-t-2 border-t-[#4e45d0] border-opacity-60 pt-4">
              <p className="self-start font-bold mb-4">برداشت از کیف پول</p>
              <SimpleInput type="number" title="مقدار برداشت (Matic)" placeholder=" مثلا: 100" isValid={amount != ""} validationError="نمی‌تواند خالی باشد" onChange={(e) => setAmount(e.target.value)} />
              <div
                className="border-[1px] cursor-pointer border-red-500 bg-red-50 text-red-500 rounded-xl py-2 px-10 hover:scale-105 transition-all sm:text-xs sm:px-4 self-start"
                onClick={() => {
                  updateBalance("withraw");
                }}
              >
                {t("withdraw")}
              </div>
            </div>
          </div>
        </div>

        <div className="font-b4 w-full flex justify-end items-center mt-7 gap-3 lg:flex-col">{footer()}</div>
      </Dialog>
    </div>
  );
};

export default BalanceDialogMatic;
