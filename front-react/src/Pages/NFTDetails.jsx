import { useEffect, useState, useContext, Fragment } from "react";
import React from "react";
import Properties from "../ProductPageComponent/Properties";
import Recomendition from "../ProductPageComponent/Recomendition";
import axios from "axios";
import TestLayout from "../Layouts/TestLayout";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import { useParams } from "react-router";
import SimpleInput from "../components/Inputs/SimpleInput";
import { UserContext } from "../App";
import { Notify } from "notiflix";
import BorderButton from "../components/Buttons/BorderButton";
import CountdownTimer from "../components/CountDown/CountDown";
import { useTranslation } from "react-i18next";
import { IoMdClose } from "react-icons/io";

const NFTDetails = () => {
  const [data, setData] = useState();
  const [reqData, setReqData] = useState();
  const { id } = useParams();
  const [price, setPrice] = useState(0);
  const [ethereum, setEthereum] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const user = useContext(UserContext);
  const [like, setLike] = useState(false);
  const [likeColor, setLikeColor] = useState(false);
  const [shareCount, setShareCount] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [ethPrice, setEthPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [maticPrice, setMaticPrice] = useState(0);
  const [balance, setBalance] = useState(0);
  const { t } = useTranslation();

  const icons = {
    heart: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.9" stroke="currentColor" className="text-primary-content h-[40%]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    red_heart: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.9" stroke="currentColor" className="text-red-400 h-[40%] fill-red-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    eye: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.7" stroke="currentColor" className="text-primary-content h-[40%]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    share: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.6" stroke="currentColor" className="text-primary-content h-[40%]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
      </svg>
    ),
    x_mark: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-primary-content h-[40%]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
  };

  useEffect(() => {
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
      axios
        .get("https://api.artina.org/api/account/user-balance/get_balance/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
          mode: "cors",
        })
        .then((res) => {
          setBalance(res.data);
          console.log(res.data);
        });
    };

    fetchData();

    const intervalId = setInterval(fetchData, 8000);

    return () => clearInterval(intervalId);
  }, []);

  const handleClickShare = () => {
    navigator.clipboard.writeText(window.location.href);
    Notify.success("لینک کپی شد");
    axios
      .put(
        "https://api.artina.org/api/transaction/nfts/share_NFT/",
        {
          token_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
        }
      )
      .then((d) => {
        setShareCount(shareCount + 1);
      });
  };

  const handleClickLike = () => {
    axios
      .post(
        "https://api.artina.org/api/transaction/nft_ratings/like/",
        {
          token_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
        }
      )
      .then((res) => {
        Notify.success("با موفقیت ثبت شد");
        setLikeColor(true);
        setLikeCount(likeCount + 1);
      })
      .catch((res) => {
        if (res.response.data.detail === "Given token not valid for any token type") {
          Notify.warning("برای لایک کردن لطفا وارد حساب کاربری خود شوید");
        } else Notify.warning("قبلا پسندیده اید");
        console.log(res);
      });
  };

  useEffect(() => {
    axios
      .post("https://api.artina.org/api/transaction/nft-detail/", {
        token_id: id,
      })
      .then((d) => {
        setData(d.data.nft);
        setLikeCount(d.data.count);
        setShareCount(d.data.nft.share_count);
        setCountdown(d.data.nft.end_date);
      });

    axios
      .post("https://api.artina.org/api/transaction/nft_ratings/user_likes/", {
        token_id: id,
      })
      .then((d) => {
        // setLike(d.data.nft);
        console.log(d.data);
      });

    axios
      .put(
        "https://api.artina.org/api/transaction/nfts/view_NFT/",
        {
          token_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
        }
      )
      .then((d) => {
        console.log("view");
        console.log(d);
      });

    axios
      .post(
        "https://api.artina.org/api/transaction/orders/gettingorders/",
        {
          token_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
        }
      )
      .then((d) => {
        setReqData(d);
        console.log("_______Orders_______", d);
      })
      .catch((res) => console.log(res));

    userHasLiked();
  }, []);

  function userHasLiked() {
    axios
      .post(
        "https://api.artina.org/api/transaction/nft_ratings/user_has_liked/",
        {
          token_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
        }
      )
      .then((d) => {
        console.log("_Has User Like_");
        console.log(d.data);
        setLike(d.data);
        setLikeColor(d.data.user_has_liked ? true : false);
      })
      .catch((res) => {
        console.log(res);
        console.log("_Has User Like_");
      });
  }

  const cryptoBuy = async () => {
    if (amount * ethPrice.ETH_buy_price < 100000) {
      Notify.failure("مقدار باید از 100000 تومان بیشتر باشد");
      return;
    }
    try {
      axios
        .post(
          "https://api.artina.org/api/account/CryptoViewSet/BuyCrypto/",
          { symbol: "ETHTMN", amount: amount, price: ethPrice.ETH_buy_price },
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
          if (err.response.status === 403) {
            Notify.failure("درحال حاضر امکان معامله وجود ندارد");
          } else Notify.failure("there was an error!");
          console.log(err);
        });
    } catch {}
  };

  function addRequest() {
    axios
      .post(
        "https://api.artina.org/api/transaction/orders/",
        {
          token_id: id,
          fee: price.toFixed(0).toString(),
          eth_fee: ethereum,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
          mode: "cors",
        }
      )
      .then((response) => {
        Notify.success("پیشنهاد شما با موفقیت ثبت شد");
        window.location.reload(true);
      })
      .catch((exception) => {
        Notify.failure(exception.response.data.error);
      });
  }

  function formatString(inputString) {
    const maxLength = 12;
    const ellipsis = "...";

    // Check if the input string is longer than the desired length
    if (inputString === null) {
      return "_";
    } else if (inputString.length > maxLength + ellipsis.length * 2) {
      const firstPart = inputString.slice(0, maxLength);
      const lastPart = inputString.slice(-maxLength);
      return `${firstPart}${ellipsis}${lastPart}`;
    } else {
      // If the input string is already shorter, return it as is
      return inputString;
    }
  }

  return (
    <TestLayout>
      <div>
        <div className="flex gap-4 items-start lg:flex-col">
          <SimpleCard id="RightSide" className="bg-info w-full flex flex-col relative gap-6 items-center ">
            <div className="relative w-full">
              <img src={data ? data.image_url : ""} alt="" className="rounded-xl h-auto w-full object-cover" />
            </div>
            <div className="flex flex-col gap-5 w-full">
              <div className="flex gap-3 w-full">
                <div className={`bg-[#574eda] w-full h-16 rounded-xl flex justify-between items-center px-10 transition-all hover:bg-secondary hover:cursor-pointer sm:px-2 sm:h-10 sm:justify-around`} onClick={handleClickLike}>
                  {data && likeColor ? icons.red_heart : icons.heart}

                  <div className="text-primary-content text-[16px]">{likeCount}</div>
                </div>
                <div className="bg-[#574eda] w-full h-16 rounded-xl flex justify-between items-center px-10 transition-all hover:bg-secondary hover:cursor-pointer sm:px-2 sm:h-10 sm:justify-around">
                  {icons.eye}
                  <div className="text-primary-content text-[16px]">{data && data.view_count + 1}</div>
                </div>
                <div className="bg-[#574eda] w-full h-16 rounded-xl flex justify-between items-center px-10 transition-all hover:bg-secondary hover:cursor-pointer sm:px-2 sm:h-10 sm:justify-around" onClick={handleClickShare}>
                  {icons.share}
                  <div className="text-primary-content text-[16px]">{data && shareCount}</div>
                </div>
              </div>
            </div>
            {data?.end_date && data?.is_for_sale && (
              <div className="w-full h-[50px] flex justify-center items-center bg-base-100 text-base-content rounded-xl text-[20px]">
                {" "}
                <CountdownTimer end_date={data && countdown} className="" />
              </div>
            )}
          </SimpleCard>
          <SimpleCard id="LeftSide" className={"flex flex-col gap-8 bg-base-100 w-full sm:gap-8"}>
            <div className="flex items-center pt-3 sm:gap-2">
              <div className="text-[16px] opacity-40">{t("artName")}</div>
              <div className="text-[32px] mx-auto sm:text-[20px]">{data ? data.name : ""}</div>
            </div>

            <div className="flex items-center sm:gap-2">
              <div className="text-[16px] opacity-40">{t("artist")}</div>
              <div className="text-[16px] mx-auto">{data ? data.creator : ""}</div>
            </div>

            <div className="flex items-center sm:items-start sm:flex-col sm:gap-2">
              <div className="text-[16px] opacity-40">{t("hashBlock")}</div>
              <div className="text-[16px] mx-auto">{data ? formatString(data.blockHash) : ""}</div>
            </div>

            <div className="flex items-center sm:items-start gap-4 sm:flex-col sm:gap-2">
              <div className="flex gap-4">
                <div className="text-[16px] w-24 opacity-40">{t("transactionHash")}</div>
                <a href={`https://polygonscan.com/tx/${data ? data.transactionHash : ""}`} className="bg-neutral text-neutral-content hover:bg-[#e5e6eb] hover:text-gray-600 transition-all  py-1 text-sm px-3 rounded-md flex gap-1 items-center">
                  {t("blockchain")}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                  </svg>
                </a>
              </div>
              <div className="text-[16px] mx-auto">{data ? formatString(data.transactionHash) : ""}</div>
            </div>

            <div className="flex justify-around sm:flex-col sm:gap-2">
              <div className="relative gap-2 flex w-full">
                <div className=" text-[16px] w-24 opacity-40">{t("blockNo")}</div>
                <a
                  href={`https://polygonscan.com/block/${data ? data.blockNumber : ""}`}
                  className="bg-neutral hover:bg-[#e5e6eb] transition-all text-neutral-content hover:text-gray-600
                   py-1 text-sm px-1 rounded-md flex gap-1 items-center"
                >
                  {t("blockchain")}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    {/* make blockchain svg path */}
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                  </svg>
                </a>
                <div className="text-[16px] mx-auto">{data ? data.blockNumber : ""}</div>
              </div>
              <div className="relative flex w-full">
                <div className="text-[16px] opacity-40 mr-14 sm:mr-0">{t("transactionNo")}</div>
                <div className="text-[16px] mx-auto">{data ? data.transactionIndex : ""}</div>
              </div>
            </div>
            <div className="flex gap-12 items-center sm:items-start h-full sm:flex-col sm:gap-2 sm:mb-4">
              <div className="flex justify-between gap-8">
                <div className="text-[16px] opacity-40">{t("collectionName")}</div>
                <div className="text-[16px]">{data && data.collection ? data.collection.name : <div className="text-[16px]">ندارد</div>}</div>
              </div>

              <div className="flex gap-8">
                <div className="text-[16px] opacity-40">{t("category")}</div>
                <div className="text-[16px] self-start text-right">{data && data.category ? data.category.name : <div className="text-[16px]">ندارد</div>}</div>
              </div>
            </div>

            <div className="flex items-center h-full sm:flex-col sm:gap-2 sm:mb-4">
              <div className="text-[16px] opacity-40">{t("properties")}</div>
              <div className="text-[16px] mx-auto self-start text-right sm:mr-0">
                {data && data.traits ? (
                  data.traits.map((item, index) => (
                    <div key={index} className="flex justify-between gap-10">
                      <div className="text-[16px]">{index + 1}-</div>
                      <div className="text-[16px] opacity-40 text-cyan-900">{item.name}:</div>
                      <div className="text-[16px]">{item.type}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-[16px]">ندارد</div>
                )}
              </div>
            </div>

            <div className="flex items-center h-full sm:flex-col sm:gap-2 sm:mb-4">
              <div className="text-[16px] opacity-40">{t("description")}</div>
              <div className="text-[16px] mr-36 self-start text-right sm:mr-0">{data ? data.description : ""}</div>
            </div>
            <div className="w-full flex justify-between items-center">
              {data && data.has_physical ? (
                <Fragment>
                  <div className="bg-green-50 text-green-400  py-1 text-sm px-3 rounded-md">اثر نسخه فیزیکی دارد</div>
                </Fragment>
              ) : (
                <Fragment>
                  <div className="bg-red-50 text-red-400 py-1 text-sm px-3 rounded-md">اثر نسخه فیزیکی ندارد</div>
                </Fragment>
              )}

              <a href={data ? data.external_link : ""} className="bg-neutral hover:bg-[#e5e6eb] transition-all text-neutral-content hover:text-gray-600 py-1 text-sm px-3 rounded-md flex gap-1 items-center">
                {t("externalLink")}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                </svg>
              </a>
            </div>

            <div className="flex items-center justify-self-end bg-[#574eda] text-accent-content px-10 py-3 rounded-xl">
              <div className="text-[16px] opacity-50">{t("latestPrice")}</div>
              <div className="text-[22px] mx-auto">{data ? data.last_price : ""} اتریوم</div>
            </div>
          </SimpleCard>
        </div>
        <div className="flex gap-6 lg:flex-col">
          <SimpleCard className="bg-base-100 lg:w-full w-[calc(50%-1.5rem)] grow flex flex-col relative gap-3 items-center mt-4">
            <div className="flex items-center pt-3">
              <div className="text-[32px] mx-auto sm:text-[20px]">{t("offers")}</div>
            </div>
            <Properties requests={reqData ? reqData : null} nft={id} />
          </SimpleCard>

          {user && (data ? data.is_for_sale : true) ? (
            <Fragment>
              <SimpleCard id="UserRequests" className="bg-base-100 w-[calc(50%-1.5rem)] flex flex-col relative gap-3 items-center mt-4 lg:w-full sm:mt-0">
                <div className="flex items-center pt-3">
                  <div className="text-[32px] mx-auto sm:text-[20px]">پیشنهاد های شما</div>
                </div>
                <Recomendition requests={reqData ? reqData : undefined} nft={id} />

                {/* <hr className="text-black opacity-50 bg-black" /> */}

                <div className="bg-neutral text-neutral-content rounded-xl p-3 w-full">
                  <div className="w-full text-center font-b6 text-xl sm:mb-8">ثبت پیشنهاد جدید</div>
                  <div className="flex gap-1 w-full flex-col">
                    <div className="flex items-center justify-between sm:my-2">
                      <div className=" w-32">
                        <SimpleInput
                          type={"number"}
                          className={"rounded-lg "}
                          placeholder={"مثلا: 3"}
                          title="قیمت پیشنهادی شما به اتریوم"
                          onChange={(e) => {
                            setPrice(e.target.value * (Math.round(ethPrice.ETH_buy_price * 100) / 100));
                            setEthereum(e.target.value);
                          }}
                        />
                      </div>

                      <BorderButton className="w-36 text-center" onClick={ethereum > balance.eth_balance ? () => document.getElementById("insufficient-balance").showModal() : price !== 0 && addRequest}>
                        ثبت
                      </BorderButton>
                    </div>
                    <div className="flex w-full my-2 items-center gap-4">
                      <div className={`${ethereum > balance.eth_balance ? "text-error" : "text-success"}`}>
                        موجودی رمزارزی شما
                        <h1 className="my-2">اتریوم: {balance.eth_balance} </h1>
                      </div>

                      <div className={""}>
                        موجودی تومانی شما
                        <h1 className="my-2">تومان: {balance.rial_available_balance}</h1>
                      </div>
                    </div>
                    <div className="flex pr-4 text-xs sm:pr-0 sm:gap-2 sm:my-2">
                      قیمت به تومان:
                      <div className="text-indigo-600">&nbsp;{price}&nbsp;</div>
                      تومان
                    </div>
                  </div>
                </div>
              </SimpleCard>
            </Fragment>
          ) : (
            ""
          )}
        </div>
      </div>
      <dialog id="insufficient-balance" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form method="dialog">
            <button className="rounded-full hover:bg-error w-8 h-8 hover:text-error-content flex items-center justify-center absolute left-3 top-3'">
              <IoMdClose />
            </button>
          </form>
          <h3 className="font-bold text-lg">شما {ethereum - balance.eth_balance} اتریوم برای ارائه این پیشنهاد کم دارید!</h3>

          <p className="py-4">برای ادامه خرید لظفا موجودی خود را شارژ کنید!</p>
          <div className="flex w-full gap-4 justify-between items-center my-4 px-4">
            <div className="modal-action w-1/2">{<SimpleInput className={""} type="number" title={`${t("amount")}`} defaultValue={Number(ethereum - balance.eth_balance)} isValid={amount * ethPrice.ETH_buy_price > 100000} validationError={t("notLessThan")} onChange={(e) => setAmount(e.target.value)} />}</div>
            <p>قیمت تمام شده {amount * ethPrice.ETH_buy_price}</p>

            <BorderButton onClick={cryptoBuy}>{t("buy")}</BorderButton>
          </div>
        </div>
      </dialog>
    </TestLayout>
  );
};

export default NFTDetails;
