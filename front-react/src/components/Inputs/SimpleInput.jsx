import React, { useState, useEffect } from "react";
import "./style.css";
import { DatePicker, TimePicker } from "zaman";
import Select from "react-select";
import i18n from "../../i18n.js";

const SimpleInput = ({ onChange, title, placeholder, type, isValid, validationError, defaultValue = "", disabled = false, className, ltr = false, options, menuPlacement, onKeyPress, maxChars }) => {
  const [focus, setFocus] = useState(defaultValue === null ? false : true);
  const [value, setValue] = useState("");
  const [defaultVal, setDefaultVal] = useState();

  const customStyles = {
    option: (defaultStyles, state) => ({
      color: state.isSelected ? "#ffffff" : "#202020",
      backgroundColor: state.isSelected ? "#4e45d0" : "#4e45d012",
      padding: "8px",
      marginTop: "6px",
      marginButtom: "6px",
      borderRadius: "7px",
      border: "solid #00aa15 1px",
      cursor: "pointer",
      transitionProperty: "all",
      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      transitionDuration: "150ms",
    }),
  };

  const handleChange = (event) => {
    const inputValue = event.target.value;
    if (maxChars && inputValue.length > maxChars) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      if (inputValue == "") {
        setValue("");
      } else {
        if (/^[\d+.]*$/.test(inputValue)) {
          setValue(inputValue);
        } else setValue((prev) => prev);
      }
    }
  };
  useEffect(() => {
    setFocus((defaultValue === null || defaultValue === undefined) && type != "date" ? false : true);
    if (type == "date" && defaultValue !== null) {
      setDefaultVal(new Date(parseInt(defaultValue.split("/")[2]), parseInt(defaultValue.split("/")[1]) - 1, parseInt(defaultValue.split("/")[0])));
      // setDefaultVal(new Date(,parseInt(defaultValue.split('/')[1]),parseInt(defaultValue.split('/')[0])));
    }
  }, [defaultValue]);

  const input = () => {
    if (type === "date" && disabled == false && defaultVal) {
      return <DatePicker accentColor="#4e45d0" onChange={onChange} inputClass={`simple-input  w-full`} defaultValue={defaultVal} className={`z-[3102] border-x-2 w-full border-x-transparent ${i18n.dir() === "rtl" ? "border-r-[#4e45d0]" : "border-l-[#4e45d0]"}`} dir={i18n.dir()} />;
    } else if (type === "date" && disabled == false && !defaultValue) {
      return <DatePicker accentColor="#4e45d0" position="center" round="x4" onChange={onChange} inputClass={`simple-input w-full`} className={`relative border-x-2 w-full border-x-transparent ${i18n.dir() === "rtl" ? "border-r-[#4e45d0]" : "border-l-[#4e45d0]"}`} dir={i18n.dir()} />;
    } else if (type === "date" && disabled == false) {
      return <DatePicker accentColor="#4e45d0" onChange={onChange} inputClass={`simple-input w-full`} className={`z-[3102] w-full border-x-2 border-x-transparent ${i18n.dir() === "rtl" ? "border-r-[#4e45d0]" : "border-l-[#4e45d0]"}`} dir={i18n.dir()} />;
    } else if (type === "date" && disabled == true) {
      return <input disabled={disabled} onKeyUp={onChange} type="text" className={`simple-input w-full border-x-2 border-x-transparent ${i18n.dir() === "rtl" ? "border-r-[#4e45d0]" : "border-l-[#4e45d0]"}`} placeholder={!focus ? "" : placeholder} defaultValue={new Intl.DateTimeFormat("fa").format(defaultVal)} onFocus={() => setFocus(true)} onBlur={(e) => (e.target.value === "" ? setFocus(false) : setFocus(true))} dir={i18n.dir()} />;
    } else if (type == "number" && (defaultValue == null || defaultValue == undefined)) {
      return (
        <input
          disabled={disabled}
          onKeyUp={onChange}
          // onKeyDown={}
          onChange={handleChange}
          value={value}
          type="text"
          className={`simple-input w-full translate-x-0 border-x-2 border-x-transparent ${i18n.dir() === "rtl" ? "border-r-[#4e45d0]" : "border-l-[#4e45d0]"}`}
          placeholder={!focus ? "" : placeholder}
          defaultValue={defaultValue}
          onFocus={() => setFocus(true)}
          onBlur={(e) => (e.target.value === "" ? setFocus(false) : setFocus(true))}
          dir={i18n.dir()}
        />
      );
    } else if (type === "double") {
      return <input disabled={disabled} onKeyUp={onChange} onChange={handleChange} value={value} type="text" className={`simple-input w-full border-x-2 border-x-transparent ${i18n.dir() === "rtl" ? "border-r-[#4e45d0]" : "border-l-[#4e45d0]"}`} placeholder={!focus ? "" : placeholder} defaultValue={defaultValue} onFocus={() => setFocus(true)} onBlur={(e) => (e.target.value === "" ? setFocus(false) : setFocus(true))} dir={i18n.dir()} />;
    } else if (type === "password") {
      return <input disabled={disabled} onKeyUp={onChange} type="password" className={`simple-input w-full border-x-2 border-x-transparent ${i18n.dir() === "rtl" ? "border-r-[#4e45d0]" : "border-l-[#4e45d0]"}`} placeholder={!focus ? "" : placeholder} defaultValue={defaultValue} onFocus={() => setFocus(true)} onBlur={(e) => (e.target.value === "" ? setFocus(false) : setFocus(true))} dir={i18n.dir()} />;
    } else if (type === "time") {
      return <TimePicker accentColor="#4e45d0" onChange={onChange} dir={i18n.dir()} />;
    } else if (type === "dropdown") {
      return <Select placeholder={placeholder} options={options} onChange={onChange} className={`simple-input2 w-full border-x-2 border-x-transparent ${i18n.dir() === "rtl" ? "border-r-[#4e45d0]" : "border-l-[#4e45d0]"}`} styles={customStyles} unstyled menuPlacement={menuPlacement} dir={i18n.dir()} />;
    } else {
      return <input disabled={disabled} onKeyUp={onChange} type={"text"} className={`simple-input w-full border-x-2 border-x-transparent ${i18n.dir() === "rtl" ? "border-r-[#4e45d0]" : "border-l-[#4e45d0]"}`} placeholder={!focus ? "" : placeholder} defaultValue={defaultValue} onFocus={() => setFocus(true)} dir={i18n.dir()} onBlur={(e) => (e.target.value === "" ? setFocus(false) : setFocus(true))} />;
    }
  };

  return (
    <div dir={i18n.dir()} className={`w-full items-start gap-1 relative $ bg-re{disabled ? "opacity-50" : ""} ${className} flex flex-col`}>
      {input()}
      <div dir={i18n.dir()} className={`text-[14px] font-b5 px-2 pointer-events-none absolute translate-y-1/2  transition-all ${focus ? "bottom-[110%] text-[14px] text-[#4e45d0]" : "bottom-[50%] "}`}>
        {title}
      </div>

      <div
        dir={i18n.dir()}
        className={`absolute 
      ${i18n.dir() === "rtl" ? "" : "left-full text-center -translate-x-full"} left-2 top-1/2 -translate-y-1/2 text-sm bg-red-50 text-red-600 px-2 rounded-full font-b2 my-auto ${isValid ? "opacity-[0%]" : "opacity-[90%]"} transition-all`}
      >
        {validationError}
      </div>
    </div>
  );
};

export default SimpleInput;
