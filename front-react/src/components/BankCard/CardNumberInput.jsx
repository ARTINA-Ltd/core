import React, { useState, useEffect, useRef } from "react";


const CardNumberInput = ({ defaultValue = "", disabled = false, onChange, validationError, className, maxChars = 4, dir = "ltr" }) => {
  const [values, setValues] = useState(["", "", "", ""]);
  const [touched, setTouched] = useState(false); // Track whether any field has been touched
  const [isValid, setIsValid] = useState(true); // Track validity
  const [focused, setFocused] = useState(false); // Track if any field is focused

  const inputsRef = useRef([]);

  useEffect(() => {
    if (defaultValue) {
      const chunks = defaultValue.match(/.{1,4}/g) || [];
      const newValues = chunks.concat(Array(4 - chunks.length).fill("")); // Ensure there are always 4 fields
      setValues(newValues);
    }
  }, [defaultValue]);

  const handleInputChange = (index, event) => {
    const newValue = event.target.value.replace(/\D/g, "");
    if (newValue.length <= maxChars) {
      const newValues = [...values];
      newValues[index] = newValue;
      setValues(newValues);

      // Move to the next input if the current one is filled
      if (newValue.length === maxChars && index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1].focus();
      }

      // Update validity based on the entire card number
      const fullValue = newValues.join("");
      setIsValid(fullValue.length === 16);

      // Pass the concatenated value back to the parent component
      onChange(fullValue);
    }
  };

  const handleBlur = () => {
    setTouched(true);
    setFocused(false);

    // Check if all inputs are filled out
    const fullValue = values.join("");
    setIsValid(fullValue.length === 16);
  };

  const handleFocus = () => {
    setFocused(true); // Set focus to true when any input is focused
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !values[index] && index > 0) {
      // Move to the previous input on backspace if the current input is empty
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <div className={`${className}`} dir={dir}>
      <div className="flex gap-2" onFocus={handleFocus} onBlur={handleBlur}>
        {values.map((value, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            maxLength={maxChars}
            value={value}
            disabled={disabled}
            onChange={(e) => handleInputChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-full text-center text-white bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-md p-2 outline-none"
            style={{ direction: 'ltr', textAlign: 'center', lineHeight: '1.5rem' }} // Center the text
          />
        ))}
      </div>
      {validationError && touched && !focused && !isValid && (
        <div className="text-error text-sm mt-2 text-center">
          {validationError}
        </div>
      )}
    </div>
  );
};

export default CardNumberInput;
