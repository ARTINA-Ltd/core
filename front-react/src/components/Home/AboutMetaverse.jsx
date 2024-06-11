import React from "react";
import { useTranslation } from "react-i18next";

const AboutMetaverse = ({ className }) => {
  const { t } = useTranslation();
  return (
    <div className={`${className} w-[80vw] mx-auto p-8 my-16 rounded-xl bg-base-100`}>
      <div className={`flex w-full items-center justify-between md:flex-col text-base-content`}>
        <div className="w-[calc(45%-1rem)] md:w-full md:mx-auto lg:mt-4">
          <div className="font-b9 text-[40px] mb-4 sm:text-[30px] pb-5 sm:mb-2 sm:pb-2">{t("metaverseUsage")}</div>
          <div className="font-b2 text-[22px] mx-4 text-justify sm:text-[17px] lg:pb-4">{t("metaverseUsageDecription")}</div>
        </div>
        <div className="w-[calc(55%-2rem)] z-20 md:w-full md:mx-auto  ">
          <img src="/AboutMetaverse.png" className=" object-cover rounded-3xl w-full" alt="" />
        </div>
      </div>
    </div>
  );
};

export default AboutMetaverse;
