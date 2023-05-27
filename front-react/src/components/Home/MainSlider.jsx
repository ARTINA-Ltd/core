import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const MainSlider = () => {
  const [sliderRef] = useKeenSlider({
    loop: true,
  });

  return (
    <div className="w-full h-[700px] keen-slider lg:h-[550px] md:h-[400px]" ref={sliderRef}>
      <div className="keen-slider__slide w-full h-full">
        <img src="/1.jpg" className="object-cover w-full" alt="" />
      </div>
      <div className="keen-slider__slide w-full h-full">
        <img src="/2.jpg" className="object-cover w-full" alt="" />
      </div>
    </div>
  );
};

export default MainSlider;
