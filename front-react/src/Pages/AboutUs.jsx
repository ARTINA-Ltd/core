import React from "react";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import TestLayout from "../Layouts/TestLayout";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation(["aboutUs"]);
  return (
    <TestLayout>
      <div className="w-[55%] m-auto lg:w-4/5 md:w-11/12">
        <SimpleCard className={"bg-base-100 leading-[40px]"}>
          <div className="text-[32px] mb-5">{t("aboutUs")}</div>
          <div className="text-[18px] mb-7 text-center sm:px-3 sm:text-[14px]">{t("fistParagraph")}</div>
          <div className="text-[25px] mb-2 mr-5">{t("productOfArtina")}</div>
          <div className="text-[18px] mb-7 text-justify px-6 sm:px-3 sm:text-[14px]">{t("secondParagraph")}</div>
          <div className="text-[25px] mb-2 mr-5">{t("goal")}</div>
          <div className="text-[18px] mb-7 text-justify px-6 sm:px-3 sm:text-[14px]">{t("thirdParagraph")}</div>
          <div className="text-[25px] mb-2 mr-5">{t("foundation")}</div>
          <div className="text-[18px] text-justify px-6 sm:px-3 sm:text-[14px]">{t("fourthParagraph")}</div>
        </SimpleCard>
      </div>
    </TestLayout>
  );
};

export default Contact;
