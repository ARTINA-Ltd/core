import { Dialog } from "primereact/dialog";
import React, { useEffect } from "react";
import { useState } from "react";
import BorderButton from "../../Buttons/BorderButton";
import { Button } from "primereact/button";
import axios from "axios";
import SimpleInput from "../../Inputs/SimpleInput";
import { Notify } from "notiflix";

const BalanceDialogMatic = () => {
  const [visible, setVisible] = useState(false);
  const [getData, setData] = useState();
  const [isCharge, setIsCharge] = useState(false);
  const [amount, setAmount] = useState();
  const [action, setAction] = useState();
  const [address, setAddress] = useState("");

  useEffect(() => {
    axios
      .get("https://api.artina.org/api/account/Transaction/get_balance/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
        mode: "cors",
      })
      .then((res) => {
        console.log("Test")
        console.log(res)
        console.log("Test")
        setData(res.data);
        console.log(res.data.matic_balance)
        if (res.data && res.data.wallet_address) {
          setAddress(res.data.wallet_address);
        }
      })
      .catch((e) => { });
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
          Notify.success("کیف پول شما با موفقیت ساخته شد")
        }

      })
      .catch((error) => {
        console.log(error);
        Notify.failure("خطا در ساخت کیف پول");
      });
  };


  const updateMatic = () => {
    axios.post(
      "https://api.artina.org/api/account/payment/",
      { amount: amount },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
        mode: "cors",
      }
    ).then((res) => {
      window.open(res.data.url)
    }).catch(console.log);
  }



  const updateBalance = (act) => {
    if (act == "deposit") {
      axios.post(
        "https://api.artina.org/api/account/Transaction/",
        { matic_amount: parseInt(amount) },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
          mode: "cors",
        }
      ).then((res) => { 
        if (res.status === 200) {
            Notify.success("کیف پول شما با موفقیت شارژ شد")
        }
        else if (res.status === 400) {
            Notify.failure("موجودی شما برای انجام تراکنش کافی نمی‌باشد")
        }
        // window.open(res.data.url) 
    }).catch(console.log);
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
          if (act == "deposit") {
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </div>
      ) : (
        ""
      )}

      <p className="font-b9">کیف پول</p>
    </div>
  );

  const footer = () => {
    if (isCharge === false) {
      return (
        <>
          {address && (
            <div className="text-lg">
              آدرس کیف پول: {address}
            </div>
          )}
          {!address && (<div
            className="border-[1px] cursor-pointer border-indigo-500 bg-indigo-100 text-indigo-500 rounded-xl py-2 px-6 hover:scale-105 transition-all"
            onClick={() => {
              createWallet();
            }}
          >
            ساخت کیف پول
          </div>
          )}
          <div
            className="border-[1px] cursor-pointer border-red-500 bg-red-50 text-red-500 rounded-xl py-2 px-10 hover:scale-105 transition-all"
            onClick={() => {
              if (isCharge == true) {
                updateBalance("withraw");
              } else {
                setIsCharge(true);
              }
              setAction("withraw");
            }}
          >
            برداشت
          </div>
          <div
            className="border-[1px] cursor-pointer border-green-500 bg-green-50 text-green-500 rounded-xl py-2 px-6 hover:scale-105 transition-all"
            onClick={() => {
              if (isCharge == true) {
                updateBalance("deposit");
              } else {
                setIsCharge(true);
              }
              setAction("deposit");
            }}
          >
            شارژ کیف پول
          </div>
        </>
      );
    } else if (action == "deposit") {
      return (
        <div
          className="border-[1px] cursor-pointer border-green-500 bg-green-50 text-green-500 rounded-xl py-2 px-6 hover:scale-105 transition-all"
          onClick={() => {
            if (isCharge == true) {
              updateBalance("deposit");
            } else {
              setIsCharge(true);
            }
            setAction("deposit");
          }}
        >
          شارژ کیف پول
        </div>
      );
    } else {
      return (
        <div
          className="border-[1px] cursor-pointer border-red-500 bg-red-50 text-red-500 rounded-xl py-2 px-10 hover:scale-105 transition-all"
          onClick={() => {
            if (isCharge == true) {
              updateBalance("withraw");
            } else {
              setIsCharge(true);
            }
            setAction("withraw");
          }}
        >
          برداشت
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
        کیف پول Matic
      </div>

      <Dialog
        header={Header}
        visible={visible}
        style={{ width: "70vw", direction: "rtl" }}
        onHide={() => {
          setVisible(false);
          setIsCharge(false);
        }}
        className="font-b4"
      >
        {!isCharge ? (
          <div className="w-full flex gap-4 font-b4">
            <div className="bg-[#4e45d0] rounded-xl w-full py-20 flex flex-col items-start justify-center text-white gap-4 relative group overflow-hidden">
              <img
                src="/mand1.png"
                className=" opacity-[15%] absolute top-1/2 -translate-y-1/2 pointer-events-none overflow-hidden group-hover:scale-110 transition-all  duration-700"
              />
              <div className="text-2xl font-b6 px-10">
                موجودی Matic
              </div>
              <div className="text-lg text-yellow-300 px-10 self-end">
                {getData ? getData.matic_balance : ""} Matic
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="w-full flex gap-4 flex-col items-center font-b4 mt-4">
              <SimpleInput
                type="number"
                title="مقدار(Matic)"
                placeholder="مثلا: 100"
                isValid={amount != ""}
                validationError="نمی‌تواند خالی باشد"
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
        )}
        <div className="font-b4 w-full flex justify-end items-center mt-7 gap-3">
          {footer()}
        </div>
      </Dialog>
    </div>
  );
};

export default BalanceDialogMatic;
