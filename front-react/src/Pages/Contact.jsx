import React from "react";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import TestLayout from "../Layouts/TestLayout";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation(["contactus"]);
  return (
    <TestLayout>
      <div className="w-[55%] m-auto lg:w-4/5 md:w-11/12">
        <SimpleCard className={"text-center bg-base-100 leading-[40px]"}>
          <div className="text-[32px] mb-5">{t("contactus")}</div>
          <div className="mt-6 text-[18px] text-justify px-6 mb-6 sm:px-3 sm:text-[14px]">{t("firstParagraph")}</div>
          <div className="text-[18px] sm:text-[14px]">{t("email")} </div>
          <div className="text-[18px] sm:text-[14px]">{t("cellphone")}</div>
          <div className="text-[18px] sm:text-[14px]">{t("phone")} </div>
          <div className="text-[18px] sm:text-[14px]">{t("address")} </div>
        </SimpleCard>
      </div>
    </TestLayout>
  );
};

export default Contact;
