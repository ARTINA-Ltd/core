import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const Features = ({ className = "" }) => {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 4,
      spacing: 30,
    },
  });
  return (
    <div className={`${className}  w-full flex justify-center`}>
      <div className={`w-4/5 flex flex-col items-center`}>
        <div className="font-b9 text-[40px] mb-4">امکانات آرتینا</div>
        <div ref={sliderRef} className="keen-slider ">
          <div className="keen-slider__slide">
            <div className={"w-full cursor-pointer"}>
              <img
                src="/3.png"
                className="w-[200px] h-[200px] object-cover rounded-full m-auto"
                alt=""
              />
              <div className="mt-3 font-b5 text-[24px]">کانکت والت</div>
            </div>
          </div>
          <div className="keen-slider__slide">
            <div className={"w-full cursor-pointer"}>
              <img
                src="/3.png"
                className="w-[200px] h-[200px] object-cover rounded-full m-auto"
                alt=""
              />
              <div className="mt-3 font-b5 text-[24px]">کانکت والت</div>
            </div>
          </div><div className="keen-slider__slide">
            <div className={"w-full cursor-pointer"}>
              <img
                src="/3.png"
                className="w-[200px] h-[200px] object-cover rounded-full m-auto"
                alt=""
              />
              <div className="mt-3 font-b5 text-[24px]">کانکت والت</div>
            </div>
          </div><div className="keen-slider__slide">
            <div className={"w-full cursor-pointer"}>
              <img
                src="/3.png"
                className="w-[200px] h-[200px] object-cover rounded-full m-auto"
                alt=""
              />
              <div className="mt-3 font-b5 text-[24px]">کانکت والت</div>
            </div>
          </div><div className="keen-slider__slide">
            <div className={"w-full cursor-pointer"}>
              <img
                src="/3.png"
                className="w-[200px] h-[200px] object-cover rounded-full m-auto"
                alt=""
              />
              <div className="mt-3 font-b5 text-[24px]">کانکت والت</div>
            </div>
          </div><div className="keen-slider__slide">
            <div className={"w-full cursor-pointer"}>
              <img
                src="/3.png"
                className="w-[200px] h-[200px] object-cover rounded-full m-auto"
                alt=""
              />
              <div className="mt-3 font-b5 text-[24px]">کانکت والت</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
