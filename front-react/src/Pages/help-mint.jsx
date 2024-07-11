import React from "react";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import TestLayout from "../Layouts/TestLayout";
import { useTranslation } from "react-i18next";
import i18n from "./../i18n";

const HelpMint = () => {
  const { t } = useTranslation("mintQuide");
  return (
    <TestLayout>
      <div className="w-[55%] m-auto lg:w-4/5 md:w-11/12">
        <SimpleCard className={"text-center bg-base-100 leading-[40px]"}>
          <div className="text-[32px] mb-5 sm:text-[25px]">{t("header")}</div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">{t("step1")}</div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">{t("step2")}</div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">
            {t("step3.before")}
            <a className="text-[18px] mb-4 text-justify text-purple-700" href="https://artina.org/help-create-wallet">
              {" "}
              {t("step3.link")}{" "}
            </a>
            {t("step3.after")}
          </div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">{t("step4")}</div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">{t("example")}</div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">
            <img src={i18n.language === "fa" ? "/help-mint-1-fa.png" : "/help-mint-1-en.png"} className=" object-cover m-auto" alt="" />
          </div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">{t("step5")}</div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">{t("step6")}</div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">
            <img src={i18n.language === "fa" ? "/help-mint-2-fa.png" : "/help-mint-2-en.png"} className=" object-cover m-auto" alt="" />
          </div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">{t("step7")}</div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">
            <img src="/help-mint-3.png" className=" object-cover m-auto" alt="" />
          </div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">{t("step8")}</div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">
            <img src="/help-mint-4.png" className=" object-cover m-auto" alt="" />
          </div>
        </SimpleCard>
      </div>
    </TestLayout>
  );
};

export default HelpMint;
