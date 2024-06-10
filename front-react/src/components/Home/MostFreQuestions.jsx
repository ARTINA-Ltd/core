import { React } from "react";
import "./Home.css"; // Make sure to import your CSS file
import { useTranslation } from "react-i18next";

const MostFrequentQuestions = ({ className = "" }) => {
  const { t } = useTranslation();
  return (
    <div className={`${className} flex w-[80vw] mx-auto justify-center rounded-xl bg-primary lg:my-4`}>
      <div className={`${className}  w-full flex justify-center bg-primary rounded-xl text-primary-content relative overflow-hidden`}>
        <div className="w-11/12 flex flex-col items-center text-primary-content">
          <div className="font-b9 text-[40px] mt-10 sm:text-[30px]">{t("FAQ")}</div>

          <div className="flex-col w-full ">
            <div className="flex justify-between mt-5 lg:flex-col lg:items-center lg:mt-2">
              <div className="w-6/12 mx-2 my-4 rounded-3xl px-4 lg:w-[80%] sm:w-[95%] sm:mx-2 sm:my-2">
                <div className="mt-3 font-b5 text-[20px] sm:text-[15px]">{t("FAQ1")}</div>
                <div className="my-3 font-b3 text-[15px] text-justify sm:text-[10px]">{t("FAQ1_1")}</div>
              </div>
              <div className="w-6/12 mx-2 my-4 rounded-3xl px-4 lg:w-[80%] sm:w-[95%] sm:mx-2 sm:my-2">
                <div className="mt-3 font-b5 text-[20px] sm:text-[15px]">{t("FAQ2")}</div>
                <div className="my-3 font-b3 text-[15px] text-justify sm:text-[10px]">
                  <div className="font-b5">{t("FAQ2_1.line1")}</div>
                  {t("FAQ2_1.line2")}
                  <br />
                  <div className="font-b5">{t("FAQ2_2.line1")} </div>
                  {t("FAQ2_2.line2")}
                </div>
              </div>
            </div>
            <div className="flex justify-between mb-5 lg:flex-col lg:items-center lg:mb-2">
              <div className="w-6/12 mx-2 my-5 rounded-3xl px-4 lg:w-[80%] sm:w-[95%] sm:mx-2 sm:my-2">
                <div className="mt-3 font-b5 text-[20px] sm:text-[15px]">{t("FAQ3")}</div>
                <div className="my-3 font-b3 text-[15px] text-justify sm:text-[10px]">
                  <div className="font-b5">{t("FAQ3_1.line1")}</div>
                  {t("FAQ3_1.line2")}
                  <div className="font-b5">{t("FAQ3_2.line1")}</div>
                  {t("FAQ3_2.line2")}
                </div>
              </div>
              <div className="w-6/12 mx-2 my-4 rounded-3xl px-4 lg:w-[80%] sm:w-[95%] sm:mx-2 sm:my-2">
                <div className="mt-3 font-b5 text-[20px] sm:text-[15px]">{t("FAQ4")}</div>
                <div className="my-3 font-b3 text-[15px] text-justify sm:text-[10px]">
                  <div className="font-b5"> {t("FAQ4_1.line1")}</div>
                  {t("FAQ4_1.line2")}
                  <div className="font-b5"> {t("FAQ4_2.line1")}:</div>
                  {t("FAQ4_2.line2")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MostFrequentQuestions;
