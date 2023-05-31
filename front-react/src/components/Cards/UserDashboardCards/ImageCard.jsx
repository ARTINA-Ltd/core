import React from "react";
import { useState } from "react";
import CollectionDialog from "../../Dialog/CollectionDialog/CollectionDialog";
import SimpleCard from "./SimpleCard";

const ImageCard = ({
  className = "",
  children,
  src,
  price,
  onClick,
  tokenId,
  showSell = false,
}) => {
  const [isHovered, setHovered] = useState(false);
  const icons = {
    whiteStar: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-[2.5rem] h-10 text-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
    ),

    yellowStar: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-[2.5rem] h-10 text-yellow-300"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
    ),
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <SimpleCard className={className}>
        <div
          className="relative transition-all cursor-pointer"
          onClick={onClick}
        >
          <div
            className={` pt-3   absolute w-full h-[300px] rounded-lg bg-gradient-to-b from-[#00000060] transition-all ${
              isHovered ? "flex justify-center" : "hidden"
            }`}
          >
            {/* {icons.whiteStar}
            {icons.yellowStar}
            {icons.yellowStar}
            {icons.yellowStar}
            {icons.yellowStar} */}
          </div>

          <img src={src} className="w-full h-[300px] rounded-lg object-cover" />
        </div>
        <div className="text-[18px] my-4 cursor-pointer" onClick={onClick}>
          {children}
        </div>
        <div className="flex justify-between items-center">
          <div className="text-[19px] flex items-center">
            <div className="pt-1">

            {price}

            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Ethereum"
              role="img"
              viewBox="0 0 512 512"
              width={'2em'}
            >
              <rect width="512" height="512" rx="15%" fill="#ffffff" />
              <path fill="#3C3C3B" d="m256 362v107l131-185z" />
              <path fill="#343434" d="m256 41l131 218-131 78-132-78" />
              <path fill="#8C8C8C" d="m256 41v158l-132 60m0 25l132 78v107" />
              <path fill="#141414" d="m256 199v138l131-78" />
              <path fill="#393939" d="m124 259l132-60v138" />
            </svg>
          </div>
          {showSell ? <CollectionDialog tokenId={tokenId} /> : ""}
        </div>
      </SimpleCard>
    </div>
  );
};

export default ImageCard;
