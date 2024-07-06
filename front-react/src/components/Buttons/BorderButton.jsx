import React from "react";

const BorderButton = ({ children, onClick, className, size = "sm", disabled }) => {
  return (
    <button className={`btn btn-primary min-w-[5rem] ${disabled && "opacity-50"} ${className}`} onClick={disabled ? "" : onClick}>
      {children}
    </button>
  );
};

export default BorderButton;
