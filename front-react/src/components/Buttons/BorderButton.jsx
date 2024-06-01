import React from "react";

const BorderButton = ({ children, onClick, className, size = "sm", disabled }) => {
  return (
    <div className={`text-[14px] bg-[#0000aa08] border-[1px] border-[#4e45d0] ${disabled ? "opacity-40 cursor-default" : "cursor-pointer"} py-2 pl-10 pr-6 rounded-lg transition-all hover:pr-8 hover:pl-8 hover:bg-[#0000aa11] relative group overflow-hidden ${className} duration-75`} onClick={disabled ? "" : onClick}>
      <img alt="" src="/13.png" className={`absolute top-[19px] bottom-0 left-0 ${size === "sm" ? "-translate-x-14 group-hover:-translate-x-16" : "-translate-x-[74px] group-hover:-translate-x-[82px]"}  -translate-y-1/2 pointer-events-none duration-75 transition-all`} />
      {children}
    </div>
  );
};

export default BorderButton;
