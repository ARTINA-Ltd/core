import React from "react";

const SimpleCard = ({ children, className, noPadding = false }) => {
  return (
    <div
      className={`${className} rounded-[20px] ${
        noPadding ? "" : "p-6 sm:p-3"
      } m-0`}
    >
      {children}
    </div>
  );
};

export default SimpleCard;
