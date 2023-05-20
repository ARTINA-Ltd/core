import React from "react";

const BorderButton = ({ children, onClick, className }) => {
  return (
    <div
      className={`bg-[#eeeEEE00] text-[#4e45d0] px-4 py-[4px] rounded-full hover:scale-105 transition-all duration-400 border-[#4e45d0] border-[1px] cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default BorderButton;
