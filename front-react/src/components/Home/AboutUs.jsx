import React from "react";
import { useTranslation } from "react-i18next";

const AboutUs = ({ className }) => {
  const { t } = useTranslation();
  return (
    <div
      className={`${className}  w-full flex justify-center bg-[#4e45d0] text-white py-16 relative overflow-hidden`}
    >
      <img
        alt=""
        src="/mand1.png"
        className=" opacity-[15%] absolute top-1/2 -translate-y-1/2 pointer-events-none overflow-hidden"
      />
      <div className={`w-2/3 flex flex-col items-center sm:w-4/5`}>
        <div className="font-b9 text-[40px] mb-4 sm:text-[30px]">
          {t("aboutUs")}
        </div>
        <div className="font-b2 text-[22px] text-center sm:text-[17px]">
          {t("aboutUsDescription")}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
