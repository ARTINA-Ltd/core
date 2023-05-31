import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import SimpleCard from "./SimpleCard";

const NftRequestsCard = ({ onClick, firstName, lastName, image }) => {
  const [data, setData] = useState();

  
  return <span onClick={onClick} className="cursor-pointer">
      <SimpleCard className={` overflow-hidden group relative transition-all duration-100 bg-[#0000aa04] hover:bg-[#0000aa10] flex items-center justify-center gap-4 px-12`}>
        <img src={image} className={`h-[200px] w-[200px] object-cover rounded-full group-hover:translate-x-4 transition-all duration-300 ease-out`} alt="" />

        <div className="flex gap-1 group-hover:translate-x-4 transition-all duration-300 ease-out">
          <div>
            {firstName}
          </div>
          <div>
            {lastName}
          </div>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="opacity-75 absolute inset-y-0 -left-10 my-auto group-hover:translate-x-14 transition-all duration-300 ease-out" width={"1.5em"}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </SimpleCard>
    </span>;
};

export default NftRequestsCard;
