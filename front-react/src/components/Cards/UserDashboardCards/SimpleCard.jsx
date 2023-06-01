import React from "react";

const SimpleCard = ({ children, className, noPadding = false }) => {
  return (
    <div
      className={`border-gray-200 ${className} rounded-[20px]  border-b-4 ${
        noPadding ? "" : "p-7"
      } m-0`}
    >
      {children}
    </div>
  );
};

export default SimpleCard;
