import React from "react";

const SimpleCard = ({ children, className }) => {
  return (
    <div
      className={` ${className} rounded-xl border-gray-200 border-b-4 px-5 py-5`}
    >
      {children}
    </div>
  );
};

export default SimpleCard;
