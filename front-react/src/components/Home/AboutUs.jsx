import React from "react";
import { useTranslation } from "react-i18next";

const AboutUs = ({ className }) => {
  const { t } = useTranslation();
  return (
    <div className={`${className}  w-[40vw] rounded-xl mx-[10rem] flex justify-center bg-primary text-primary-content py-16 relative overflow-hidden`}>
      <div className={`w-2/3 flex flex-col items-center sm:w-4/5`}>
        <div className="font-b9 text-[40px] mb-4 sm:text-[30px]">{t("aboutUs")}</div>
        <div
          className="font-b2 text-2xl
        font-bold text-center sm:text-[17px]"
        >
          {t("aboutUsDescription")}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
