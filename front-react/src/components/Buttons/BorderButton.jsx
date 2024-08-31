import React from "react";

const BorderButton = ({ children, onClick, className = "", size = "sm", disabled = false }) => {
  return (
    <button className={`btn btn-primary min-w-[5rem] ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`} onClick={!disabled ? onClick : undefined} disabled={disabled}>
      {children}
    </button>
  );
};

export default BorderButton;
