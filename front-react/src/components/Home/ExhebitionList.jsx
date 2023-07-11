import React, { useEffect, useState, useLayoutEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import SimpleCard from "../Cards/UserDashboardCards/SimpleCard";
import { useNavigate } from "react-router";
import axios from "axios";

const ExhebitionList = ({ className }) => {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useLayoutEffect(() => {
    function updateScreenSize() {
      const screenWidth = window.innerWidth;
      setIsMobile(screenWidth < 768);
      setIsTablet(screenWidth >= 768 && screenWidth < 1024);
    }

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  useEffect(() => {
    axios
      .get("https://api.artina.org/api/exhibition/exhibitions/")
      .then((d) => {
        setData(d.data);
      });
  }, []);

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: isMobile ? 1 : isTablet ? 2 : 3,
      spacing: isMobile ? 15 : isTablet ? 20 : 30,
    },
  });
  if (data) {
    return (
      <div className={`w-full flex flex-col items-center relative bg-[#f9f9f9] bg-[url('https://artina.org/5.png')] bg-center bg-no-repeat py-10 ${className}`}>
        
        <div className="font-b9 text-[40px] mb-2 sm:text-[30px]">لیست نمایشگاه ها</div>
        <div className="font-b5 text-lg mb-4 cursor-pointer opacity-40"
                onClick={() => navigate(`/exhibition-list`)}
        
        >مشاهده همه</div>
        <div className="w-4/5 lg:w-10/12">
          <div ref={sliderRef} className="keen-slider ">
            {data
              ? data.map((item, index) => (
                <div className="keen-slider__slide" key={index} 
                onClick={() => navigate(`/exhibition-collections/${item.id}`)}
                
                >
                  <SimpleCard className={"bg-white  cursor-pointer lg:p-5"}>
                    <img
                      src={item.image}
                      className="w-full h-96 object-cover rounded-2xl"
                      alt=""
                    />
                    <div className="mt-3 font-b4 text-[24px] text-center">{item.marketName}</div>
                  </SimpleCard>
                </div>
              ))
              : ""}
          </div>
        </div>
      </div>
    )
  } else {
    return null;
  }
};

export default ExhebitionList;
