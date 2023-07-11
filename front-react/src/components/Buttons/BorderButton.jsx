import React from "react";

const BorderButton = ({ children, onClick, className,size="sm" }) => {
  return (
    // <div
    //   className={`bg-[#eeeEEE00] text-[#4e45d0] px-4 py-[4px] rounded-full hover:scale-105 transition-all duration-400 border-[#4e45d0] border-[1px] cursor-pointer ${className}`}
    //   onClick={onClick}
    // >
    //   {children}
    // </div>
    <div
      className={`text-[14px] bg-[#0000aa08] border-[1px] border-[#4e45d0] py-2 pl-10 pr-6 rounded-lg cursor-pointer transition-all hover:pr-8 hover:pl-8 hover:bg-[#0000aa11] relative group overflow-hidden ${className} duration-75`}
      onClick={onClick}
    >
      <img
              src="/13.png"
              className={`absolute top-[19px] bottom-0 left-0 ${size == "sm" ? '-translate-x-14 group-hover:-translate-x-16' : '-translate-x-[74px] group-hover:-translate-x-[82px]'}  -translate-y-1/2 pointer-events-none duration-75 transition-all`}
            />
      {children}
    </div>
  );
};

export default BorderButton;
