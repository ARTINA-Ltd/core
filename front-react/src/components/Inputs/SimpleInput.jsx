import React, { useState, useEffect } from "react";
import "./style.css";
import { DatePicker, TimePicker } from "zaman";
import Select from "react-select";
import i18n from "../../i18n.js";

const SimpleInput = ({ onChange, title, placeholder, type, isValid, validationError, defaultValue = "", disabled = false, className, ltr = false, options, menuPlacement, onKeyPress, maxChars }) => {
  const [focus, setFocus] = useState(!!defaultValue);
  const [value, setValue] = useState(defaultValue);
  const [defaultVal, setDefaultVal] = useState();
  const [touched, setTouched] = useState(false);

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

  const formatCardNumber = (input) => {
    if (input) {
      input = input.replace(/\D/g, "");
      return input.match(/.{1,4}/g)?.join("-") || "";
    }
  };

  const handleChange = (event) => {
    if (event && event.target) {
      const inputValue = event.target.value;
      if (type === "card") {
        const rawValue = inputValue.replace(/\D/g, "");
        setValue(rawValue);
        onChange(rawValue);
      } else {
        setValue(inputValue);
        onChange(inputValue);
      }
    }
  };

  const handleNumberChange = (event) => {
    if (event && event.target) {
      let inputValue = event.target.value;

      // Regex to allow only digits and a single decimal point
      inputValue = inputValue.replace(/[^0-9.]/g, "");

      // Prevent more than one decimal point
      const parts = inputValue.split(".");
      if (parts.length > 2) {
        inputValue = parts[0] + "." + parts.slice(1).join("");
      }

      setValue(inputValue);
      if (onChange) {
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
            <div className={`simple-input w-full border-x-2 border-x-transparent ${ltr ? "border-l-primary" : i18n.dir() === "rtl" ? "border-r-primary" : "border-l-primary"}`} placeholder={focus ? placeholder : ""} onFocus={() => setFocus(true)} onBlur={(e) => { setFocus(e.target.value !== ""); setTouched(true); }} dir={ltr ? "ltr" : i18n.dir()}>
              {defaultVal?.getFullYear() > 1500 ? new Intl.DateTimeFormat("fa").format(defaultVal) : new Intl.DateTimeFormat("en").format(defaultVal)}
            </div>
          );
        }
        return (
          <div type="text" className={`simple-input w-full border-x-2 border-x-transparent ${ltr ? "border-l-primary" : i18n.dir() === "rtl" ? "border-r-primary" : "border-l-primary"}`} placeholder={focus ? placeholder : ""} onFocus={() => setFocus(true)} onBlur={(e) => { setFocus(e.target.value !== ""); setTouched(true); }} dir={ltr ? "ltr" : i18n.dir()}>
            <DatePicker onChange={onChange} inputClass="w-full bg-transparent" defaultValue={defaultVal} dir={ltr ? "ltr" : i18n.dir()} />
          </div>
        );
      case "time":
        return <TimePicker inputClass="bg-transparent" onChange={onChange} dir={ltr ? "ltr" : i18n.dir()} />;
      case "dropdown":
        return <Select placeholder={placeholder} options={options} onChange={onChange} className={`simple-input2 w-full border-x-2 border-x-transparent ${ltr ? "border-l-primary" : i18n.dir() === "rtl" ? "border-r-primary" : "border-l-primary"}`} styles={customStyles} menuPlacement={menuPlacement} dir={ltr ? "ltr" : i18n.dir()} />;
      case "password":
        return <input disabled={disabled} type="password" className={`simple-input w-full border-x-2 border-x-transparent ${ltr ? "border-l-primary" : i18n.dir() === "rtl" ? "border-r-primary" : "border-l-primary"}`} placeholder={focus ? placeholder : ""} defaultValue={defaultValue} onFocus={() => setFocus(true)} onBlur={(e) => { setFocus(e.target.value !== ""); setTouched(true); }} dir={i18n.dir()} onKeyUp={onChange} />;
      case "number":
        return <input disabled={disabled} type="text" className={`simple-input w-full border-x-2 border-x-transparent ${ltr ? "border-l-primary" : i18n.dir() === "rtl" ? "border-r-primary" : "border-l-primary"}`} placeholder={focus ? placeholder : ""} value={value} onFocus={() => setFocus(true)} onBlur={(e) => { setFocus(e.target.value !== ""); setTouched(true); }} dir={ltr ? "ltr" : i18n.dir()} onKeyUp={onChange} onChange={handleNumberChange} maxLength={maxChars} />;
      case "double":
        return <input disabled={disabled} type="text" className={`simple-input w-full border-x-2 border-x-transparent ${ltr ? "border-l-primary" : i18n.dir() === "rtl" ? "border-r-primary" : "border-l-primary"}`} placeholder={focus ? placeholder : ""} value={value} onFocus={() => setFocus(true)} onBlur={(e) => { setFocus(e.target.value !== ""); setTouched(true); }} dir={ltr ? "ltr" : i18n.dir()} onKeyUp={onChange} onChange={handleChange} />;
      case "card":
        return <input disabled={disabled} type="text" className={`simple-input w-full border-x-2 border-x-transparent ${ltr ? "border-l-primary" : i18n.dir() === "rtl" ? "border-r-primary" : "border-l-primary"}`} placeholder={focus ? placeholder : ""} value={formatCardNumber(value)} onFocus={() => setFocus(true)} onBlur={(e) => { setFocus(e.target.value !== ""); setTouched(true); }} dir={ltr ? "ltr" : i18n.dir()} onKeyUp={onChange} onChange={handleChange} maxLength={maxChars} />;
      default:
        return <input disabled={disabled} type="text" className={`simple-input w-full border-x-2 border-x-transparent ${ltr ? "border-l-primary" : i18n.dir() === "rtl" ? "border-r-primary" : "border-l-primary"}`} placeholder={focus ? placeholder : ""} defaultValue={defaultValue} onFocus={() => setFocus(true)} onBlur={(e) => { setFocus(e.target.value !== ""); setTouched(true); }} dir={ltr ? "ltr" : i18n.dir()} onKeyUp={onChange} />;
    }
  };

  return (
    <div dir={ltr ? "ltr" : i18n.dir()} className={`w-full items-start gap-1 relative ${className} flex flex-col`}>
      {renderInput()}
      <div dir={ltr ? "ltr" : i18n.dir()} className={`text-[14px] sm:bottom-[110%] sm:text-[14px] font-b5 px-2 pointer-events-none absolute translate-y-1/2 transition-all ${focus ? "bottom-[110%] text-[14px] text-accent" : "bottom-[50%]"}`}>
        {title}
      </div>
      {validationError && touched && !isValid && (
        <div dir={ltr ? "ltr" : i18n.dir()} className={`pointer-events-none absolute ${i18n.dir() === "rtl" ? "left-2 top-1/2 -translate-y-1/2" : "text-center right-0 translate-y-1/2"} text-sm bg-base-100 border-2 border-error text-error px-2 rounded-full font-b2 my-auto opacity-90 transition-all`}>
          {validationError}
        </div>
      )}
    </div>
  );
};

export default SimpleInput;
