import React, { useState, useEffect } from "react";
import "./style.css";
import { DatePicker, TimePicker } from "zaman";
import Select from "react-select";
import i18n from "../../i18n.js";

const SimpleInput = ({ onChange, title, placeholder, type, isValid, validationError, defaultValue = "", disabled = false, className, ltr = false, options, menuPlacement, onKeyPress, maxChars }) => {
  const [focus, setFocus] = useState(!!defaultValue);
  const [value, setValue] = useState(defaultValue);
  const [defaultVal, setDefaultVal] = useState();

  const customStyles = {
    option: (defaultStyles, state) => ({
      color: state.isSelected ? "#ffffff" : "#202020",
      backgroundColor: state.isSelected ? "primary" : "primary12",
      padding: "8px",
      marginTop: "6px",
      marginBottom: "6px",
      borderRadius: "7px",
      border: "solid #00aa15 1px",
      cursor: "pointer",
      transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
    }),
  };

  const handleChange = (event) => {
    const inputValue = event.target.value;
    if (maxChars && inputValue.length > maxChars) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      if (/^[\d+.]*$/.test(inputValue) || inputValue === "") {
        setValue(inputValue);
        onChange(inputValue);
      }
    }
  };

  useEffect(() => {
    if (type === "date" && defaultValue) {
      const [day, month, year] = defaultValue.split("/").map(Number);
      setDefaultVal(new Date(year, month - 1, day));
    }
  }, [defaultValue, type]);

  const renderInput = () => {
    switch (type) {
      case "date":
        if (disabled) {
          return (
            <div className={`simple-input w-full border-x-2 border-x-transparent ${i18n.dir() === "rtl" ? "border-r-primary" : "border-l-primary"}`} placeholder={focus ? placeholder : ""} onFocus={() => setFocus(true)} onBlur={(e) => setFocus(e.target.value !== "")} dir={i18n.dir()}>
              {defaultVal?.getFullYear() > 1500 ? new Intl.DateTimeFormat("fa").format(defaultVal) : new Intl.DateTimeFormat("en").format(defaultVal)}
            </div>
          );
        }
        return (
          <div disabled type="text" className={`simple-input w-full border-x-2 border-x-transparent ${i18n.dir() === "rtl" ? "border-r-primary" : "border-l-primary"}`} placeholder={focus ? placeholder : ""} onFocus={() => setFocus(true)} onBlur={(e) => setFocus(e.target.value !== "")} dir={i18n.dir()}>
            <DatePicker onChange={onChange} inputClass="w-full bg-transparent" defaultValue={defaultVal} dir={i18n.dir()} />
          </div>
        );
      case "time":
        return <TimePicker inputClass="bg-transparent" onChange={onChange} dir={i18n.dir()} />;
      case "dropdown":
        return <Select placeholder={placeholder} options={options} onChange={onChange} className={`simple-input2 w-full border-x-2 border-x-transparent ${i18n.dir() === "rtl" ? "border-r-primary" : "border-l-primary"}`} styles={customStyles} menuPlacement={menuPlacement} dir={i18n.dir()} />;
      case "password":
        return <input disabled={disabled} type="password" className={`simple-input w-full border-x-2 border-x-transparent ${i18n.dir() === "rtl" ? "border-r-primary" : "border-l-primary"}`} placeholder={focus ? placeholder : ""} defaultValue={defaultValue} onFocus={() => setFocus(true)} onBlur={(e) => setFocus(e.target.value !== "")} dir={i18n.dir()} onKeyUp={onChange} />;
      case "number":
        return <input disabled={disabled} type="text" className={`simple-input w-full border-x-2 border-x-transparent ${i18n.dir() === "rtl" ? "border-r-primary" : "border-l-primary"}`} placeholder={focus ? placeholder : ""} value={value} onFocus={() => setFocus(true)} onBlur={(e) => setFocus(e.target.value !== "")} dir={i18n.dir()} onKeyUp={onChange} onChange={handleChange} />;
      case "double":
        return <input disabled={disabled} type="text" className={`simple-input w-full border-x-2 border-x-transparent ${i18n.dir() === "rtl" ? "border-r-primary" : "border-l-primary"}`} placeholder={focus ? placeholder : ""} value={value} onFocus={() => setFocus(true)} onBlur={(e) => setFocus(e.target.value !== "")} dir={i18n.dir()} onKeyUp={onChange} onChange={handleChange} />;
      default:
        return <input disabled={disabled} type="text" className={`simple-input w-full border-x-2 border-x-transparent ${i18n.dir() === "rtl" ? "border-r-primary" : "border-l-primary"}`} placeholder={focus ? placeholder : ""} defaultValue={defaultValue} onFocus={() => setFocus(true)} onBlur={(e) => setFocus(e.target.value !== "")} dir={i18n.dir()} onKeyUp={onChange} />;
    }
  };

  return (
    <div dir={i18n.dir()} className={`w-full items-start gap-1 relative  ${className} flex flex-col`}>
      {renderInput()}
      <div dir={i18n.dir()} className={`text-[14px] font-b5 px-2 pointer-events-none absolute translate-y-1/2 transition-all ${focus ? "bottom-[110%] text-[14px] text-accent" : "bottom-[50%]"}`}>
        {title}
      </div>
      {validationError && (
        <div dir={i18n.dir()} className={`absolute ${i18n.dir() === "rtl" ? "left-2 top-1/2 -translate-y-1/2" : "text-center right-0 translate-y-1/2"} text-sm bg-base-100 border-2 border-error text-error px-2 rounded-full font-b2 my-auto ${isValid ? "opacity-0" : "opacity-90"} transition-all`}>
          {validationError}
        </div>
      )}
    </div>
  );
};

export default SimpleInput;
