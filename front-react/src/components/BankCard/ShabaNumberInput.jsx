import React, { useState, useEffect, useRef } from "react";


const ShabaNumberInput = ({ defaultValue = "", disabled = false, onChange, validationError, className, dir = "ltr" }) => {
  const [values, setValues] = useState(["", "", "", "", "", "", ""]);
  const [touched, setTouched] = useState(false); // Track whether any field has been touched
  const [isValid, setIsValid] = useState(true); // Track validity
  const [focused, setFocused] = useState(false); // Track if any field is focused

  const inputsRef = useRef([]);

  useEffect(() => {
    if (defaultValue) {
      const shabaWithoutIR = defaultValue.replace(/^IR/, "");
      const chunks = [
        shabaWithoutIR.slice(0, 2),  // First 2 digits
        shabaWithoutIR.slice(2, 6),  // Next 4 digits
        shabaWithoutIR.slice(6, 10), // Next 4 digits
        shabaWithoutIR.slice(10, 14), // Next 4 digits
        shabaWithoutIR.slice(14, 18), // Next 4 digits
        shabaWithoutIR.slice(18, 22), // Next 4 digits
        shabaWithoutIR.slice(22, 24), // Last 2 digits
      ];
      setValues(chunks);
    }
  }, [defaultValue]);

  const handleInputChange = (index, event) => {
    const newValue = event.target.value.replace(/\D/g, "");
    const maxChars = index === 0 || index === 6 ? 2 : 4;
    if (newValue.length <= maxChars) {
      const newValues = [...values];
      newValues[index] = newValue;
      setValues(newValues);

      // Move to the next input if the current one is filled
      if (newValue.length === maxChars && index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1].focus();
      }

      // Update validity based on the entire Shaba number
      const fullValue = `IR${newValues.join("")}`;
      setIsValid(fullValue.length === 26);

      // Pass the concatenated value back to the parent component
      onChange(fullValue);
    }
  };

  const handleBlur = () => {
    setTouched(true);
    setFocused(false);

    // Check if all inputs are filled out
    const fullValue = `IR${values.join("")}`;
    setIsValid(fullValue.length === 26);
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
      <div className="flex items-center gap-1" onFocus={handleFocus} onBlur={handleBlur}>
        <div className="text-white">IR</div> {/* Prefix "IR" */}
        {values.map((value, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            maxLength={index === 0 || index === 6 ? 2 : 4} // Set maxLength depending on the field (2 for first and last, 4 for middle)
            value={value}
            disabled={disabled}
            onChange={(e) => handleInputChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={`text-center text-white bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-md p-1 outline-none ${index === 0 || index === 6 ? "w-6" : "w-full"}`} // Smaller width for 2-digit fields
            style={{ direction: 'ltr', textAlign: 'center', lineHeight: '1.5rem', fontSize: '0.875 rem' }} // Adjust styling for smaller fields
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

export default ShabaNumberInput;
