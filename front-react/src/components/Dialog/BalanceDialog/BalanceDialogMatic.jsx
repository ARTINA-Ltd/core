import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import SimpleInput from "../../Inputs/SimpleInput";
import { MdOutlineClose } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { Notify } from "notiflix/build/notiflix-notify-aio";
const BalanceDialogMatic = () => {
  const [getData, setData] = useState();
  const [isCharge, setIsCharge] = useState(false);
  const [buyAmount, setBuyAmount] = useState("");
  const [sellAmount, setSellAmount] = useState("");
  const [address, setAddress] = useState("");
  const [ethPrice, setEthPrice] = useState({});
  const [maticPrice, setMaticPrice] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation(["wallets"]);
  const [currentTab, setCurrentTab] = useState("Ethereum");

  const getBalance = async () => {
    axios
      .get("https://api.artina.org/api/account/user-turnover/get_balance/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
        mode: "cors",
      })
      .then((res) => {
        setData(res.data);
        console.log(res.data);
        if (res.data && res.data.wallet_address) {
          setAddress(res.data.wallet_address);
        }
      })
      .catch((e) => {});
  };

  useEffect(() => {
    if (isOpen) {
      const fetchData = async () => {
        try {
          const response = await axios.get("https://api.artina.org/api/account/CryptoViewSet/CryptoPrice_ETH/", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
            },
            mode: "cors",
          });
          setEthPrice(response.data);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
        try {
          const response = await axios.get("https://api.artina.org/api/account/CryptoViewSet/CryptoPrice_MATIC/", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
            },
            mode: "cors",
          });
          setMaticPrice(response.data);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };

      fetchData();

      const intervalId = setInterval(fetchData, 8000);

      return () => clearInterval(intervalId);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [setIsOpen]);

  const cryptoBuy = async (symbol, amount, price) => {
    try {
      axios
        .post(
          "https://api.artina.org/api/account/CryptoViewSet/BuyCrypto/",
          { symbol: symbol, amount: amount, price: price },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
            },
          }
        )
        .then(() => {
          Notify.success("your request has been successfull.");
          console.log();
        })
        .catch((err) => {
          Notify.failure("there was an error!");
          console.log(err);
        });
    } catch {}
    getBalance();
  };

  const cryptoSell = async (symbol, amount, price) => {
    try {
      axios
        .post(
          "https://api.artina.org/api/account/CryptoViewSet/SellCrypto/",
          { symbol: symbol, amount: amount, price: price },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
            },
          }
        )
        .then(() => {
          Notify.success("your request has been successfull.");
          console.log();
        })
        .catch((err) => {
          Notify.failure("there was an error!");
          console.log(err);
        });
    } catch {}
    getBalance();
  };

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
              {t("createWallet")}
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
          document.getElementById("crypto-wallet").showModal();
          getBalance();
          setIsCharge(false);
          setIsOpen(true);
        }}
      >
        {t("maticWallet")}{" "}
      </div>
      <dialog id="crypto-wallet" className="modal w-[60rem] font-b4 sm:w-[90%] mx-auto">
        <div className="modal-box">
          <form method="dialog">
            <button onClick={() => setIsOpen(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-xl hover:bg-red-500 hover:text-black">
              <MdOutlineClose />
            </button>
          </form>
          <div className="flex gap-4 mr-auto my-4 mt-6">
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
          <div role="tablist" className="tabs tabs-boxed">
            <div
              role="tab"
              onClick={() => {
                setCurrentTab("Ethereum");
              }}
              className={`tab bg-base-300 ${currentTab === "Ethereum" && "tab-active"}`}
            >
              Ethereum
            </div>
            <div
              role="tab"
              onClick={() => {
                setCurrentTab("Matic");
              }}
              className={`tab bg-base-300 ${currentTab === "Matic" && "tab-active"}`}
            >
              Matic
            </div>
          </div>
          <div className="w-full gap-4 font-b4 rounded-b-md">
            <div className=" rounded-xl w-full py-8 flex items-start justify-between  gap-4 relative group overflow-hidden sm:py-5">
              <div className="text-lg px-4 lg:text-md sm:px-2 sm:text-sm">{currentTab === "Ethereum" ? `${t("yourETH")} ${getData ? getData.eth_balance : "0"}` : `${t("yourMatic")} ${getData ? getData.matic_balance : "0"}`} </div>
            </div>
            <div className="px-4">
              <p>Buy Price: {currentTab === "Ethereum" ? ethPrice.ETH_buy_price : maticPrice.MATIC_buy_price}</p>
              <p>Sell Price: {currentTab === "Ethereum" ? ethPrice.ETH_sell_price : maticPrice.MATIC_sell_price}</p>
            </div>
            <div className="w-full flex flex-col gap-8  my-4  shadow-md  p-4 rounded-md">
              <div className="w-full flex gap-4 flex-col items-center font-b4 mt-4">
                <p className="self-start font-bold mb-4">{t("buy")}</p>
                <div className="w-full flex">
                  <SimpleInput type="number" title={`${t("amount")} ( ${currentTab === "Ethereum" ? "Ethereum" : "Matic"})`} placeholder={t("example")} isValid={buyAmount != false} validationError={t("required")} onChange={(e) => setBuyAmount(e.target.value)} />
                  <p>{buyAmount ? ` قیمت تمام شده ${currentTab === "Ethereum" ? ethPrice.ETH_buy_price * buyAmount : maticPrice.MATIC_buy_price * buyAmount}` : ""}</p>
                </div>
                <div
                  className="border-[1px] cursor-pointer border-green-500 bg-green-50 text-green-500 rounded-xl py-2 px-6 hover:scale-105 transition-all sm:text-xs sm:px-4 self-start"
                  onClick={() => {
                    cryptoBuy(currentTab === "Ethereum" ? "ETHTMN" : "MATICTMN", buyAmount, currentTab === "Ethereum" ? ethPrice.ETH_buy_price : maticPrice.MATIC_buy_price);
                  }}
                >
                  {t("buy")}
                </div>
              </div>

              <div className="w-full flex gap-4 flex-col items-center font-b4 border-t-2 border-t-primary border-opacity-60 pt-4">
                <p className="self-start font-bold mb-4">{t("sell")}</p>
                <SimpleInput type="number" title={`${t("amount")}  (${currentTab === "Ethereum" ? "Ethereum" : "Matic"})`} placeholder={t("example")} isValid={sellAmount != false} validationError={t("required")} onChange={(e) => setSellAmount(e.target.value)} />
                <p>{sellAmount ? ` قیمت تمام شده ${currentTab === "Ethereum" ? ethPrice.ETH_sell_price * sellAmount : maticPrice.MATIC_sell_price * sellAmount}` : ""}</p>
                <div
                  className="border-[1px] cursor-pointer border-red-500 bg-red-50 text-red-500 rounded-xl py-2 px-10 hover:scale-105 transition-all sm:text-xs sm:px-4 self-start"
                  onClick={() => {
                    cryptoSell(currentTab === "Ethereum" ? "ETHTMN" : "MATICTMN", sellAmount, currentTab === "Ethereum" ? ethPrice.ETH_sell_price : maticPrice.MATIC_sell_price);
                  }}
                >
                  {t("sell")}
                </div>
              </div>
            </div>
          </div>

          <div className="font-b4 w-full  flex justify-end items-center mt-7 gap-3 lg:flex-col">{footer()}</div>
        </div>
      </dialog>
    </div>
  );
};

export default BalanceDialogMatic;
