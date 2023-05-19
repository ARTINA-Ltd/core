import React, { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import SimpleCard from "../Cards/UserDashboardCards/SimpleCard";
import { useNavigate } from "react-router";
import axios from "axios";

const ExhebitionList = ({ className }) => {
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://api.artina.org/api/exhibition/exhibitions/")
      .then((d) => {
        console.log("Exhebitions");
        console.log(d);
        console.log("__________________");
        setData(d.data);
      });
  }, []);

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 40,
    },
  });
  if(data){
    return (
      <div className={`w-full flex flex-col items-center relative ${className}`}>
        <img
          src="/4.png"
          className=" opacity-[10%] absolute top-1/2 -translate-y-1/2 pointer-events-none overflow-hidden"
        />
        <div className="font-b9 text-[40px] mb-4">لیست نمایشگاه ها</div>
        <div className="w-3/4">
          <div ref={sliderRef} className="keen-slider ">
            {data
              ? data.map((item, index) => (
                  <div className="keen-slider__slide" key={index}>
                    <SimpleCard className={"bg-white  cursor-pointer"}>
                      <img
                        src={item.image}
                        className="w-full h-96 object-cover rounded-2xl"
                        alt=""
                      />
                      <div className="mt-3 font-b4 text-[24px]">{item.marketName}</div>
                    </SimpleCard>
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>
    )
  }else{
    return null;
  }
};

export default ExhebitionList;
