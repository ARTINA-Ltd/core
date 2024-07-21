import React from "react";
import TestLayout from "../Layouts/TestLayout";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import { useEffect } from "react";
import axios from "axios";
import { Chart } from "primereact/chart";
import { useState } from "react";
import AllTurnOversDialog from "../components/Dialog/AllTurnOversDialog/AllTurnOversDialog";
import AllNftDialog from "../components/Dialog/AllNftLikedDialog/AllNftDialog";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const [getLikedNfts, setLikedNfts] = useState();
  const [firtsFiveLinkedNfts, setFirtsFiveLinkedNfts] = useState();
  const [tickets, setTickets] = useState();
  const [profit, setProfit] = useState();
  const [getBalance, setBalance] = useState();
  const [getOrders, setOrders] = useState();
  const [artistOpenExhibitions, setArtistOpenExhibitions] = useState();
  const [reqData, setReqData] = useState();
  const { t } = useTranslation(["dashboard"]);

  const [getLastMonthTurnover, setLastMonthTurnover] = useState();
  const [getAllTurnovers, setAllTurnovers] = useState();
  const [firstFiveTurnovers, setFirstFiveTurnovers] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    localStorage.getItem("authTokens") === null && navigate("/login");
  });
  useEffect(() => {
    axios
      .get("https://api.artina.org/api/exhibition/Ticket/get_user_tickets/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
        mode: "cors",
      })
      .then((res) => {
        setTickets(res.data);
      })
      .catch((res) => {});
  }, []);

  useEffect(() => {
    axios
      .get("https://api.artina.org/api/exhibition/Ticket/calculate_user_revenue/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
        mode: "cors",
      })
      .then((res) => {
        console.log(res.data);
        setProfit(res.data);
      })
      .catch((res) => {});

    axios
      .get("https://api.artina.org/api/transaction/nft_ratings/user_likes/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
        mode: "cors",
      })
      .then((res) => {
        setLikedNfts(res.data);
        setFirtsFiveLinkedNfts(res.data.slice(0, 5));
      })
      .catch((res) => {});
  }, []);

  useEffect(() => {
    axios
      .get(`https://api.artina.org/api/account/user-turnover/turnover_in_month/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
      })
      .then((res) => {
        setLastMonthTurnover(res.data.last_month_turnover);
        setAllTurnovers(res.data.all_turnovers);
        setFirstFiveTurnovers(res.data.all_turnovers.slice(0, 5));
      })
      .catch((res) => {});
  }, []);

  useEffect(() => {
    axios
      .get(`https://api.artina.org/api/account/user-turnover/turnover_in_month/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
      })
      .then((res) => {})
      .catch((res) => {});
  }, []);

  useEffect(() => {
    axios
      .get(`https://api.artina.org/api/account/user-turnover/get_last_ten/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
      })
      .then((res) => {})
      .catch((res) => {});
  }, []);

  useEffect(() => {
    axios
      .get("https://api.artina.org/api/account/user-balance/get_balance/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
        mode: "cors",
      })
      .then((res) => {
        setBalance(res.data);
      })
      .catch((e) => {});
  }, []);

  useEffect(() => {
    axios
      .get(`https://api.artina.org/api/exhibition/user-exhibitions/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
      })
      .then((res) => {
        setArtistOpenExhibitions(res.data);
      });
  }, []);

  useEffect(() => {
    axios
      .post("https://api.artina.org/api/transaction/orders/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
      })
      .then((d) => {
        setReqData(d);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://api.artina.org/api/transaction/orders/get_user_order/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
        mode: "cors",
      })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((res) => {});
  }, []);

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

  return (
    <div>
      <TestLayout>
        <div className="flex gap-3 items-star sm:flex-col">
          <div className="flex flex-col gap-3 w-2/3 sm:w-full">
            <SimpleCard className="bg-base-100 w-full h-full flex-col items-center justify-start">
              <div className="text-xl font-b6 px-4 mx-auto py-1 transition-all rounded-2xl mb-2 text-center">{t("financialReport")} </div>
              <div className="grid grid-cols-2 gap-2">
                <div id="rials" className="w-full h-auto text-center rounded-2xl bg-base-100 flex flex-col gap-3 py-2 px-4">
                  <div className="font-b6">{t("tooman")}</div>
                  <div className="flex gap-2 items-center justify-between sm:flex-col sm:text-xs">
                    {t("negotiablebalance")}{" "}
                    <div className="px-2 py-1 text-sm bg-neutral text-neutral-content rounded-md">
                      {getBalance ? getBalance.rial_available_balance : ""}
                      {t("tooman")}
                    </div>
                  </div>
                  <div className="flex gap-2 items-center justify-between sm:flex-col sm:text-xs">
                    {t("nonNegotiableBalance")}{" "}
                    <div className="px-2 py-1 text-sm bg-neutral text-neutral-content rounded-md">
                      {getBalance ? getBalance.rial_unavailable_balance : ""}
                      {t("tooman")}
                    </div>
                  </div>
                </div>

                <div id="ethrs" className="w-full h-auto text-center rounded-2xl bg-base-100 flex flex-col gap-3 py-2 px-4">
                  <div className="font-b6">{t("ethereum")}</div>
                  <div className="flex gap-2 items-center justify-between sm:flex-col sm:text-xs">
                    {t("negotiablebalance")}{" "}
                    <div className="px-2 py-1 text-sm bg-neutral text-neutral-content rounded-md">
                      {getBalance ? getBalance.eth_balance : ""} {t("ethereum")}
                    </div>
                  </div>
                  <div className="flex gap-2 items-center justify-between sm:flex-col sm:text-xs">
                    {t("nonNegotiableBalance")}{" "}
                    <div className="px-2 py-1 text-sm bg-neutral text-neutral-content rounded-md">
                      {getBalance ? getBalance.eth_unavailable_balance : ""}
                      {t("ethereum")}{" "}
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-3">
                <div id="" className="w-full h-auto text-center rounded-2xl bg-base-100 flex justify-between gap-3 py-2 px-4 sm:flex-col">
                  <div className="font-b6">{t("ProfitsTickets")} </div>
                  <div className="px-2 py-1 text-sm bg-neutral text-neutral-content rounded-md">
                    {profit ? profit.revenue : ""} {t("tooman")}
                  </div>
                </div>
              </div>

              <div className="my-3">
                <div id="" className="w-full h-auto text-center rounded-2xl bg-base-100 flex justify-between gap-3 py-2 px-4 sm:flex-col">
                  <div className="font-b6">{t("monthlyTransactions")}</div>
                  <div className="px-2 py-1 text-sm bg-neutral text-neutral-content rounded-md">
                    {getLastMonthTurnover ? getLastMonthTurnover : ""} {t("tooman")}
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <Chart type="pie" data={chartData} options={lightOptions} style={{ position: "relative", width: "50%" }} />
              </div>
            </SimpleCard>
            <SimpleCard className="bg-base-100 w-full h-full flex-col items-center justify-start sm:p-3">
              <div className="text-xl font-b6 px-4 mx-auto py-1  transition-all rounded-2xl mb-2 text-center sm:px-1">{t("turnover")} </div>

              <table className="dashboard-table w-full text-center  sm:text-xs">
                <thead>
                  <tr>
                    <th>{t("currencyUnit")}</th>
                    <th>{t("transactionType")} </th>
                    <th>{t("amount")} </th>
                    <th />
                  </tr>
                </thead>

                <tbody>
                  {firstFiveTurnovers ? (
                    firstFiveTurnovers.map((item, index) => (
                      <tr className="group cursor-pointer hover:bg-base-100 rounded-xl transition-all">
                        <td>{item.transaction_currency == 1 ? t("tooman") : t("ethereum")}</td>
                        <td>{item.transaction_type == 2 ? t("Withdrawal") : t("deposit")}</td>

                        <td>
                          {item.transaction_value} {t("tooman")}
                        </td>

                        <td className="pl-4 align-middle group-hover:-translate-x-2 transition-all duration-200">
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
              <AllTurnOversDialog turnovers={getAllTurnovers} />
            </SimpleCard>
          </div>
          <div className="flex flex-col w-full gap-5">
            <SimpleCard className="bg-base-100  w-full h-full sm:p-2">
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

            <SimpleCard className="bg-base-100  w-full h-full">
              <div className="text-xl font-b6 px-4 mx-auto py-1  transition-all rounded-2xl mb-2 text-center">{t("openOrders")} </div>
              <table className="dashboard-table w-full text-cente sm:text-xs">
                <thead>
                  <tr>
                    <th>{t("nfNname")}</th>
                    <th>{t("date")} </th>
                    <th>{t("amount")} </th>
                    <th />
                  </tr>
                </thead>

                <tbody>
                  {getOrders ? (
                    getOrders.map((item, index) => (
                      <tr className="group cursor-pointer hover:bg-base-100 rounded-xl transition-all" onClick={() => navigate(`/nft-details/${item.token_id}`)}>
                        <td>{item.nft}</td>
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

                        <td className="pl-4 align-middle group-hover:-translate-x-2 transition-all duration-200">
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

            <SimpleCard className="bg-base-100  w-full h-full sm:p-3">
              <div className="text-xl font-b6 px-4 mx-auto py-1  transition-all rounded-2xl mb-2 text-center">{t("tickets")} </div>
              <table className="dashboard-table w-full text-center sm:text-xs">
                <thead>
                  <tr>
                    <th>{t("ticketNo")}</th>
                    <th>{t("exhibitionID")}</th>
                    <th>{t("price")}</th>
                    <th>{t("expireDate")}</th>
                    {/* <th /> */}
                  </tr>
                </thead>
                <tbody>
                  {tickets &&
                    tickets.map((item, index) => (
                      <tr className="group cursor-pointer hover:bg-base-100 rounded-xl transition-all" key={index}>
                        <td>{item.ticket_id}</td>
                        <td>{item.exhibition}</td>
                        <td>{item.price}</td>
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
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.3" stroke="currentColor" width={"1em"}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                          </svg>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </SimpleCard>

            <SimpleCard className="bg-base-100  w-full h-full sm:p-3">
              <div className="text-xl font-b6 px-4 mx-auto py-1  transition-all rounded-2xl mb-2 text-center">{t("likedNFTs")} </div>
              <table className="dashboard-table w-full text-cente sm:text-xs">
                <thead>
                  <tr>
                    <th>{t("nftPhoto")}</th>
                    <th>{t("name")}</th>
                    <th>{t("price")}</th>
                    <th />
                  </tr>
                </thead>
                <tbody className="w-full">
                  {firtsFiveLinkedNfts &&
                    firtsFiveLinkedNfts.map((item, index) => (
                      <tr className="group cursor-pointer hover:bg-base-100 rounded-xl transition-all" onClick={() => navigate(`/nft-details/${item.token_id}`)} key={index}>
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
