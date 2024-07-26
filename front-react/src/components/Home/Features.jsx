import "keen-slider/keen-slider.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import imageThree from "../../assets/images/3.png"
import aiLogo from "../../assets/images/AI-logo.png"
import BlockchainLogo from "../../assets/images/Blockchain-logo.png"
import blogLogio from "../../assets/images/Blog-logo.jpeg"
import maticIc from "../../assets/images/matic-ic.png"
import maticLogo from "../../assets/images/matic-logo.png"
import MetaverseLogo from "../../assets/images/Metaverse-logo.jpeg"
import walletVectorIcon from "../../assets/images/wallet-vector-icon.jpg"

const Features = ({ className = "" }) => {
  require("./Home.css");

  return (
    <div className={`${className}  w-full flex justify-center lg:my-10 `}>
      <div className={`w-4/5 flex flex-col items-center text-black`}>
        <div className="font-b9 text-[40px] mb-4 sm:text-[30px]">
          نوآوری‌های آرتینا
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
              slidesPerView: 1,
              spaceBetween: 10,
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
                src={imageThree}
                className="w-[200px] h-[200px] object-cover rounded-full m-auto sm:mx-2"
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
                src={MetaverseLogo}
                className="w-[200px] h-[200px] object-cover rounded-full m-auto sm:mx-2"
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
                src={blogLogio}
                className="w-[200px] h-[200px] object-cover rounded-full m-auto sm:mx-2"
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
                src={aiLogo}
                className="w-[200px] h-[200px] object-cover rounded-full m-auto sm:mx-2"
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
                src={walletVectorIcon}
                className="w-[200px] h-[200px] object-cover rounded-full m-auto sm:mx-2"
                alt=""
              />
              <div className="mt-3 font-b5 text-[24px] text-center">
                ساخت کیف پول Matic
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className={"w-full cursor-pointer"}
              onClick={() => window.open("https://artina.org/ai")}
            >
              <img
                src={maticLogo}
                className="w-[200px] h-[200px] object-cover rounded-full m-auto sm:mx-2"
                alt=""
              />
              <div className="mt-3 font-b5 text-[24px] text-center">
                رهگیری تراکنش‌ها
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className={"w-full cursor-pointer"}
              onClick={() => window.open("https://artina.org/ai")}
            >
              <img
                src={maticIc}
                className="w-[200px] h-[200px] object-cover rounded-full m-auto sm:mx-2"
                alt=""
              />
              <div className="mt-3 font-b5 text-[24px] text-center">
                خرید مستقیم Matic
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className={"w-full cursor-pointer"}>
              <img
                src={BlockchainLogo}
                className="w-[200px] h-[200px] object-cover rounded-full m-auto sm:m-1"
                alt=""
              />
              <div className="mt-3 font-b5 text-[24px] text-center">
                بستر بلاکچینی
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Features;
