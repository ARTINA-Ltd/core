import React from "react";

const SimpleCard = ({ children, className }) => {
  return (
    <div
      className={`border-gray-200 ${className} rounded-[20px]  border-b-4 p-3 m-0`}
    >
      {children}
    </div>
  );
};

export default SimpleCard;
