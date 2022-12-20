import {useState} from "react";
import "./register-styles.css";
import FormInput from "./formInput";

const Register = () => {
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Username",
            label: "نام کاربری",
        },
        {
            id: 2,
            name: "email",
            type: "email",
            placeholder: "Email",
            label: "ایمیل",
        },
        {
            id: 3,
            name: "password",
            type: "password",
            placeholder: "Password",
            label: "رمز عبور",
        },
        {
            id: 4,
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm Password",
            label: "تکرار رمز عبور",
        }
    ]

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const onChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    }

    console.log(values);
    return (
        <div className="form-input">
            <form onSubmit={handleSubmit}>
                <h1>فرم ثبت نام</h1>
                {inputs.map((input) => (
                    <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
                ))}
                <button>ثبت نام</button>
            </form>
        </div>
    );
}

export default Register;
