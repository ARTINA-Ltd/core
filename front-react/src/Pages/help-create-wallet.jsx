import React from "react";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import TestLayout from "../Layouts/TestLayout";
import { useTranslation } from "react-i18next";
import i18n from "../i18n.js";
import helpWallet1 from "../assets/images/help-wallet-1.png"
import helpWallet2 from "../assets/images/help-wallet-2.png"

const HelpCreateWallet = () => {
  const { t } = useTranslation("walletQuide");
  return (
    <TestLayout>
      <div className="w-[55%] m-auto lg:w-4/5 md:w-11/12">
        <SimpleCard className={"text-center bg-base-100 leading-[40px]"}>
          <div className={`text-[32px] ${i18n.dir() === "rtl" ? "text-right" : "text-left"}  mb-5 sm:text-[25px]`}>{t("header")}</div>
          <div className="text-[18px] mb-7 text-center sm:px-3 sm:text-[14px]">{t("firstparagraph")}</div>
          <div className={`text-[25px] mb-2 mr-5 ${i18n.dir() === "rtl" ? "text-right" : "text-left"}`}>{t("secondHeader")}</div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">
            {t("step1.before")}
            <a className="text-[18px] mb-4 text-justify text-purple-700" href="https://metamask.io/download/">
              {" "}
              {t("step1.link")}
            </a>
            {t("step1.after")}{" "}
          </div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">{t("step2")}</div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">{t("step3")}</div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">{t("step4")}</div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">
            <img src={helpWallet1} className=" object-cover m-auto" alt="" />
          </div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">{t("step5")}</div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">
            <img src={helpWallet2} className=" object-cover m-auto" alt="" />
          </div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">{t("step6")}</div>
          <div dir="rtl" className="text-[18px] mb-4 px-6 text-left sm:px-3 sm:text-[10px]">
            Network Name: Mumbai
            <br />
            New RPC URL: https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78
            <br />
            Chain ID: 80001
            <br />
            Currency Symbol: MATIC
            <br />
            Block Explorer URL: https://mumbai.polygonscan.com
          </div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">{t("step7")}</div>
        </SimpleCard>
      </div>
    </TestLayout>
  );
};

export default HelpCreateWallet;
