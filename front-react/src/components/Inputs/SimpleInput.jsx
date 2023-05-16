import React, { useState, useEffect } from "react";
import "./style.css";
import { faL } from "@fortawesome/free-solid-svg-icons";

const SimpleInput = ({
  onChange,
  title,
  placeholder,
  type,
  isValid,
  validationError,
  defaultValue = "",
  disabled = false,
  className
}) => {
  const [focus, setFocus] = useState(defaultValue === null ? false : true);
  const [value, setValue] = useState();

  useEffect(
    () => {
      setFocus(defaultValue === null ? false : true);
    },
    [defaultValue]
  );

  return <div className={`w-full items-start gap-1 relative ${disabled ? "opacity-70" : ""} ${className} flex flex-col`}>
      {type === "number" ? <input value={value} disabled={disabled} onKeyDown={e => setValue(
                {
                  [e.target.id]: console.log(e.target.value)
                    ? parseInt(e.target.value)
                    : ""
                }
              )} onKeyUp={onChange} type={type} className={`simple-input w-full ${isValid ? "focus:border-b-sky-400" : "focus:border-b-rose-400"}`} placeholder={!focus ? "" : placeholder} defaultValue={defaultValue} onFocus={() => setFocus(true)} onBlur={e => (e.target.value === "" ? setFocus(false) : setFocus(true))} /> : <input disabled={disabled} onKeyUp={onChange} type={type} className={`simple-input w-full ${isValid ? "focus:border-b-sky-400" : "focus:border-b-rose-400"}`} placeholder={!focus ? "" : placeholder} defaultValue={defaultValue} onFocus={() => setFocus(true)} onBlur={e => (e.target.value === "" ? setFocus(false) : setFocus(true))} />}

      <div className={`text-[14px] pr-2 pointer-events-none absolute bottom-[50%] translate-y-1/2 right-4 transition-all ${focus ? "bottom-[73%] text-[14px] opacity-60" : ""}`}>
        {title}
      </div>
    </div>;
};

export default SimpleInput;
