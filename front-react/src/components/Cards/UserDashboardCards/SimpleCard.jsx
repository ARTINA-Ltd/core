import React from "react";

const SimpleCard = ({ children, className }) => {
  return (
    <div
      className={` ${className} rounded-[20px] border-gray-200 border-b-4 p-3 m-0`}
    >
      {children}
    </div>
  );
};

export default SimpleCard;
