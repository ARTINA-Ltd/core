import { useState, useContext } from "react";
import "./register-styles.css";
import FormInput from "./formInput";
import AuthContext from "./AuthContext";
import axios from "axios";


const Login = () => {
    const [values, setValues] = useState({
        username: "",
        password: "",
    });

    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Username",
            // errorMessage: "نام کاربری نمی‌تواند خالی باشد",
            label: "نام کاربری",
            // pattern: "^[a-zA-Z0-9_]{6,20}$",
            required: true,
        },
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "Password",
            errorMessage: "اطلاعات وارد شده صحیح نیست",
            label: "رمز عبور",
            // pattern: values.password,
            required: true,
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/login/", {
            username: values.username,
            password: values.password,
        })
            .then(res => {
                console.log(res);
            }
        )
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
                <h1>ورود به سایت</h1>
                {inputs.map((input) => (
                    <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
                ))}
                <button>ورود</button>
            </form>
        </div>
    );
}

export default Login;
