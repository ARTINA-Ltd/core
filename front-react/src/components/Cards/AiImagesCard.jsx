import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";

import { EffectCards } from "swiper/modules";
import { Navigation } from "swiper/modules";

const AiImagesCard = () => {
  require("./AiImagesCard.css");

  return (
    <Swiper
      effect={"cards"}
      grabCursor={true}
      navigation={true}
      modules={[EffectCards, Navigation]}
      className="ai"
    >
      <SwiperSlide>
        <div className="flex flex-col relative">
          <img src="/7.png" className="object-cover" alt="" />
          <div className="absolute bottom-10 left-0 right-0 mx-auto bg-black/10 backdrop-blur-xl py-4 z-30 text-center text-sm cursor-pointer text-white mb-4">
            Share | Download
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex flex-col relative">
          <img src="/8.png" className="object-cover" alt="" />
          <div className="absolute bottom-10 left-0 right-0 mx-auto bg-black/10 backdrop-blur-xl py-4 z-30 text-center text-sm cursor-pointer text-white mb-4">
            Share | Download
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex flex-col relative">
          <img src="/7.png" className="object-cover" alt="" />
          <div className="absolute bottom-10 left-0 right-0 mx-auto bg-black/10 backdrop-blur-xl py-4 z-30 text-center text-sm cursor-pointer text-white mb-4">
            Share | Download
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex flex-col relative">
          <img src="/8.png" className="object-cover" alt="" />
          <div className="absolute bottom-10 left-0 right-0 mx-auto bg-black/10 backdrop-blur-xl py-4 z-30 text-center text-sm cursor-pointer text-white mb-4">
            Share | Download
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default AiImagesCard;
