import { useEffect, useState, useContext } from "react";
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

const NFTDetails = () => {
  const [data, setData] = useState();
  const [reqData, setReqData] = useState();
  const { id } = useParams();
  const [price, setPrice] = useState(0);
  const [ethereum, setEthereum] = useState(0);
  const user = useContext(UserContext);

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
    axios
      .post(
        "https://api.artina.org/api/transaction/nft-detail/",
        {
          token_id: id,
        }
        //  url: "https://api.artina.org/api/account/profile/",
      )
      .then((d) => {
        setData(d.data);
        console.log(d.data)
      });

    axios({
      method: "get",
      url: "https://api.artina.org/api/transaction/rate/",
    })
      .then((d) => {
        // console.log("_______rate_______");
        // console.log(d);
        // console.log("__________________");
      })
      .catch();

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
        console.log(d.data);
        setReqData(d);
      })
      .catch((res) => console.log(res));
  }, []);

  function addRequest() {
    axios
      .post(
        "https://api.artina.org/api/transaction/orders/",
        {
          token_id: id,
          fee: price.toFixed(0).toString(),
          status: 0,
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
        Notify.failure("خطا");
        console.log(exception);
      });
  }

  return (
    <TestLayout>
      <div>
        <div className="flex gap-4 items-start">
          <SimpleCard
            id="RightSide"
            className="bg-[#4e45d0] w-full flex flex-col relative gap-6 items-center "
          >
            <div className="flex flex-col gap-5 w-full">
              <img
                src={data ? data.image_url : ""}
                className="rounded-xl h-auto w-full object-cover"
              />
              <div className="flex gap-3 w-full">
                <div className="bg-[#7168f3] w-full h-16 rounded-xl flex justify-between items-center px-10 transition-all hover:bg-[#574eda]">
                  {icons.heart}
                  <div className="text-white text-[16px]">1571</div>
                </div>
                <div className="bg-[#7168f3] w-full h-16 rounded-xl flex justify-between items-center px-10 transition-all hover:bg-[#574eda]">
                  {icons.eye}
                  <div className="text-white text-[16px]">24566</div>
                </div>
                <div className="bg-[#7168f3] w-full h-16 rounded-xl flex justify-between items-center px-10 transition-all hover:bg-[#574eda]">
                  {icons.share}
                  <div className="text-white text-[16px]">270</div>
                </div>
              </div>
            </div>
          </SimpleCard>
          <SimpleCard
            id="LeftSide"
            className={"flex flex-col gap-12 bg-white w-full"}
          >
            <div className="relative flex items-center pt-3">
              <div className="absolute text-[16px] opacity-40">نام اثر</div>
              <div className="text-[32px] mx-auto">{data ? data.name : ""}</div>
            </div>
            <hr className="opacity-10 mx-32"></hr>
            <div className="relative flex items-center">
              <div className="absolute text-[16px] opacity-40">هنرمند</div>
              <div className="text-[16px] mx-auto">
                {data ? data.creator : ""}
              </div>
            </div>
            {/* <div className="relative flex items-center">
                      <div className="absolute text-[16px] opacity-40">
                        تاریخ ساخت
                      </div>
                      <div className="text-[16px] mx-auto">{item.date}</div>
                    </div> */}
            <hr className="opacity-10 mx-32"></hr>

            <div className="relative flex items-center h-full">
              <div className="absolute text-[16px] opacity-40">توضیحات</div>
              <div className="text-[16px] mr-36 self-start text-right">
                {data ? data.description : ""}
              </div>
            </div>
            <div className="w-full flex justify-end">
              <a href={data ? data.external_link : ""} className="bg-indigo-50 hover:bg-indigo-100 transition-all py-1 px-4 text-gray-600 rounded-lg">لینک خارجی</a>

            </div>

            <div className="relative flex items-center justify-self-end bg-[#f1f2f7] px-10 py-3 rounded-xl">
              <div className="absolute text-[16px] opacity-50">آخرین قیمت</div>
              <div className="text-[22px] mx-auto">
                {data ? data.last_price : ""} اتریوم
              </div>
            </div>
          </SimpleCard>
        </div>
        <div className="flex gap-6">
          <SimpleCard className="bg-white grow flex flex-col relative gap-3 items-center mt-4">
            <div className="flex items-center pt-3">
              <div className="text-[32px] mx-auto">پیشنهادات</div>
            </div>
            <Properties requests={reqData ? reqData : null} nft={id} />
          </SimpleCard>

          {user && (data ? data.is_for_sale : true) ? (
            <>
              <SimpleCard
                id="UserRequests"
                className="bg-white w-1/2 flex flex-col relative gap-3 items-center mt-4"
              >
                <div className="flex items-center pt-3">
                  <div className="text-[32px] mx-auto">پیشنهاد های شما</div>
                </div>
                <Recomendition
                  requests={reqData ? reqData : undefined}
                  nft={id}
                />
                <hr className="text-black opacity-50 bg-black" />
                <div className="bg-indigo-100 rounded-xl p-3 w-full">
                  <div className="w-full text-center font-b6 text-xl">ثبت پیشنهاد جدید</div>
                  <div className="flex gap-1 w-full flex-col">
                    <div className="flex items-center gap-3">
                      <div className="grow">
                        <SimpleInput
                          type={"number"}
                          className={"rounded-lg "}
                          placeholder={"مثلا: 3"}
                          title="قیمت پیشنهادی شما به اتریوم"
                          onChange={(e) => {
                            setPrice(e.target.value * 104759811);
                            setEthereum(e.target.value);
                          }}
                        />
                      </div>
                      <BorderButton
                        className="w-1/4 text-center"
                        onClick={() => addRequest()}
                      >
                        ثبت
                      </BorderButton>
                    </div>
                    <div className="flex gap-1 pr-4 text-sm">
                      قیمت به تومان:
                      <div className="text-indigo-600">&nbsp;{price}&nbsp;</div>
                      تومان
                    </div>
                  </div>
                </div>
              </SimpleCard>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </TestLayout>
  );
};

export default NFTDetails;
