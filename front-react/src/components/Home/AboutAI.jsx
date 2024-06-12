import React from "react";
import { useTranslation } from "react-i18next";

const AboutAI = ({ className }) => {
  const { t } = useTranslation();
  return (
    <div className={`${className} p-8 w-[80vw] mx-auto rounded-xl bg-primary text-primary-content relative overflow-hidden sm:py-4`}>
      <div className={`w-full flex justify-between items-center md:flex-col `}>
        <div className="w-[calc(60%-2rem)] z-20 md:w-full md:mx-auto">
          <img src="/AboutAI.png" className="object-cover w-full rounded-3xl shadow-2xl" alt="" />
        </div>
        <div className="w-[calc(40%-1rem)]  md:w-full lg:mx-auto  lg:mt-4">
          <div className="font-b9 text-[40px] mb-4 pb-5 lg:text-[30px] sm:text-[25px] sm:pb-2 sm:mb-2">{t("AIGenerator")} </div>
          <div className="font-b2 text-[22px] font-bold text-justify sm:text-[17px]">{t("AIGeneratorDescription")}</div>
        </div>
      </div>
    </div>
  );
};

export default AboutAI;
