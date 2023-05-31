import React from "react";

const AboutUs = ({ className }) => {
  return (
    <div
      className={`${className}  w-full flex justify-center bg-[#4e45d0] text-white py-16 relative overflow-hidden`}
    >
      <img
        src="/mand1.png"
        className=" opacity-[15%] absolute top-1/2 -translate-y-1/2 pointer-events-none overflow-hidden"
      />
      <div className={`w-2/3 flex flex-col items-center sm:w-4/5`}>
        <div className="font-b9 text-[40px] mb-4">
          درباره ما
        </div>
        <div className="font-b2 text-[22px] text-center sm:">
          آرتینا یک پلتفرم خرید و فروش آثار هنری در قالب NFT با رویکرد توانمند
          سازی هنرمندان در بنمایش گذاشتن و خرید و فروش آثارشان است و برای
          نمایشگاه دار ها و هنرمندان امکان ایجاد نمایشگاه های مجازی و خرید و
          فروش با رمز ارز را فراهم کرده است.
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
