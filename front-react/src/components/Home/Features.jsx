import { React, useState, useLayoutEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";


const Features = ({ className = "" }) => {
  require("./Home.css");

  // const [isMobile, setIsMobile] = useState(false);
  // const [isTablet, setIsTablet] = useState(false);

  // useLayoutEffect(() => {
  //   function updateScreenSize() {
  //     const screenWidth = window.innerWidth;
  //     setIsMobile(screenWidth < 768);
  //     setIsTablet(screenWidth >= 768 && screenWidth < 1024);
  //   }

  //   updateScreenSize();
  //   window.addEventListener("resize", updateScreenSize);
  //   return () => window.removeEventListener("resize", updateScreenSize);
  // }, []);

  // const [sliderRef] = useKeenSlider({
  //   slides: {
  //     perView: isMobile ? 1 : isTablet ? 2 : 4,
  //     spacing: isMobile ? 10 : isTablet ? 15 : 25,
  //   },
  // });
  return (
    <div className={`${className}  w-full flex justify-center lg:my-10 `}>
      <div className={`w-4/5 flex flex-col items-center text-black`}>
        <div className="font-b9 text-[40px] mb-4 sm:text-[30px]">
          امکانات آرتینا
        </div>

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
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination]}
          className="aboutus"
        >
          <SwiperSlide>
            <div className={"w-full cursor-pointer"}>
              <img
                src="/3.png"
                className="w-[200px] h-[200px] object-cover rounded-full m-auto"
                alt=""
              />
              <div className="mt-3 font-b5 text-[24px] text-center">
                کانکت والت
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className={"w-full cursor-pointer"}
              onClick={() => window.open("https://metaverse.artina.org/")}
            >
              <img
                src="/Metaverse-logo.jpeg"
                className="w-[200px] h-[200px] object-cover rounded-full m-auto"
                alt=""
              />
              <div className="mt-3 font-b5 text-[24px] text-center">متاورس</div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className={"w-full cursor-pointer"}
              onClick={() => window.open("https://blog.artina.org/")}
            >
              <img
                src="/Blog-logo.jpeg"
                className="w-[200px] h-[200px] object-cover rounded-full m-auto"
                alt=""
              />
              <div className="mt-3 font-b5 text-[24px] text-center">بلاگ</div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className={"w-full cursor-pointer"}
              onClick={() => window.open("https://artina.org/ai")}
            >
              <img
                src="/AI-logo.png"
                className="w-[200px] h-[200px] object-cover rounded-full m-auto"
                alt=""
              />
              <div className="mt-3 font-b5 text-[24px] text-center">
                آرتینا AI
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className={"w-full cursor-pointer"}>
              <img
                src="/Blockchain-logo.png"
                className="w-[200px] h-[200px] object-cover rounded-full m-auto"
                alt=""
              />
              <div className="mt-3 font-b5 text-[24px] text-center">
                بستر بلاکچینی
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        {/* <div ref={sliderRef} className="keen-slider ">
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
            <div className={"w-full cursor-pointer"} onClick={()=>window.open("https://metaverse.artina.org/")}>
              <img
                src="/Metaverse-logo.jpeg"
                className="w-[200px] h-[200px] object-cover rounded-full m-auto"
                alt=""
              />
              <div className="mt-3 font-b5 text-[24px] text-center">متاورس</div>
            </div>
          </div><div className="keen-slider__slide">
            <div className={"w-full cursor-pointer"} onClick={()=>window.open("https://blog.artina.org/")}>
              <img
                src="/Blog-logo.jpeg"
                className="w-[200px] h-[200px] object-cover rounded-full m-auto"
                alt=""
              />
              <div className="mt-3 font-b5 text-[24px] text-center">بلاگ</div>
            </div>
          </div><div className="keen-slider__slide">
            <div className={"w-full cursor-pointer"} onClick={()=>window.open("https://ai.artina.org/generate_pic")}>
              <img
                src="/AI-logo.png"
                className="w-[200px] h-[200px] object-cover rounded-full m-auto"
                alt=""
              />
              <div className="mt-3 font-b5 text-[24px] text-center" >آرتینا AI</div>
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
        </div> */}
      </div>
    </div>
  );
};

export default Features;
