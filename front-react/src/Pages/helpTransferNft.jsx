import React, { useState } from "react";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import TestLayout from "../Layouts/TestLayout";
import { useTranslation } from "react-i18next";
import { Notify } from "notiflix"; // Optional for notifications
import helpTransferNFT from "../assets/images/help-transfer-nft/help-transfer-nft.png";

const HelpTransferNft = () => {
  const { t } = useTranslation("helpTransferNft");
  const [copied, setCopied] = useState(false); // To track if the address is copied
  const contractAddress = "0xb0df35d093752d7faf6bc3d4304cefccabe7a86a"; // Replace with your contract address

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress).then(() => {
      setCopied(true);
      Notify.success(t("addressCopied")); // Optional notification
    });
  };

  return (
    <TestLayout>
      <div className="w-[55%] m-auto lg:w-4/5 md:w-11/12">
        <SimpleCard className={"text-center bg-base-100 leading-[40px]"}>
          <div className="text-[32px] mb-5 sm:text-[25px]">{t("header")}</div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">{t("step1")}</div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">{t("step2")}</div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">{t("step3")}</div>

          {/* Contract Address which can be copied to clipboard */}
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">
            {t("contractAddress")}:
            <div className="flex gap-2 items-center mt-2 justify-center">
              <span className="text-[18px] mr-2 bg-gray-100 px-4 py-2 rounded-lg text-gray-700">{contractAddress}</span>
              <button
                onClick={copyToClipboard}
                className="text-[18px] bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
              >
                {copied ? t("copied") : t("copy")}
              </button>
            </div>
          </div>

          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">{t("step4")}</div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">
            <img src={helpTransferNFT} className=" object-cover m-auto max-w-xs" alt="" />
          </div>
          <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">{t("step5")}</div>
        </SimpleCard>
      </div>
    </TestLayout>
  );
};

export default HelpTransferNft;
