import React, { useState, useEffect } from "react";
import "./style.css";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { DatePicker } from "zaman";

const SimpleInput = ({
  onChange,
  title,
  placeholder,
  type,
  isValid,
  validationError,
  defaultValue = "",
  disabled = false,
  className,
}) => {
  const [focus, setFocus] = useState(defaultValue === null ? false : true);
  const [value, setValue] = useState();

  useEffect(() => {
    setFocus(defaultValue === null && type != "date" ? false : true);
  }, [defaultValue]);

  return (
    <div
      className={`w-full items-start gap-1 relative ${
        disabled ? "opacity-50" : ""
      } ${className} flex flex-col`}
    >
      {type === "date" ? (
        
        <DatePicker
          accentColor="#4e45d0"
          onChange={onChange}
          inputClass={`simple-input w-full ${
            isValid ? "focus:border-b-sky-400" : "focus:border-b-rose-400"
          }`}
          // defaultValue={defaultValue}
          
        />
      ) : (
        <input
        
          disabled={disabled}
          onKeyUp={onChange}
          type={type}
          className={`simple-input w-full ${
            isValid ? "focus:border-b-sky-400" : "focus:border-b-rose-400"
          }`}
          placeholder={!focus ? "" : placeholder}
          defaultValue={defaultValue}
          onFocus={() => setFocus(true)}
          onBlur={(e) =>
            e.target.value === "" ? setFocus(false) : setFocus(true)
          }
        />
      )}

      <div
        className={`text-[14px] font-b5 pr-2 pointer-events-none absolute bottom-[50%] translate-y-1/2 right-2 transition-all ${
          focus ? "bottom-[110%] text-[14px] text-[#4e45d0]" : ""
        }`}
      >
        {title}
      </div>
    </div>
  );
};

export default SimpleInput;
