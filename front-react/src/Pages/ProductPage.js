import { useEffect, useState } from "react";
import React from "react";
import Properties from "../ProductPageComponent/Properties";
import Activity from "../ProductPageComponent/Activity";
import Recomendition from "../ProductPageComponent/Recomendition";
import axios from "axios";
import TestLayout from "../Layouts/TestLayout";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import { useParams } from "react-router";

function ProductPage() {
  const [data, setData] = useState();
  const { id } = useParams();

  const icons = {
    heart: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.9"
        stroke="currentColor"
        className="text-white h-[40%]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    ),
    eye: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.7"
        stroke="currentColor"
        className="text-white h-[40%]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    share: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.6"
        stroke="currentColor"
        className="text-white h-[40%]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
        />
      </svg>
    ),
    x_mark: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="text-white h-[40%]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    ),
  };

  useEffect(() => {
    axios({
      method: "get",
      url: "https://api.artina.org/api/transaction/Nfts/",
      //  url: "https://api.artina.org/api/account/profile/",
    })
      .then((d) => {
        setData(d);
      })



      axios({
        method: "get",
        url: "https://api.artina.org/api/transaction/rate/",
      })
        .then((d) => {


        })
        .catch();


        axios({
          method: "get",
          url: "https://api.artina.org/api/transaction/orders/",
        })
          .then((d) => {

          })
          .catch();
  }, []);

  return (
    <>
      {data
        ? data.data.map((item) =>
            item.id == id ? (
              <TestLayout key={item.id}>
                <div className="flex gap-16">
                  <SimpleCard
                    id="RightSide"
                    className="bg-[#4e45d0] w-[45%] flex flex-col relative gap-12 items-center "
                  >
                    <div className="flex flex-col gap-5">
                      <img
                        src="https://maaidanoor.com/wp-content/uploads/2020/03/IMG_3933-1.jpg"
                        className="rounded-xl"
                      ></img>
                      <div className="bg-[#7168f3] w-full h-28 rounded-xl flex justify-between items-center px-10 transition-all hover:bg-[#574eda]">
                        {icons.heart}
                        <div className="text-white text-[16px]">1571</div>
                      </div>
                      <div className="bg-[#7168f3] w-full h-28 rounded-xl flex justify-between items-center px-10 transition-all hover:bg-[#574eda]">
                        {icons.eye}
                        <div className="text-white text-[16px]">24566</div>
                      </div>
                      <div className="bg-[#7168f3] w-full h-28 rounded-xl flex justify-between items-center px-10 transition-all hover:bg-[#574eda]">
                        {icons.share}
                        <div className="text-white text-[16px]">270</div>
                      </div>
                    </div>
                  </SimpleCard>
                  <SimpleCard
                    id="LeftSide"
                    className={"flex flex-col gap-12 bg-white w-full"}
                  >
                    <div className="relative flex items-center pt-3">
                      <div className="absolute text-[16px] opacity-40">
                        نام اثر
                      </div>
                      <div className="text-[32px] mx-auto">{item.name}</div>
                    </div>
                    <hr className="opacity-10 mx-32"></hr>
                    <div className="relative flex items-center">
                      <div className="absolute text-[16px] opacity-40">
                        هنرمند
                      </div>
                      <div className="text-[16px] mx-auto">{item.creator}</div>
                    </div>
                    <div className="relative flex items-center">
                      <div className="absolute text-[16px] opacity-40">
                        تاریخ ساخت
                      </div>
                      <div className="text-[16px] mx-auto">{item.date}</div>
                    </div>
                    <hr className="opacity-10 mx-32"></hr>

                    <div className="relative flex items-center h-full">
                      <div className="absolute text-[16px] opacity-40">
                        توضیحات
                      </div>
                      <div className="text-[16px] mr-36 self-start text-right">
                        {item.description}
                        {item.description}
                        {item.description}
                        {item.description}
                        {item.description}
                        {item.description}
                        {item.description}
                        {item.description}
                        {item.description}
                        {item.description}
                        {item.description}
                        {item.description}
                        {item.description}
                        {item.description}
                        {item.description}
                        {item.description}
                        {item.description}
                        {item.description}
                      </div>
                    </div>
                    <div className="relative flex items-center justify-self-end bg-[#f1f2f7] px-10 py-4 rounded-xl">
                      <div className="absolute text-[16px] opacity-50">
                        آخرین قیمت
                      </div>
                      <div className="text-[22px] mx-auto">
                        {item.last_price} اتریوم
                      </div>
                    </div>
                  </SimpleCard>
                </div>
                <div>
                  <SimpleCard className="bg-white w-full flex flex-col relative gap-12 items-center mt-12">
                    <div className="flex items-center pt-3">
                      <div className="text-[32px] mx-auto">پیشنهادات</div>
                    </div>
                    <Properties />
                  </SimpleCard>
                  <SimpleCard className="bg-[#4e45d0] w-full flex flex-col relative gap-12 items-center mt-12">
                    <div className="flex items-center pt-3">
                      <div className="text-[32px] mx-auto text-white">
                        قیمت پیشنهادی
                      </div>
                    </div>
                    <Activity />
                  </SimpleCard>
                  <SimpleCard className="bg-white w-full flex flex-col relative gap-12 items-center mt-12">
                    <div className="flex items-center pt-3">
                      <div className="text-[32px] mx-auto">پیشنهاد های شما</div>
                    </div>
                    <Recomendition />
                  </SimpleCard>
                </div>
              </TestLayout>
            ) : (
              ""
            )
          )
        : ""}
    </>
  );
}
export default ProductPage;
