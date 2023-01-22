import { useState, useContext } from "react";
import "./register-styles.css";
import FormInput from "./formInput";
import AuthContext from "./AuthContext";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";


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

    // const loginUser = useContext(AuthContext);
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const username = e.target.username.value;
    //     const password = e.target.password.value;
    //     console.log(username, password)
    //     username.length > 0 && loginUser(username, password);
    // }

    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );
    const [user, setUser] = useState(() =>
        localStorage.getItem("authTokens")
            ? jwt_decode(localStorage.getItem("authTokens"))
            : null
    );

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8000/api/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: values.username,
                password: values.password,
            })
        });
        const data = await response.json();

        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem("authTokens", JSON.stringify(data));
            alert("با موفقیت وارد شدید");
            navigate("/upload-page");
        } else {
            alert("Something went wrong!");
        }
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
