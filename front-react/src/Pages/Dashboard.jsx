import React from "react";
import TestLayout from "../Layouts/TestLayout";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import { useEffect } from "react";
import axios from "axios";
import { Chart } from "primereact/chart";
import { useState } from "react";
import AllTurnOversDialog from "../components/Dialog/AllTurnOversDialog/AllTurnOversDialog";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const [getData, setData] = useState();
  const [getLikedNfts, setLikedNfts] = useState();
  const [tickets, setTickets] = useState();
  const [profit, setProfit] = useState();
  const [getBalance, setBalance] = useState();
  const [getOrders, setOrders] = useState();
  const [artistOpenExhibitions, setArtistOpenExhibitions] = useState();
  const [reqData, setReqData] = useState();
  const [commission, setCommission] = useState();

  const [getLastMonthTurnover, setLastMonthTurnover] = useState();
  const [getAllTurnovers, setAllTurnovers] = useState();

  const navigate = useNavigate();


  //https://api.artina.org/api/transaction/orders/get_user_order
  useEffect(() => {
    axios
      .get("https://api.artina.org/api/exhibition/Ticket/get_user_tickets/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
        mode: "cors",
      })
      .then((res) => {
        console.log("_____Tickets_____");
        // console.log("get_user_tickets");
        console.log(res.data);
        // console.log("---------------");
        setTickets(res.data);
      })
      .catch((res) => {
        // console.log("------err------");
        // console.log("get_user_tickets");
        // console.log(res);
        // console.log("---------------");
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://api.artina.org/api/exhibition/Ticket/calculate_user_revenue/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
          mode: "cors",
        }
      )
      .then((res) => {
        // console.log("------succ-----");
        // console.log("calculate_user_revenue");
        // console.log(res);
        // console.log("---------------");
        setProfit(res.data);
      })
      .catch((res) => {
        // console.log("------err------");
        // console.log("calculate_user_revenue");
        // console.log(res);
        // console.log("---------------");
      });

    axios
      .get("https://api.artina.org/api/transaction/nft_ratings/user_likes/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
        mode: "cors",
      })
      .then((res) => {
        setLikedNfts(res.data);
      })
      .catch((res) => { });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://api.artina.org/api/account/user-turnover/turnover_in_month/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
        }
      )
      .then((res) => {
        console.log("-----monthturnovers-----");
        console.log(res.data);
        setLastMonthTurnover(res.data.last_month_turnover);
        setAllTurnovers(res.data.all_turnovers);
        console.log("---------");
      })
      .catch((res) => {
        // console.log("------err------");
        // console.log("111111111111111");
        // console.log(res);
        // console.log("---------------");
        // setData(res.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://api.artina.org/api/account/user-turnover/turnover_in_month/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
        }
      )
      .then((res) => {
        // console.log("------succ-----");
        // console.log("222222222222222");
        // console.log(res);
        // console.log("---------------");
        // setData(res.data);
      })
      .catch((res) => {
        // console.log("------err------");
        // console.log("222222222222222");
        // console.log(res);
        // console.log("---------------");
        // setData(res.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://api.artina.org/api/account/user-turnover/get_last_ten/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
      })
      .then((res) => {
        // console.log("------succ-----");
        // console.log("333333333333333");
        // console.log(res);
        // console.log("---------------");
        // setData(res.data);
      })
      .catch((res) => {
        // console.log("------err------");
        // console.log("333333333333333");
        // console.log(res);
        // console.log("---------------");
        // setData(res.data);
      });
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
        console.log("____Balance____", res.data);
      })
      .catch((e) => { });
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
        console.log("____Exhibitions____", res.data);
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
        console.log(d.data);
        setReqData(d);
      })
      .catch((res) => console.log(res));
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
        console.log("orderssssssss");
        console.log(res.data);
        setOrders(res.data);
      })
      .catch((res) => { });
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
    labels: ["اتریوم", "تومان"],
    datasets: [
      {
        data: [300, 50],
      },
    ],
  });

  useEffect(() => {
    setChartData({
      labels: ["اتریوم(بر حسب تومان)", "تومان"],
      datasets: [
        {
          data: [
            getBalance ? getBalance.eth_balance * 104759811 : 0,
            getBalance ? getBalance.rial_available_balance : 0,
          ],
        },
      ],
    });
  }, [getBalance]);

  return (
    <div>
      <TestLayout>
        <div className="flex gap-3 items-star sm:flex-col">
          <div className="flex flex-col gap-3 w-2/3 sm:w-full">
            <SimpleCard className="bg-white w-full h-full flex-col items-center justify-start">
              <div className="text-xl font-b6 px-4 mx-auto py-1 transition-all rounded-2xl mb-2 text-center">
                گزارش مالی
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div
                  id="rials"
                  className="w-full h-auto text-center rounded-2xl bg-slate-50 flex flex-col gap-3 py-2 px-4"
                >
                  <div className="font-b6">تومان</div>
                  <div className="flex gap-2 items-center justify-between sm:flex-col sm:text-xs">
                    مانده قابل معامله:
                    <div className="px-2 py-1 text-sm bg-indigo-100 text-indigo-500 rounded-md">
                      {getBalance ? getBalance.rial_available_balance : ""}
                      تومان
                    </div>
                  </div>
                  <div className="flex gap-2 items-center justify-between sm:flex-col sm:text-xs">
                    مانده غیر قابل معامله:
                    <div className="px-2 py-1 text-sm bg-indigo-100 text-indigo-500 rounded-md">
                      {getBalance ? getBalance.rial_unavailable_balance : ""}
                      تومان
                    </div>
                  </div>
                </div>

                <div
                  id="ethrs"
                  className="w-full h-auto text-center rounded-2xl bg-slate-50 flex flex-col gap-3 py-2 px-4"
                >
                  <div className="font-b6">اتریوم</div>
                  <div className="flex gap-2 items-center justify-between sm:flex-col sm:text-xs">
                    مانده قابل معامله:
                    <div className="px-2 py-1 text-sm bg-indigo-100 text-indigo-500 rounded-md">
                      {getBalance ? getBalance.eth_balance : ""} اتریوم
                    </div>
                  </div>
                  <div className="flex gap-2 items-center justify-between sm:flex-col sm:text-xs">
                    مانده غیر قابل معامله:
                    <div className="px-2 py-1 text-sm bg-indigo-100 text-indigo-500 rounded-md">
                      {getBalance ? getBalance.eth_unavailable_balance : ""}
                      اتریوم
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-3">
                <div
                  id=""
                  className="w-full h-auto text-center rounded-2xl bg-slate-50 flex justify-between gap-3 py-2 px-4 sm:flex-col"
                >
                  <div className="font-b6">سود حاصل از بلیت نمایشگاه</div>
                  <div className="px-2 py-1 text-sm bg-indigo-100 text-indigo-500 rounded-md">
                    {profit ? profit.revenue : ""} تومان
                  </div>
                </div>
              </div>

              <div className="my-3">
                <div
                  id=""
                  className="w-full h-auto text-center rounded-2xl bg-slate-50 flex justify-between gap-3 py-2 px-4 sm:flex-col"
                >
                  <div className="font-b6">مجموع حجم تراکنش های ماهانه</div>
                  <div className="px-2 py-1 text-sm bg-indigo-100 text-indigo-500 rounded-md">
                    {getLastMonthTurnover ? getLastMonthTurnover : ""} تومان
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <Chart
                  type="pie"
                  data={chartData}
                  options={lightOptions}
                  style={{ position: "relative", width: "50%" }}
                />
              </div>
            </SimpleCard>
            <SimpleCard className="bg-white w-full h-full flex-col items-center justify-start sm:p-3">
              <div className="text-xl font-b6 px-4 mx-auto py-1  transition-all rounded-2xl mb-2 text-center sm:px-1">
                گردش حساب
              </div>

              <table className="dashboard-table w-full text-center sm:text-xs">
                <thead>
                  <tr>
                    <th>واحد ارز</th>
                    <th>نوع تراکنش </th>
                    <th>مقدار(تومان) </th>
                    <th />
                  </tr>
                </thead>

                <tbody>
                  {getAllTurnovers ? (
                    getAllTurnovers.map((item, index) => (
                      <>
                        {index < 5 ? (
                          <tr className="group cursor-pointer hover:bg-slate-50 rounded-xl transition-all">
                            <td>
                              {item.transaction_currency == 1
                                ? "تومان"
                                : "اتریوم"}
                            </td>
                            <td>
                              {item.transaction_type == 2 ? "برداشت" : "واریز"}
                            </td>

                            <td>{item.transaction_value} تومان</td>

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
                        ) : (
                          <></>
                        )}
                      </>
                    ))
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
              <AllTurnOversDialog turnovers={getAllTurnovers} />
            </SimpleCard>
          </div>
          <div className="flex flex-col w-full gap-5">
            <SimpleCard className="bg-white  w-full h-full sm:p-2">
              <div className="text-xl font-b6 px-4 mx-auto py-1  transition-all rounded-2xl mb-2 text-center">
                نمایشگاه ها
              </div>
              <table className="dashboard-table w-full text-center sm:text-[12px]">
                <thead>
                  <tr>
                    <th className="sm:hidden">عکس</th>
                    <th>نام نمایشگاه</th>
                    <th>کمیسیون</th>
                    <th>سود حاصل</th>
                    <th>تاریخ پایان</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {artistOpenExhibitions ? (
                    artistOpenExhibitions.map((item, index) => (
                      <tr
                        className="group cursor-pointer hover:bg-slate-50 rounded-xl transition-all"
                        key={index}
                      >
                        <td className="sm:hidden">
                          <div className="flex justify-center w-full">
                            <img
                              src={item.image}
                              alt=""
                              className="w-[42px] h-[42px] rounded-xl"
                            />
                          </div>
                        </td>
                        <td>{item.marketName}</td>
                        <td className="items-center justify-center">
                          <div className="flex justify-center w-full">
                            <div className="px-2 py-1 text-sm bg-green-100 text-green-500 rounded-md">
                              {item.commision}%
                            </div>
                          </div>
                        </td>
                        <td>???</td>
                        <td className="flex flex-col justify-center">
                          {Intl.DateTimeFormat("fa", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                          }).format(new Date(item.end_date))}
                          <div className="text-sm bg-slate-100 px-1 rounded-md sm:text-xs">
                            ساعت: &nbsp;
                            {Intl.DateTimeFormat("fa", {
                              minute: "numeric",
                              hour: "numeric",
                            }).format(new Date(item.end_date))}
                          </div>
                        </td>
                        <td className="pl-4 align-middle group-hover:-translate-x-2 transition-all duration-200 sm:pl-2">
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
                    ))
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
            </SimpleCard>

            <SimpleCard className="bg-white  w-full h-full">
              <div className="text-xl font-b6 px-4 mx-auto py-1  transition-all rounded-2xl mb-2 text-center">
                سفارشات باز شما
              </div>
              <table className="dashboard-table w-full text-cente sm:text-xs">
                <thead>
                  <tr>
                    <th>نام nft</th>
                    <th>تاریخ </th>
                    <th>مقدار(تومان) </th>
                    <th />
                  </tr>
                </thead>

                <tbody>
                  {getOrders ? (
                    getOrders.map((item, index) => (
                      <tr
                        className="group cursor-pointer hover:bg-slate-50 rounded-xl transition-all"
                        onClick={() => navigate(`/nft-details/${item.token_id}`)}
                      >
                        <td>{item.nft}</td>
                        <td>
                          {Intl.DateTimeFormat("fa", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                          }).format(new Date(item.date))}
                        </td>
                        <td>{item.fee} تومان</td>

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
                    ))
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
            </SimpleCard>

            <SimpleCard className="bg-white  w-full h-full sm:p-3">
              <div className="text-xl font-b6 px-4 mx-auto py-1  transition-all rounded-2xl mb-2 text-center">
                بلیت ها
              </div>
              <table className="dashboard-table w-full text-center sm:text-xs">
                <thead>
                  <tr>
                    <th>شماره بلیت</th>
                    <th>آیدی نمایشگاه</th>
                    <th>قیمت</th>
                    <th>تاریخ انقضا</th>
                    {/* <th /> */}
                  </tr>
                </thead>
                <tbody>
                  {tickets &&
                    tickets.map((item, index) => (
                      <tr
                        className="group cursor-pointer hover:bg-slate-50 rounded-xl transition-all"
                        key={index}
                      >
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

            <SimpleCard className="bg-white  w-full h-full sm:p-3">
              <div className="text-xl font-b6 px-4 mx-auto py-1  transition-all rounded-2xl mb-2 text-center">
                nft هایی که پسندیده اید
              </div>
              <table className="dashboard-table w-full text-center sm:text-xs">
                <thead>
                  <tr>
                    <th>عکس nft</th>
                    <th>نام</th>
                    <th>قیمت</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {getLikedNfts &&
                    getLikedNfts.map((item, index) => (
                      <tr
                        className="group cursor-pointer hover:bg-slate-50 rounded-xl transition-all"
                        onClick={() => navigate(`/nft-details/${item.token_id}`)}
                        key={index}
                      >
                        <td>
                          <div className="flex justify-center w-full">
                            <img
                              src={item.image_url}
                              alt=""
                              className="w-[42px] h-[42px] rounded-xl"
                            />
                          </div>
                        </td>
                        <td>{item.name}</td>
                        <td>{item.last_price}</td>


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
          </div>
        </div>
      </TestLayout >
    </div >
  );
};

export default Dashboard;
