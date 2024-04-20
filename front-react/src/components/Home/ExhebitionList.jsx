import React, { useEffect, useState, useLayoutEffect } from "react";
import "keen-slider/keen-slider.min.css";
import SimpleCard from "../Cards/UserDashboardCards/SimpleCard";
import { useNavigate } from "react-router";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next";

const ExhebitionList = ({ className }) => {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    axios.get("https://api.artina.org/api/exhibition/exhibitions/").then((d) => {
      setData(d.data.slice(0, 6));
    });
  }, []);

  if (data) {
    return (
      <div className={`w-full flex flex-col items-center relative bg-[#f9f9f9] bg-[url('https://artina.org/5.png')] bg-center bg-no-repeat py-10 ${className}`}>
        <div className="font-b9 text-[40px] mb-2 sm:text-[30px]">{t("exhibiotionListTitle")}</div>
        <div className="font-b5 text-lg mb-4 cursor-pointer opacity-40" onClick={() => navigate(`/exhibition-list`)}>
          {t("showAll")}
        </div>
        <div className="w-4/5 lg:w-10/12">
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            pagination={{
              dynamicBullets: true,
              clickable: true,
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              1360: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
              1800: {
                slidesPerView: 4,
                spaceBetween: 50,
              },
            }}
            modules={[Pagination]}
            className="aboutus"
          >
            {data
              ? data.map((item, index) => (
                  <SwiperSlide key={index}>
                    <SimpleCard className={"bg-white w-full lg:p-5"}>
                      <img src={item.image} className="w-full h-96 object-cover rounded-2xl" alt="" />
                      <div className="mt-3 font-b4 text-[24px] text-center cursor-pointer" onClick={() => navigate(`/exhibition-collections/${item.id}`)}>
                        {item.marketName}
                      </div>
                    </SimpleCard>
                  </SwiperSlide>
                ))
              : ""}
          </Swiper>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ExhebitionList;
