import { React, useState, useLayoutEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const Features = ({ className = "" }) => {

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

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: isMobile ? 1 : isTablet ? 2 : 4,
      spacing: isMobile ? 10 : isTablet ? 15 : 25,
    },
  });
  return (
    <div className={`${className}  w-full flex justify-center lg:my-10`}>
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
              <div className="mt-3 font-b5 text-[24px] text-center">کانکت والت</div>
            </div>
          </div>
          <div className="keen-slider__slide">
            <div className={"w-full cursor-pointer"}>
              <img
                src="/Metaverse-logo.jpeg"
                className="w-[200px] h-[200px] object-cover rounded-full m-auto"
                alt=""
              />
              <div className="mt-3 font-b5 text-[24px] text-center">متاورس</div>
            </div>
          </div><div className="keen-slider__slide">
            <div className={"w-full cursor-pointer"}>
              <img
                src="/Blog-logo.jpeg"
                className="w-[200px] h-[200px] object-cover rounded-full m-auto"
                alt=""
              />
              <div className="mt-3 font-b5 text-[24px] text-center">بلاگ</div>
            </div>
          </div><div className="keen-slider__slide">
            <div className={"w-full cursor-pointer"}>
              <img
                src="/AI-logo.png"
                className="w-[200px] h-[200px] object-cover rounded-full m-auto"
                alt=""
              />
              <div className="mt-3 font-b5 text-[24px] text-center">آرتینا AI</div>
            </div>
          </div><div className="keen-slider__slide">
            <div className={"w-full cursor-pointer"}>
              <img
                src="/Blockchain-logo.png"
                className="w-[200px] h-[200px] object-cover rounded-full m-auto"
                alt=""
              />
              <div className="mt-3 font-b5 text-[24px] text-center">بستر بلاکچینی</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
