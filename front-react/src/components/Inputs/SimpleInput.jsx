import React, { useState, useEffect } from "react";
import "./style.css";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { DatePicker, TimePicker } from "zaman";
import Select from "react-select";

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
  ltr = false,
  options,
  menuPlacement
}) => {
  const [focus, setFocus] = useState(defaultValue === null ? false : true);
  const [value, setValue] = useState("");
  const [defaultVal, setDefaultVal] = useState();

  const customStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      color: state.isSelected ? "#ffffff" : "#202020",
      backgroundColor: state.isSelected ? "#4e45d0" : "#ffffff",
      padding: "8px"
    })
  };

  const handleChange = event => {
    const inputValue = event.target.value;

    if (inputValue == "") {
      setValue("");
    } else {
      if (/^[\d+.]*$/.test(inputValue)) {
        setValue(inputValue);
      } else setValue(prev => prev);
    }
  };
  useEffect(
    () => {
      setFocus(
        (defaultValue === null || defaultValue === undefined) && type != "date"
          ? false
          : true
      );
      if (type == "date" && defaultValue !== null) {
        setDefaultVal(
          new Date(
            parseInt(defaultValue.split("/")[2]),
            parseInt(defaultValue.split("/")[1]) - 1,
            parseInt(defaultValue.split("/")[0])
          )
        );
        // setDefaultVal(new Date(,parseInt(defaultValue.split('/')[1]),parseInt(defaultValue.split('/')[0])));
      }
    },
    [defaultValue]
  );

  const input = () => {
    if (type === "date" && disabled == false && defaultVal) {
      return (
        <DatePicker
          accentColor="#4e45d0"
          onChange={onChange}
          inputClass={`simple-input w-full z-50`}
          defaultValue={defaultVal}
          className={`z-[3102]`}
        />
      );
    } else if (type === "date" && disabled == false && !defaultValue) {
      return (
        <DatePicker
          accentColor="#4e45d0"
          onChange={onChange}
          inputClass={`simple-input w-full z-50`}
          className={`z-[3102]`}
        />
      );
    } else if (type === "date" && disabled == false) {
      return (
        <DatePicker
          accentColor="#4e45d0"
          onChange={onChange}
          inputClass={`simple-input w-full z-50`}
          className={`z-[3102]`}
        />
      );
    } else if (type === "date" && disabled == true) {
      return (
        <input
          disabled={disabled}
          onKeyUp={onChange}
          type="text"
          className={`simple-input w-full`}
          placeholder={!focus ? "" : placeholder}
          defaultValue={new Intl.DateTimeFormat("fa").format(defaultVal)}
          onFocus={() => setFocus(true)}
          onBlur={e =>
            e.target.value === "" ? setFocus(false) : setFocus(true)}
        />
      );
    } else if (
      type == "number" &&
      (defaultValue == null || defaultValue == undefined)
    ) {
      return (
        <input
          disabled={disabled}
          onKeyUp={onChange}
          onChange={handleChange}
          value={value}
          type="text"
          className={`simple-input w-full`}
          placeholder={!focus ? "" : placeholder}
          defaultValue={defaultValue}
          onFocus={() => setFocus(true)}
          onBlur={e =>
            e.target.value === "" ? setFocus(false) : setFocus(true)}
        />
      );
    } else if (type === "double") {
      return (
        <input
          disabled={disabled}
          onKeyUp={onChange}
          onChange={handleChange}
          value={value}
          type="text"
          className={`simple-input w-full`}
          placeholder={!focus ? "" : placeholder}
          defaultValue={defaultValue}
          onFocus={() => setFocus(true)}
          onBlur={e =>
            e.target.value === "" ? setFocus(false) : setFocus(true)}
        />
      );
    } else if (type === "password") {
      return (
        <input
          disabled={disabled}
          onKeyUp={onChange}
          type="password"
          className={`simple-input w-full`}
          placeholder={!focus ? "" : placeholder}
          defaultValue={defaultValue}
          onFocus={() => setFocus(true)}
          onBlur={e =>
            e.target.value === "" ? setFocus(false) : setFocus(true)}
        />
      );
    } else if (type === "time") {
      return <TimePicker accentColor="#4e45d0" onChange={onChange} />;
    } else if (type === "dropdown") {
      return (
        <Select
          options={options}
          onChange={onChange}
          className={"simple-input2 w-full"}
          unstyled
          styles={customStyles}
          menuPlacement={menuPlacement}
        />
      );
    } else {
      return (
        <input
          disabled={disabled}
          onKeyUp={onChange}
          type={"text"}
          className={`simple-input w-full`}
          placeholder={!focus ? "" : placeholder}
          defaultValue={defaultValue}
          onFocus={() => setFocus(true)}
          dir={ltr ? "ltr" : "rtl"}
          onBlur={e =>
            e.target.value === "" ? setFocus(false) : setFocus(true)}
        />
      );
    }
  };

  return (
    <div
      className={`w-full items-start gap-1 relative ${disabled
        ? "opacity-50"
        : ""} ${className} flex flex-col`}
    >
      {input()}
      <div
        className={`text-[14px] font-b5 pr-2 pointer-events-none absolute translate-y-1/2 right-2  transition-all ${focus
          ? "bottom-[110%] text-[14px] text-[#4e45d0]"
          : "bottom-[50%] "}`}
      >
        {title}
      </div>

      <div
        className={`absolute left-2 top-1/2 -translate-y-1/2 text-sm bg-red-50 text-red-600 px-2 rounded-full font-b2 my-auto ${isValid
          ? "opacity-[0%]"
          : "opacity-[90%]"} transition-all`}
      >
        {validationError}
      </div>
    </div>
  );
};

export default SimpleInput;
