import React from "react";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import TestLayout from "../Layouts/TestLayout";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const { t } = useTranslation("terms");
  return (
    <TestLayout>
      <div className="w-[55%] m-auto lg:w-4/5 md:w-11/12">
        <SimpleCard className={"text-center bg-base-100 leading-[40px]"}>
          <div className="text-[32px] mb-10">{t("header")}</div>
          
          <div className="text-[25px] mb-2 mr-6">{t("h1")}</div>
          <div className="text-[18px] mb-7 text-justify px-6">{t("p1")}</div>
          
          <div className="text-[25px] mb-2 mr-6">{t("h2")}</div>
          <div className="text-[18px] mb-7 text-justify px-6">{t("p2")}</div>

          <div className="text-[25px] mb-2 mr-6">{t("h3")}</div>
          <div className="text-[18px] mb-7 text-justify px-6">{t("p3")}</div>

          <div className="text-[25px] mb-2 mr-6">{t("h4")}</div>
          <div className="text-[18px] mb-7 text-justify px-6">{t("p4")}</div>

          <div className="text-[25px] mb-2 mr-6">{t("h5")}</div>
          <div className="text-[18px] mb-7 text-justify px-6">{t("p5")}</div>

          <div className="text-[25px] mb-2 mr-6">{t("h6")}</div>
          <div className="text-[18px] mb-7 text-justify px-6">{t("p6")}</div>

          <div className="text-[25px] mb-2 mr-6">{t("h7")}</div>
          <div className="text-[18px] mb-7 text-justify px-6">{t("p7")}</div>

          <div className="text-[25px] mb-2 mr-6">{t("h8")}</div>
          <div className="text-[18px] mb-7 text-justify px-6">
            <p>{t("p8-1")}</p>
            <p>{t("p8-2")}</p>
            <p>{t("p8-3")}</p>
            <p>{t("p8-4")}</p>
            <p>{t("p8-5")}</p>
            <p>{t("p8-6")}</p>
            <p>{t("p8-7")}</p>
            <p>{t("p8-8")}</p>
          </div>
          
          <div className="text-[25px] mb-2 mr-6">{t("h9")}</div>
          <div className="text-[18px] mb-7 text-justify px-6">{t("p9")}</div>
        </SimpleCard>
      </div>
    </TestLayout>
  );
};

export default PrivacyPolicy;
