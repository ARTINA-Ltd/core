import React from "react";
import { useTranslation } from "react-i18next";

const AboutAI = ({ className }) => {
  const { t } = useTranslation();
  return (
    <div className={`${className}  w-[80vw] mx-auto rounded-xl flex justify-center bg-primary text-primary-content py-16 relative overflow-hidden sm:py-4`}>
      <div className={`w-10/12 flex items-center sm:w-4/5 md:flex-col lg:items-center lg:w-[75%]`}>
        <div className="text-[18px] mb-4 text-justify pl-16 z-20 lg:pl-0">
          <img src="/AboutAI.png" className=" object-cover max-w-2xl rounded-3xl shadow-2xl lg:max-w-md sm:max-w-sm" alt="" />
        </div>
        <div>
          <div className="font-b9 text-[40px] mx-4 mb-4 pb-5 lg:text-[30px] sm:text-[25px] sm:pb-2 sm:mb-2">{t("AIGenerator")} </div>
          <div className="font-b2 text-[22px] mx-4 text-justify sm:text-[17px]">{t("AIGeneratorDescription")}</div>
          {/* <BorderButton
                        onClick={() => { navigate("/login") }} >
                        ورود
                    </BorderButton> */}
        </div>
      </div>
    </div>
  );
};

export default AboutAI;
