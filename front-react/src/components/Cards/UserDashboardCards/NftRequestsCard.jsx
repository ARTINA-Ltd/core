import React from "react";
import SimpleCard from "./SimpleCard";
import { useTranslation } from "react-i18next";

const NftRequestsCard = ({ onClick, firstName, lastName, image, exhibition, nftCount, verified }) => {
  const { t } = useTranslation(["collections"]);

  return (
    <span onClick={onClick} className="cursor-pointer">
      <SimpleCard className={` overflow-hidden group relative transition-all duration-100 bg-[#0000aa10] hover:bg-[#0000aa15] flex items-center justify-center gap-4 px-12 sm:px-4`}>
        <img src={image} className={`h-[180px] w-[180px] object-cover rounded-full group-hover:translate-x-4 transition-all  duration-300 ease-out sm:w-[140px] sm:h-[140px]`} alt="" />

        <div className="grid gap-4">
          <div className="flex gap-1 group-hover:translate-x-4 transition-all duration-300 ease-out">
            <div>{firstName}</div>
            <div>{lastName}</div>
            {verified && <img alt="" src="/Verified_Status.png" className="w-5 h-5  transition-all duration-300 ease-out" />}
          </div>
          {exhibition ? (
            <div className="flex gap-1 group-hover:translate-x-4 transition-all duration-300 ease-out">
              {t("exhibition")}:{exhibition}
            </div>
          ) : (
            ""
          )}
          {nftCount ? (
            <div className="flex group-hover:translate-x-4 transition-all duration-300 ease-out items-center gap-1">
              <div>{t("count")}</div>
              {nftCount}
            </div>
          ) : (
            ""
          )}
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="opacity-75 absolute inset-y-0 -left-10 my-auto group-hover:translate-x-14 transition-all duration-300 ease-out" width={"1.5em"}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </SimpleCard>
    </span>
  );
};

export default NftRequestsCard;
