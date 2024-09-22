import React, { useState, useEffect } from "react";
import TestLayout from "../Layouts/TestLayout";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import axios from "axios";
import DonutChart from "../components/Charts/DonutChart";
import AllTurnOversDialog from "../components/Dialog/AllTurnOversDialog/AllTurnOversDialog";
import AllNftDialog from "../components/Dialog/AllNftLikedDialog/AllNftDialog";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { FaEthereum } from "react-icons/fa";
import { Notify } from "notiflix";
import useAuthCheck from "../hooks/useAuthCheck";

const Dashboard = () => {
  const [getLikedNfts, setLikedNfts] = useState();
  const [firtsFiveLinkedNfts, setFirtsFiveLinkedNfts] = useState();
  const [tickets, setTickets] = useState();
  const [profit, setProfit] = useState();
  const [getBalance, setBalance] = useState();
  const [ethPrice, setEthPrice] = useState(null);  // Store Ethereum sell price
  const [maticPrice, setMaticPrice] = useState(null);  // Store Matic sell price
  const [getOrders, setOrders] = useState();
  const [artistOpenExhibitions, setArtistOpenExhibitions] = useState();
  const { t } = useTranslation(["dashboard"]);

  const [getLastMonthTurnover, setLastMonthTurnover] = useState();
  const [getAllTurnovers, setAllTurnovers] = useState();
  const [firstFiveTurnovers, setFirstFiveTurnovers] = useState();
  const [referralCode, setReferralCode] = useState();
  const [credit, setCredit] = useState();

  const ETH_TO_TOMAN_RATE = 100000000; // 1 ETH = 130,000,000 Tomans
  const MATIC_TO_TOMAN_RATE = 25000; // 1 MATIC = 25,000 Tomans

  const navigate = useNavigate();

  useAuthCheck();

  const getAccessToken = () => {
    const authTokens = JSON.parse(localStorage.getItem("authTokens"));
    return authTokens?.access;
  };

  const handleUnauthorizedError = (error) => {
    if (error.response && error.response.status === 401) {
      Notify.failure("Session expired. Please log in again.");
      navigate("/login");
    } else {
      console.error("API call error:", error);
    }
  };

  useEffect(() => {
    const accessToken = getAccessToken();

    if (accessToken) {
      axios
        .get("https://api.artina.org/api/exhibition/Ticket/get_user_tickets/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setTickets(res.data);
        })
        .catch(handleUnauthorizedError);
    }
  }, []);


  useEffect(() => {
    const accessToken = getAccessToken();

    if (accessToken) {
      axios
        .get("https://api.artina.org/api/transaction/nft_ratings/user_likes/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setLikedNfts(res.data);
          setFirtsFiveLinkedNfts(res.data.slice(0, 5));
        })
        .catch(handleUnauthorizedError);
    }
  }, []);

  useEffect(() => {
    const accessToken = getAccessToken();

    if (accessToken) {
      axios
        .get("https://api.artina.org/api/account/CryptoViewSet/CryptoPrice_ETH/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setEthPrice(res.data.ETH_sell_price);
          setMaticPrice(MATIC_TO_TOMAN_RATE);
        })
        .catch(handleUnauthorizedError);
    }
  }, []);

  useEffect(() => {
    const accessToken = getAccessToken();

    if (accessToken) {
      axios
        .get("https://api.artina.org/api/account/user-turnover/turnover_in_month/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setLastMonthTurnover(res.data.last_month_turnover);
          setAllTurnovers(res.data.all_turnovers);
          setFirstFiveTurnovers(res.data.all_turnovers.slice(0, 5));
        })
        .catch(handleUnauthorizedError);
    }
  }, []);

  useEffect(() => {
    const accessToken = getAccessToken();

    if (accessToken) {
      axios
        .get("https://api.artina.org/api/account/user-balance/get_balance/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setBalance(res.data);
        })
        .catch(handleUnauthorizedError);
    }
  }, []);

  useEffect(() => {
    const accessToken = getAccessToken();

    if (accessToken) {
      axios
        .get("https://api.artina.org/api/exhibition/user-exhibitions/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setArtistOpenExhibitions(res.data);
        })
        .catch(handleUnauthorizedError);
    }
  }, []);

  useEffect(() => {
    const accessToken = getAccessToken();

    if (accessToken) {
      axios
        .get("https://api.artina.org/api/transaction/orders/get_user_order/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setOrders(res.data);
        })
        .catch(handleUnauthorizedError);
    }
  }, []);

  // get user referral code 
  useEffect(() => {
    const accessToken = getAccessToken();

    if (accessToken) {
      axios
        .get("https://api.artina.org/api/account/affiliate/get_code/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setCredit(res.data.credit_balance);
          setReferralCode(res.data.referral_code);
        })
        .catch(handleUnauthorizedError);
    }
  }, []);

  const calculateTotalTomanBalance = () => {
    if (!getBalance || !ethPrice || !maticPrice) return 0;

    const ethInTomans = (getBalance.eth_balance || 0) * ethPrice;
    const maticInTomans = (getBalance.matic_balance || 0) * maticPrice;
    const rialAvailable = getBalance.rial_available_balance || 0;

    return ethInTomans + maticInTomans + rialAvailable;
  };

  const renderDonutChart = () => {
    if (!getBalance || !ethPrice || !maticPrice) {
      return <p>Loading...</p>;
    }

    const ethInTomans = (getBalance.eth_balance || 0) * ethPrice;
    const maticInTomans = (getBalance.matic_balance || 0) * maticPrice;
    const rialAvailable = getBalance.rial_available_balance || 0;

    return (
      <DonutChart
        ethBalanceInTomans={ethInTomans}
        maticBalanceInTomans={maticInTomans}
        rialAvailableBalance={rialAvailable}
      />
    );
  };

  const [lightOptions] = useState({
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
  });

  const [chartData, setChartData] = useState({
    labels: [t("ethereum"), t("tooman")],
    datasets: [
      {
        data: [300, 50],
      },
    ],
  });

  useEffect(() => {
    setChartData({
      labels: [t("ethereumToTooman"), t("tooman")],
      datasets: [
        {
          data: [getBalance ? getBalance.eth_balance * 104759811 : 0, getBalance ? getBalance.rial_available_balance : 0],
        },
      ],
    });
  }, [getBalance]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode).then(() => {
      Notify.success(t("copied"));
    });
  };

  const formatCurrency = (currency) => {
    return currency === 1 ? t("tooman") : t("ethereum");
  };

  const formatSide = (side) => {
    return side === "deposit" ? t("deposit") : t("withdrawal");
  };

  return (
    <div>
      <TestLayout>
        <div className="flex gap-3 items-star sm:flex-col">
          <div className="flex flex-col gap-3 w-2/3 sm:w-full">
            <SimpleCard className="bg-base-100 w-full h-full flex-col items-center justify-start">
              <div className="text-xl font-b6 px-4 mx-auto py-1 transition-all rounded-2xl mb-2 text-center">{t("financialReport")} </div>
              <div className="grid grid-cols-2 gap-2">
                <div id="rials" className="w-full h-auto rounded-2xl bg-base-100 flex flex-col gap-3 py-2 px-4">
                  <div className="font-b6">{t("tooman")}</div>
                  <div className="flex gap-2 items-center justify-between flex-col sm:text-xs">
                    {t("negotiablebalance")}{" "}
                    <div className="px-2 py-1 text-sm bg-neutral text-neutral-content rounded-md">
                      {getBalance ? getBalance.rial_available_balance : ""}{" "}
                      {t("tooman")}
                    </div>
                  </div>
                  <div className="flex gap-2 items-center justify-between flex-col sm:text-xs">
                    {t("nonNegotiableBalance")}{" "}
                    <div className="px-2 py-1 text-sm bg-neutral text-neutral-content rounded-md">
                      {getBalance ? getBalance.rial_unavailable_balance : ""}{" "}
                      {t("tooman")}
                    </div>
                  </div>
                </div>

                <div id="ethrs" className="w-full h-auto rounded-2xl bg-base-100 flex flex-col gap-3 py-2 px-4">
                  <div className="font-b6">{t("ethereum")}</div>
                  <div className="flex gap-2 items-center justify-between flex-col sm:text-xs">
                    {t("negotiablebalance")}{" "}
                    <div className="px-2 py-1 text-sm bg-neutral text-neutral-content rounded-md">
                      {getBalance ? getBalance.eth_balance : ""} {t("ethereum")}
                    </div>
                  </div>
                  <div className="flex gap-2 items-center justify-between flex-col sm:text-xs">
                    {t("nonNegotiableBalance")}{" "}
                    <div className="px-2 py-1 text-sm bg-neutral text-neutral-content rounded-md">
                      {getBalance ? getBalance.eth_unavailable_balance : ""}{" "}
                      {t("ethereum")}
                    </div>
                  </div>
                </div>
              </div>
              <div id="matics" className="w-full h-auto rounded-2xl bg-base-100 flex flex-col gap-3 py-2 px-4">
                <div className="font-b6 ">{t("matic")}</div>
                <div className="flex gap-2 items-center justify-between sm:flex-col sm:text-xs">
                  {t("negotiablebalance")}{" "}
                  <div className="px-2 py-1 text-sm bg-neutral text-neutral-content rounded-md">
                    {getBalance ? getBalance.matic_balance : ""}{" "}{t("matic")}
                  </div>
                </div>
                <div className="flex gap-2 items-center justify-between sm:flex-col sm:text-xs">
                  {t("nonNegotiableBalance")}{" "}
                  <div className="px-2 py-1 text-sm bg-neutral text-neutral-content rounded-md">
                    {getBalance ? getBalance.matic_unavailable_balance : ""}{" "}
                    {t("matic")}
                  </div>
                </div>
              </div>
              <br />

              <div className="my-3">
                <div id="" className="w-full h-auto text-center rounded-2xl bg-base-100 flex justify-between gap-3 py-2 px-4 sm:flex-col">
                  <div className="font-b6">{t("ProfitsTickets")} </div>
                  <div className="px-2 py-1 text-sm bg-neutral text-neutral-content rounded-md">
                    {profit ? profit.revenue : ""} {t("tooman")}
                  </div>
                </div>
              </div>

              <div className="py-1 px-4 font-b6 ">{t("financialChart(Tomans)")}:</div>
              <div className="flex justify-center">
                {renderDonutChart()}
              </div>
            </SimpleCard>

            {/* Referral Code Section */}
            <SimpleCard className="bg-base-100 w-full h-full flex-col items-center justify-start">
              <div className="text-xl font-b6 px-4 mx-auto py-1 transition-all rounded-2xl mb-2 text-center">
                {t("referralCode")}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={referralCode || ""}
                    readOnly
                    className="px-3 py-2 text-sm bg-neutral text-neutral-content rounded-md text-center"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 text-sm font-semibold bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    {t("copy")}
                  </button>
                </div>
                <div className="flex px-3 py-2 text-md rounded-md items-center">
                  {t("yourCredit")}
                  <div className="px-3 py-2 text-sm bg-neutral text-neutral-content rounded-md mx-1">
                    {credit}
                  </div>
                </div>

              </div>
            </SimpleCard>
            {/* End of Referral Code Section */}

            <SimpleCard className="bg-base-100 w-full h-full flex-col items-center justify-start sm:p-3">
              <div className="text-xl font-b6 px-4 mx-auto py-1 transition-all rounded-2xl mb-2 text-center sm:px-1">
                {t("turnover")}
              </div>

              <table className="dashboard-table w-full text-center sm:text-xs">
                <thead>
                  <tr>
                    <th>{t("amount")}</th>
                    <th>{t("currencyUnit")}</th>
                    <th>{t("transactionType")}</th>
                    <th>{t("status")}</th> {/* Added status */}
                    <th />
                  </tr>
                </thead>

                <tbody>
                  {firstFiveTurnovers && firstFiveTurnovers.length > 0 ? (
                    firstFiveTurnovers.map((item, index) => (
                      <tr key={index} className="group cursor-pointer hover:bg-base-100 rounded-xl transition-all">
                        <td>
                          {item.amount}
                        </td>
                        <td>{item.transaction_currency === 1 ? t("tooman") : t("ethereum")}</td>
                        <td>{item.side === "withdrawal" ? t("withdrawal") : t("deposit")}</td>
                        <td>{t(item.status)}</td> {/* Show transaction status */}
                        <td className="pl-4 align-middle group-hover:-translate-x-2 transition-all duration-200">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.3" stroke="currentColor" width={"1em"}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                          </svg>
                        </td>
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

              <AllTurnOversDialog turnovers={getAllTurnovers} />
            </SimpleCard>

          </div>
          <div className="flex flex-col w-full gap-5">
            <SimpleCard className="bg-base-100  w-full h-auto sm:p-2">
              <div className="text-xl font-b6 px-4 mx-auto py-1  transition-all rounded-2xl mb-2 text-center">{t("exhibitions")} </div>
              <table className="dashboard-table w-full text-center sm:text-[12px]">
                <thead>
                  <tr>
                    <th className="sm:hidden">{t("picture")}</th>
                    <th>{t("nameOfEx")}</th>
                    <th>{t("commission")}</th>
                    <th>{t("profit")}</th>
                    <th>{t("endDate")}</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {artistOpenExhibitions ? (
                    artistOpenExhibitions.map((item, index) => (
                      <tr className="group cursor-pointer hover:bg-base-100 rounded-xl transition-all" key={index}>
                        <td className="sm:hidden">
                          <div className="flex justify-center w-full">
                            <img src={item.image} alt="" className="w-[42px] h-[42px] rounded-xl" />
                          </div>
                        </td>
                        <td>{item.marketName}</td>
                        <td className="items-center justify-center">
                          <div className="flex justify-center w-full">
                            <div className="px-2 py-1 text-sm bg-green-100 text-green-500 rounded-md">{item.commision}%</div>
                          </div>
                        </td>
                        <td>???</td>
                        <td className="flex flex-col justify-center">
                          {Intl.DateTimeFormat("fa", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                          }).format(new Date(item.end_date))}
                          <div className="text-sm bg-base-100 px-1 rounded-md sm:text-xs">
                            ساعت: &nbsp;
                            {Intl.DateTimeFormat("fa", {
                              minute: "numeric",
                              hour: "numeric",
                            }).format(new Date(item.end_date))}
                          </div>
                        </td>
                        <td className="pl-4 align-middle group-hover:-translate-x-2 transition-all duration-200 sm:pl-2">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.3" stroke="currentColor" width={"1em"}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                          </svg>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <div></div>
                  )}
                </tbody>
              </table>
            </SimpleCard>

            <SimpleCard className={`bg-base-100 w-full ${getOrders && getOrders.length > 0 ? 'h-full' : 'h-auto py-8'}`}>
              <div className="text-xl font-b6 px-4 mx-auto py-1 transition-all rounded-2xl mb-2 text-center">
                {t("openOrders")}
              </div>

              {getOrders && getOrders.length > 0 ? (
                <table className="dashboard-table w-full text-center sm:text-xs">
                  <thead>
                    <tr>
                      <th>{t("nftPhoto")}</th>
                      <th>{t("nfNname")}</th>
                      <th>{t("date")}</th>
                      <th>{t("amount")}</th>
                      <th>{t("price")}</th>
                      <th />
                    </tr>
                  </thead>

                  <tbody>
                    {getOrders.map((item, index) => (
                      <tr
                        key={index}
                        className="group cursor-pointer hover:bg-base-100 rounded-xl transition-all"
                        onClick={() => navigate(`/nft-details/${item.nft.token_id}`)}
                      >
                        <td>
                          <img src={item.nft.image_url} alt="" className="w-[42px] h-[42px] rounded-xl" />
                        </td>
                        <td>{item.nft.name}</td>
                        <td>
                          {Intl.DateTimeFormat("fa", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                          }).format(new Date(item.date))}
                        </td>
                        <td>
                          {item.fee} {t("tooman")}
                        </td>
                        <td>
                          {item.eth} {t("ethereum")}
                        </td>
                        <td className="pl-4 align-middle group-hover:-translate-x-2 transition-all duration-200">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.3"
                            stroke="currentColor"
                            width={"1em"}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                          </svg>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="justify-center pt-6 flex">
                  <p className="font-bold bg-neutral text-neutral-content rounded-md p-2">
                    {t("noData")}
                  </p>
                </div> // Message if no data is available
              )}
            </SimpleCard>


            <SimpleCard className="bg-base-100  w-full h-auto sm:p-3">
              <div className="text-xl font-b6 px-4 mx-auto py-1  transition-all rounded-2xl mb-2 text-center">
                {t("tickets")}
              </div>
              <table className="dashboard-table w-full text-center sm:text-xs">
                <thead>
                  <tr>
                    <th>{t("ticketNo")}</th>
                    <th>{t("exhibitionName")}</th>
                    <th>{t("price")}</th>
                    <th>{t("expireDate")}</th>
                    {/* <th /> */}
                  </tr>
                </thead>
                <tbody>
                  {tickets &&
                    tickets.map((item, index) => (
                      <tr
                        key={index}
                        className="group cursor-pointer hover:bg-base-100 rounded-xl transition-all"
                        onClick={() => navigate(`/exhibition-collections/${item.exhibition_id}`)} // Navigate to the exhibition page using exhibition_id
                      >
                        <td>{item.ticket_id}</td>
                        <td>{item.exhibition_name}</td>
                        <td>{item.exhibition_price}</td>
                        <td>
                          {Intl.DateTimeFormat("fa", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            minute: "numeric",
                            hour: "numeric",
                          }).format(new Date(item.expiration_date))}
                        </td>

                        <td className="pl-4 align-middle group-hover:-translate-x-2 transition-all duration-200">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.3"
                            stroke="currentColor"
                            width={"1em"}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                          </svg>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </SimpleCard>

            <SimpleCard className="bg-base-100  w-full h-auto sm:p-3">
              <div className="text-xl font-b6 px-4 mx-auto py-1  transition-all rounded-2xl mb-2 text-center">{t("likedNFTs")} </div>
              <table className="dashboard-table w-full text-center sm:text-xs">
                <thead>
                  <tr>
                    <th>{t("nftPhoto")}</th>
                    <th>{t("name")}</th>
                    <th>{t("price")}</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {firtsFiveLinkedNfts &&
                    firtsFiveLinkedNfts.map((item, index) => (
                      <tr
                        className="group cursor-pointer hover:bg-base-100 rounded-xl transition-all"
                        onClick={() => navigate(`/nft-details/${item.token_id}`)}
                        key={index}
                      >
                        <td>
                          <div className="flex justify-center w-full">
                            <img src={item.image_url} alt="" className="w-[42px] h-[42px] rounded-xl" />
                          </div>
                        </td>
                        <td>{item.name}</td>
                        <td>{item.last_price}</td>
                        <td className="pl-4 align-middle group-hover:-translate-x-2 transition-all duration-200">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.3" stroke="currentColor" width={"1em"}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                          </svg>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>


              <AllNftDialog likedNfts={getLikedNfts} />
            </SimpleCard>
          </div>
        </div>
      </TestLayout>
    </div>
  );
};

export default Dashboard;
