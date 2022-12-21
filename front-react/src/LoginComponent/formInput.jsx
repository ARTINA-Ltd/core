import {useState} from "react";
import "./formInput-style.css";
import "../assets/fonts/Vazir-Bold.ttf";

const FormInput = (props) => {
    const [focused, setFocused] = useState(false);
    const {label, errorMessage, onChange, id, ...inputProps} = props;

    const handleFocus = (e) => {
        setFocused(true);
    }

    return (
        <div className="input">
            <label>{label}</label>
            <input
                {...inputProps}
                onChange={onChange}
                onBlur={handleFocus}
                onFocus={() => inputProps.name === "confirmPassword" && setFocused(true)}
                focused={focused.toString()}/>
            <span className="span-error">{errorMessage}</span>
        </div>
    );
}

export default FormInput;
