import React from "react";
import TestLayout from "../Layouts/TestLayout";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import { useEffect } from "react";
import axios from "axios";
import { Chart } from "primereact/chart";
import { useState } from "react";

const Dashboard = () => {
  const [getData, setData] = useState();

  const [chartData] = useState({
    labels: ["اتریوم", "ریال", "تست"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
        hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"],
      },
    ],
  });

  const [lightOptions] = useState({
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
  });

  useEffect(() => {
    // axios
    //   .get(
    //     `https://api.artina.org/api/transaction/collection/${username}/nfts/`,
    //     {}
    //   )
    //   .then((res) => {
    //     setData(res.data);
    //   });
  }, []);

  return (
    <div>
      <TestLayout>
        <div className="flex gap-3 items-start">
          <div className="flex flex-col gap-3 w-2/3">
            <SimpleCard className="bg-white w-full h-full flex-col items-center justify-start">
              <div className="text-xl font-b6 px-4 mx-auto py-1 transition-all rounded-2xl mb-2 text-center">
                گزارش مالی
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div
                  id="rials"
                  className="w-full h-auto text-center rounded-2xl bg-slate-50 flex flex-col gap-3 py-2 px-4"
                >
                  <div className="font-b6">ریال</div>
                  <div className="flex gap-2 items-center justify-between">
                    مانده قابل برداشت:
                    <div className="px-2 py-1 text-sm bg-indigo-100 text-indigo-500 rounded-md">
                      24000 تومان
                    </div>
                  </div>
                  <div className="flex gap-2 items-center justify-between">
                    مانده قابل معامله:
                    <div className="px-2 py-1 text-sm bg-indigo-100 text-indigo-500 rounded-md">
                      120000 تومان
                    </div>
                  </div>
                </div>

                <div
                  id="ethrs"
                  className="w-full h-auto text-center rounded-2xl bg-slate-50 flex flex-col gap-3 py-2 px-4"
                >
                  <div className="font-b6">اتریوم</div>
                  <div className="flex gap-2 items-center justify-between">
                    مانده قابل برداشت:
                    <div className="px-2 py-1 text-sm bg-indigo-100 text-indigo-500 rounded-md">
                      2 اتریوم
                    </div>
                  </div>
                  <div className="flex gap-2 items-center justify-between">
                    مانده قابل معامله:
                    <div className="px-2 py-1 text-sm bg-indigo-100 text-indigo-500 rounded-md">
                      11 اتریوم
                    </div>
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
            <SimpleCard className="bg-white w-full h-full flex-col items-center justify-start ">
              <div className="text-xl font-b6 px-4 mx-auto py-1  transition-all rounded-2xl mb-2 text-center">
                گردش حساب
              </div>
              <div className="flex justify-between items-center gap-3">
                <div>آخرین تراکنش</div>
                <div>تاریخ: 1402/3/12</div>
                <div className="px-2 py-1 text-sm bg-green-100 text-green-500 rounded-md">
                  +11 اتریوم
                </div>
              </div>
              <div className="w-full bg-slate-50 cursor-pointer mt-3 py-1 group rounded-lg text-center flex items-center justify-center gap-4">
                مشاهده همه
                <div className="pl-4 align-middle group-hover:-translate-x-2 transition-all duration-200">
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
                </div>
              </div>
            </SimpleCard>
           
          </div>
          <div className="flex flex-col w-full gap-3">
            <SimpleCard className="bg-white  w-full h-full">
              <div className="text-xl font-b6 px-4 mx-auto py-1  transition-all rounded-2xl mb-2 text-center">
                نمایشگاه ها{" "}
              </div>
              <table className="dashboard-table w-full text-center">
                <tr>
                  <th>عکس</th>
                  <th>نام نمایشگاه</th>
                  <th>درصد کمیسیون</th>
                  <th>سود حاصل</th>
                  <th>حجم فروش به اتر</th>
                  <th>حجم فروش</th>
                  <th>تاریخ پایان</th>
                  <th></th>
                </tr>
                <tr className="group cursor-pointer hover:bg-slate-50 rounded-xl transition-all">
                  <td>
                    <div className="flex justify-center w-full">
                      <img
                        src="/1.jpg"
                        alt=""
                        className="w-[42px] h-[42px] rounded-xl"
                      />
                    </div>
                  </td>
                  <td>تست</td>
                  <td className="items-center justify-center">
                    <div className="flex justify-center w-full">
                      <div className="px-2 py-1 text-sm bg-green-100 text-green-500 rounded-md">
                        +11%
                      </div>
                    </div>
                  </td>
                  <td>24000ربال</td>
                  <td>11اتریوم</td>
                  <td>29654400 ریال</td>
                  <td>1402/03/13</td>
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

                <tr className="group cursor-pointer hover:bg-slate-50 rounded-xl transition-all">
                  <td>
                    <div className="flex justify-center w-full">
                      <img
                        src="/1.jpg"
                        alt=""
                        className="w-[42px] h-[42px] rounded-xl"
                      />
                    </div>
                  </td>
                  <td>تست</td>
                  <td className="items-center justify-center">
                    <div className="flex justify-center w-full">
                      <div className="px-2 py-1 text-sm bg-red-100 text-red-500 rounded-md">
                        -17%
                      </div>
                    </div>
                  </td>
                  <td>24000ربال</td>
                  <td>11اتریوم</td>
                  <td>29654400 ریال</td>
                  <td>1402/03/13</td>
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
              </table>
            </SimpleCard>

            <SimpleCard className="bg-white  w-full h-full">
            <div className="text-xl font-b6 px-4 mx-auto py-1  transition-all rounded-2xl mb-2 text-center">
سفارشات باز شما
            </div>
            <table className="dashboard-table w-full text-center">
              <tr>
                <th>عکس</th>
                <th>نام nft</th>
                <th>تست </th>
                <th>تست </th>
                <th></th>
              </tr>
              <tr className="group cursor-pointer hover:bg-slate-50 rounded-xl transition-all">
                <td>
                  <div className="flex justify-center w-full">
                    <img
                      src="/1.jpg"
                      alt=""
                      className="w-[42px] h-[42px] rounded-xl"
                    />
                  </div>
                </td>
                <td>تست</td>
                <td className="items-center justify-center">
                  <div className="flex justify-center w-full">
                    <div className="px-2 py-1 text-sm bg-green-100 text-green-500 rounded-md">
                      +11%
                    </div>
                  </div>
                </td>
                <td>24000ربال</td>
                
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

              <tr className="group cursor-pointer hover:bg-slate-50 rounded-xl transition-all">
                <td>
                  <div className="flex justify-center w-full">
                    <img
                      src="/1.jpg"
                      alt=""
                      className="w-[42px] h-[42px] rounded-xl"
                    />
                  </div>
                </td>
                <td>تست</td>
                <td className="items-center justify-center">
                  <div className="flex justify-center w-full">
                    <div className="px-2 py-1 text-sm bg-red-100 text-red-500 rounded-md">
                      -17%
                    </div>
                  </div>
                </td>
                <td>24000ربال</td>

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
            </table>
          </SimpleCard>
          </div>
        </div>
      </TestLayout>
    </div>
  );
};

export default Dashboard;
