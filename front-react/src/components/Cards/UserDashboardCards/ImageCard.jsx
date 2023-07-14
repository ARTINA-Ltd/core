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
  visible = false,
  onClickShow,
  onClickHide,
}) => {
  const [isHovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
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

  const handleClickShow = e => {
    onClickShow(e, setIsVisible);
  };

   const handleClickHide = e => {
    onClickHide(e, setIsVisible);
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
          />

          <img src={src} className="w-full h-[300px] rounded-lg object-cover" />
        </div>
        <div className="text-[18px] my-4 cursor-pointer" onClick={onClick}>
          {children}
        </div>
        <div className="flex justify-between items-center">
          <div className="text-[19px] flex items-center">
            <div className="pt-1">{price}</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Ethereum"
              role="img"
              viewBox="0 0 512 512"
              width={"2em"}
            >
              <rect width="512" height="512" rx="15%" fill="#ffffff" />
              <path fill="#3C3C3B" d="m256 362v107l131-185z" />
              <path fill="#343434" d="m256 41l131 218-131 78-132-78" />
              <path fill="#8C8C8C" d="m256 41v158l-132 60m0 25l132 78v107" />
              <path fill="#141414" d="m256 199v138l131-78" />
              <path fill="#393939" d="m124 259l132-60v138" />
            </svg>
          </div>
          {showSell ? (
            <>
              <div className="flex items-center gap-2">
                <div
                  className={`transition-all py-2 rounded-lg px-2 hover:bg-slate-100 cursor-pointer duration-75`}
                  onClick={isVisible ? handleClickHide : handleClickShow}
                >
                  {isVisible ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.1"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.1"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  )}
                </div>
                <CollectionDialog tokenId={tokenId} />
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </SimpleCard>
    </div>
  );
};

export default ImageCard;
