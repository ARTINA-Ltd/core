import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./styles.css";
import { useNavigate } from "react-router";
import { BorderBottom } from "@mui/icons-material";
import BorderButton from "../Buttons/BorderButton.jsx";

const NftsSwiper = (props) => {
  const items = props;
  const navigate = useNavigate();
  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={"auto"}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      pagination={true}
      modules={[EffectCoverflow, Pagination]}
      className="mySwiper"
    >
      {items.items.map((item, index) => {
        return (
          <SwiperSlide key={index} className="flex-col gap-8 ralative items-center z-50 justify-center overflow-visible pb-8 my-12">
            <div className="w-full h-full bg-white absolute   -z-10 blur-md "></div>
            <img className="background absolute  w-full -z-10 rounded-[10%] h-full blur-md opacity-80 " src={item.image_url} alt="item.name" />
            <img src={item.image_url} alt="item.name" className="translate-y-20 shadow-md rounded-md shadow-black lg:-translate-y-0" />
            <div className="bg-white bg-opacity-90 z-10 cursor-default gap-2 p-4 self-start rounded-md shadow-md sm:self-center">
              {item.name && <p className="text-2xl">نام اثر: {item.name}</p>}
              {item.creator && <p className="text-2xl">خالق اثر: {item.creator}</p>}
              {item.description && <p className="text-2xl">توضیحات: {item.description}</p>}
              <button
                onClick={() => {
                  navigate(`/nft-details/${item.token_id}`);
                }}
                className="btn glass mt-2 z-20 self-start text-white hover:text-black bg-[#4e45d0]"
              >
                ثبت پیشنهاد{" "}
              </button>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
export default NftsSwiper;
