import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import TestLayout from "../Layouts/TestLayout";
import { useParams } from "react-router";
import NftsSwiper from "../components/NftsSwiper/NftsSwiper.jsx";
import CountdownTimer from "./../components/CountdownTimer";

const ExhibitionCollections = () => {
  const [nfts, setNfts] = useState([]);
  const [exhibition, setExhibition] = useState(null);
  const [banner, setBanner] = useState(null);
  const [deadline, setDeadline] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    axios.get(`https://api.artina.org/api/exhibition/nfts-by-exhibition/${id}/`).then((res) => {
      setExhibition(res.data);
      setDeadline(res.data.application_deadline);
      setBanner(res.data.image);
    });
    axios
      .get(`https://api.artina.org/api/exhibition/nfts-by-exhibition/${id}/get_nfts/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
      })
      .then((e) => {
        setNfts(e.data);
        console.log(e.data);
      })
      .catch((e) => {
        console.log(e);
      });
    axios
      .post(
        "https://api.artina.org/api/exhibition/Ticket/check_user_ticket/",
        {
          exhibition_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
          mode: "cors",
        }
      )
      .then((res) => {});
  }, []);
  // email nameoncard country cardnumber exprdate cvc postcode address1 adderess2
  return (
    <TestLayout>
      {exhibition && banner && (
        <div className="w-full flex flex-wrap  justify-between p-4 lg:block gap-4 min-h-[calc(100vh-80px)]">
          <div className={`relative w-[calc(50%-0.5rem)] lg:w-full mx-auto bg-transparent rounded-2xl flex flex-col`}>
            <img src={banner} alt="" className="absolute w-full h-full z-0 object-cover blur-md opacity-70" />
            <img src={banner} className={`bg-transparent p-0 z-10 my-auto object-contain max-h-[80vh] w-full rounded-2xl`} alt="" />
            <div className="flex w-full flex-wrap justify-between my-4 md:mt-4 mt-auto"></div>
          </div>
          <div className="bg-base-100 rounded-xl w-[calc(50%-0.5rem)] mt-4 mx-auto shadow-md md:max-w-full flex flex-col gap-8 p-8 md:gap-4 container lg:w-full lg:mb-12">
            <h4 className="text-5xl md:text-3xl  font-bold ">{exhibition.marketName}</h4>
            <p className=" text-2xl md:text-xl my-4 ">{exhibition.description}</p>
            <h4 className=" text-2xl md:text-xl">
              تاریخ شروع:{" "}
              {Intl.DateTimeFormat("fa", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              }).format(new Date(exhibition.start_date))}
            </h4>
            <h4 className=" text-2xl md:text-xl">
              تاریخ پایان:{" "}
              {Intl.DateTimeFormat("fa", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              }).format(new Date(exhibition.end_date))}
            </h4>
            <h4 className=" text-2xl md:text-xl">
              پایان ثبت نام:{" "}
              {Intl.DateTimeFormat("fa", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              }).format(new Date(exhibition.application_deadline))}
              <br />
              {Intl.DateTimeFormat("fa", {
                minute: "numeric",
                hour: "numeric",
              }).format(new Date(exhibition.application_deadline))}
            </h4>
            <h4>
              <CountdownTimer targetDate={deadline} />
            </h4>
            {exhibition.has_ticket && (
              <div>
                <button className="btn glass bg-[#4e45d0] hover:shadow-md md:text-xl">خرید بلیت به قیمت {exhibition.price}</button>
              </div>
            )}
          </div>
          {nfts && <NftsSwiper items={nfts}></NftsSwiper>}
        </div>
      )}
    </TestLayout>
  );
};

export default ExhibitionCollections;
