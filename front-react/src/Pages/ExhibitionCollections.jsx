import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import TestLayout from "../Layouts/TestLayout";

import { useParams } from "react-router";

const ExhibitionCollections = () => {
  const [nfts, setNfts] = useState([]);
  const [exhibition, setExhibition] = useState();
  const [banner, setBanner] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://api.artina.org/api/exhibition/nfts-by-exhibition/${id}/`).then((res) => {
      setExhibition(res.data);
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

  return (
    <TestLayout>
      {exhibition && banner && (
        <div className="w-full flex flex-wrap justify-between p-4 md:block  min-h-[calc(100vh-80px)]">
          <div className={`relative max-w-[calc(50%-5rem)] md:max-w-full md:w-full  bg-transparent rounded-2xl flex flex-col`}>
            <img src={banner} alt="" className="absolute w-full h-full z-0 object-cover blur-md opacity-70" />
            <img src={banner} className={`bg-transparent p-0 z-10 my-auto object-contain max-h-[80vh] w-full rounded-2xl`} alt="" />
            <div className="flex w-full flex-wrap justify-between my-4 md:mt-4 mt-auto">
              <Swiper loop={true} slidesPerView={4} spaceBetween={0}>
                {nfts.length !== 0 &&
                  nfts.map((item) => {
                    return (
                      <SwiperSlide>
                        <img
                          src={item.image_url}
                          alt={item.name}
                          onClick={() => {
                            setBanner(item.image_url);
                          }}
                          className="w-24 h-24 object-cover rounded-md shadow-md border-4 border-[#4e45d0]  cursor-pointer ease-in-out duration-300 hover:shadow-[#4e45d0]"
                        ></img>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
          </div>
          <div className="bg-white rounded-xl mt-4 max-w-[calc(50%-5rem)] md:max-w-full flex flex-col gap-12 p-8 md:w-full container mx-8 lg:w-1/3 md:w-fulls">
            <h4 className="text-5xl font-bold text-gray-800">{exhibition.marketName}</h4>
            <p className="text-gray-600 text-2xl my-4 ">{exhibition.description}</p>
            <h4 className="text-gray-600 text-2xl">
              تاریخ شروع:{" "}
              {Intl.DateTimeFormat("fa", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              }).format(new Date(exhibition.start_date))}
            </h4>
            <h4 className="text-gray-600 text-2xl">
              تاریخ پایان:{" "}
              {Intl.DateTimeFormat("fa", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              }).format(new Date(exhibition.end_date))}
            </h4>
            <h4 className="text-gray-600 text-2xl">
              پایان ثبت نام:{" "}
              {Intl.DateTimeFormat("fa", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              }).format(new Date(exhibition.application_deadline))}
              -
              {Intl.DateTimeFormat("fa", {
                minute: "numeric",
                hour: "numeric",
              }).format(new Date(exhibition.application_deadline))}
            </h4>
            {exhibition.has_ticket && (
              <div>
                <button className="w-full bg-[#4e45d0] p-4 rounded-2xl text-white text-2xl hover:bg-[#7369ff] ease-in-out duration-300">خرید بلیت به قیمت {exhibition.price}</button>
              </div>
            )}
          </div>
        </div>
      )}
    </TestLayout>
  );
};

export default ExhibitionCollections;
