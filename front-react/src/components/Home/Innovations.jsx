import { React } from "react";
import "./Home.css"; // Make sure to import your CSS file
import { useTranslation } from "react-i18next";

const Innovations = ({ className = "" }) => {
  const { t } = useTranslation();
  return (
    <div className={`${className} w-full flex justify-center lg:my-10`}>
      <div className="w-4/5 flex flex-col items-center text-base-content lg:w-[90%]">
        <div className="font-b9 text-[40px] mb-4 sm:text-[30px]">{t("innovations")}</div>

        <div className="flex-col">
          <div className="flex justify-around">
            <div className="flex sm:flex-col">
              <div className="mx-16 my-5 lg:mx-6 sm:mx-2">
                <div className="mt-3 font-b5 text-[20px] text-center lg:text-sm">{t("connectWithCw")}</div>
              </div>
              <div className="mx-16 my-5 lg:mx-6 sm:mx-2">
                <img src="/Metaverse-logo.jpeg" className="w-[150px] h-[150px] lg:w-[100px] lg:h-[100px] sm:w-[60px] sm:h-[60px] object-cover rounded-full m-auto" alt="" />
                <div className="mt-3 font-b5 text-[20px] text-center lg:text-sm">{t("metaverse")}</div>
              </div>
            </div>
            <div className="flex sm:flex-col">
              <div className="mx-16 my-5 lg:mx-6 sm:mx-2">
                <img src="/Blog-logo.jpeg" className="w-[150px] h-[150px] lg:w-[100px] lg:h-[100px] sm:w-[60px] sm:h-[60px] object-cover rounded-full m-auto" alt="" />
                <div className="mt-3 font-b5 text-[20px] text-center lg:text-sm">{t("NFTnews")}</div>
              </div>
              <div className="mx-16 my-5 lg:mx-6 sm:mx-2">
                <img src="/AI-logo.png" className="w-[150px] h-[150px] lg:w-[100px] lg:h-[100px] sm:w-[60px] sm:h-[60px] object-cover rounded-full m-auto" alt="" />
                <div className="mt-3 font-b5 text-[20px] text-center lg:text-sm">{t("artinaAI")}</div>
              </div>
            </div>
          </div>
          <div className="flex justify-around">
            <div className="flex sm:flex-col">
              <div className="mx-16 my-5 lg:mx-6 sm:mx-2">
                <img src="/wallet-vector-icon.jpg" className="w-[150px] h-[150px] lg:w-[100px] lg:h-[100px] sm:w-[60px] sm:h-[60px] object-cover rounded-full m-auto" alt="" />
                <div className="mt-3 font-b5 text-[20px] text-center lg:text-sm">{t("personalWalletGenerate")}</div>
              </div>
              <div className="mx-16 my-5 lg:mx-6 sm:mx-2">
                <img src="/matic-logo.png" className="w-[150px] h-[150px] lg:w-[100px] lg:h-[100px] sm:w-[60px] sm:h-[60px] object-cover rounded-full m-auto" alt="" />
                <div className="mt-3 font-b5 text-[20px] text-center lg:text-sm">{t("gasFeeCalc")}</div>
              </div>
            </div>
            <div className="flex sm:flex-col">
              <div className="mx-16 my-5 lg:mx-6 sm:mx-2">
                <img src="/matic-ic.png" className="w-[150px] h-[150px] lg:w-[100px] lg:h-[100px] sm:w-[60px] sm:h-[60px] object-cover rounded-full m-auto" alt="" />
                <div className="mt-3 font-b5 text-[20px] text-center lg:text-sm">{t("dataAnalysisDivision")}</div>
              </div>
              <div className="mx-16 my-5 lg:mx-6 sm:mx-2">
                <img src="/Blockchain-logo.png" className="w-[150px] h-[150px] lg:w-[100px] lg:h-[100px] sm:w-[60px] sm:h-[60px] object-cover rounded-full m-auto" alt="" />
                <div className="mt-3 font-b5 text-[20px] text-center lg:text-sm">{t("smartCintract")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Innovations;
