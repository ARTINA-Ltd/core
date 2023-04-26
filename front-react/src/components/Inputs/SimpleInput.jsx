import React from "react";
import "./style.css";

const SimpleInput = ({ onChange, title, placeholder, type, isValid, validationError,defaultValue, disabled }) => {
  return (
    <div className="w-full flex flex-col items-start gap-1">
      <div className="text-[16px] pr-2">{title}</div>
      <input
      disabled={disabled}
        onChange={onChange}
        type={type}
        className={`simple-input w-full ${
          isValid ? "focus:border-b-sky-400" : "focus:border-b-rose-400"
        }`}
        placeholder={placeholder}        
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default SimpleInput;
