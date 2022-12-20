import "./formInput-style.css";

const FormInput = (props) => {
    const {label, onChange, id, ...inputProps} = props;
    return (
        <div className="input">
            <label>{label}</label>
            <input {...inputProps} onChange={onChange}/>
        </div>
    );
}

export default FormInput;
