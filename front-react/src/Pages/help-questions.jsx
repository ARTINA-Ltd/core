import React from "react";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import TestLayout from "../Layouts/TestLayout";
import { useTranslation } from "react-i18next";

const HelpQuestions = () => {
  const { t } = useTranslation(["FAQ"]);
  return (
    <TestLayout>
      <div className="w-[55%] m-auto lg:w-4/5 md:w-11/12">
        <SimpleCard className={"text-center bg-white leading-[40px]"}>
          <div className="text-[32px] mb-5 sm:text-[25px]">{t("FAQ")}</div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">
            {t("whatsArtina")} <br />
            {t("firstParagraph")}
          </div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">
            {t("authRequirement")} <br />
            {t("secondParagraph.beforeLink")}
            <a className="text-[18px] mb-4 text-justify text-purple-700" href="https://artina.org/help-mint">
              {" "}
              {t("secondParagraph.link")}{" "}
            </a>
            {t("secondParagraph.afterLink")}
          </div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">
            {t("requiredData")}
            <br />
            {t("thirdParagraph")}
          </div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">
            {t("howToBuy")} <br />
            {t("fourthParagraph")}
          </div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">
            {t("howToSell")} <br />
            {t("fifthParagraph")}
          </div>

          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">
            {t("network&currency")} <br />
            {t("sixthParagraph")}
          </div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">
            {t("walletRequirement")} <br />
            {t("seventhParagraph")}
          </div>
        </SimpleCard>
      </div>
    </TestLayout>
  );
};

export default HelpQuestions;
