import React, { useEffect } from "react";
import TradeRate from "./CommissionComponents/TradeRate";
import Commissionmax from "./CommissionComponents/Commissionmax";
import WidthdrawRate from "./CommissionComponents/WidthdrawRate";
import TestLayout from "../../Layouts/TestLayout";
import SimpleCard from "../../components/Cards/UserDashboardCards/SimpleCard";
import { useTranslation } from "react-i18next";

export default function Commission() {
  const { t } = useTranslation(["wage"]);
  useEffect(() => {}, []);

  return (
    <>
      <TestLayout>
        <div className="w-[55%] m-auto lg:w-4/5 md:w-11/12">
          <SimpleCard className={"text-center bg-white leading-[40px]"}>
            <div className=" mt-4">
              <p className="text-[32px] mb-5 sm:text-[25px]">{t("header")}</p>
              <p className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">{t("firstParagraph")}</p>
              <p className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">{t("secoundHeader")}</p>
              <p className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">{t("secondParagraph")}</p>
              <p className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">{t("thirdParagraph")}</p>
            </div>
          </SimpleCard>
          <SimpleCard className={"bg-white mt-7"}>
            <TradeRate />
          </SimpleCard>

          <SimpleCard className={"bg-white mt-7"}>
            <Commissionmax />
          </SimpleCard>
          <SimpleCard className={"bg-white mt-7"}>
            <div>
              <p className="text-[32px] mb-5 text-center">{t("thirdHeader")}</p>
              <p className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">{t("fourthparaGraph")}</p>
              <p className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">{t("fifthParagraph")}</p>
              <p className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">{t("sixthParagraph")}</p>
              <p className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">{t("seventhParagraph")}</p>
            </div>
          </SimpleCard>
          <SimpleCard className={"bg-white mt-7"}>
            <WidthdrawRate />
          </SimpleCard>
        </div>
      </TestLayout>
    </>
  );
}
