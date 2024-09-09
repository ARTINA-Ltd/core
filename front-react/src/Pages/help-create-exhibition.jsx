import React from "react";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import TestLayout from "../Layouts/TestLayout";
import { useTranslation } from "react-i18next";
import i18n from "./../i18n";
import helpExhibitionFa1 from "../assets/images/help-exhibition-1-fa.png";
import helpExhibitionEn1 from "../assets/images/help-exhibition-1-en.png";
import helpExhibitionFa2 from "../assets/images/help-exhibition-2-fa.png";
import helpExhibitionEn2 from "../assets/images/help-exhibition-2-en.png";

const HelpCreateExhibition = () => {
  const { t } = useTranslation("exhibitionQuide");
  return (
    <TestLayout>
      <div className="w-[55%] m-auto lg:w-4/5 md:w-11/12">
        <SimpleCard className={"text-center bg-base-100 leading-[40px]"}>
          <div className="text-[32px] mb-5 sm:text-[25px]">{t("header")}</div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">{t("step1")}</div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">
            {t("step2.before")}
            <a className="text-[18px] mb-4 text-justify text-purple-700" href="https://artina.org/help-mint">
              {" "}{t("step2.link")}{" "}
            </a>
            {t("step2.after")}
          </div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">{t("step3")}</div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">{t("step4")}</div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">{t("example")}</div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">
            <img src={i18n.language === "fa" ? helpExhibitionFa1 : helpExhibitionEn1} className=" object-cover m-auto sm:max-w-xs" alt="" />
          </div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">{t("step5")}</div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">{t("step6")}</div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">
            <img src={i18n.language === "fa" ? helpExhibitionFa2 : helpExhibitionEn2} className=" object-cover m-auto max-w-xs sm:max-w-[270px]" alt="" />
          </div>
        </SimpleCard>
      </div>
    </TestLayout>
  );
};

export default HelpCreateExhibition;