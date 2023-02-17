import { useState, useContext } from "react";
import "./login-styles.css";
import FormInput from "./formInput";
import AuthContext from "./AuthContext";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/LandingPageNavBar/Header";
import Footer from '../components/Footer/Footer'

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
//     "id": 1,
//     "name": "غروب و دریا",
//     "creator": "بهروز فاتحی",
//     "date": "2022-12-30T00:00:00Z",
//     "last_price": 12,
// "base64_image":
// "start_date": null,
//     "end_date": null,
//     "description": "این توضیحاتی برای اثر غروب و دریا است.",
//     "external_link": "http://www.google.com",
 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://78.38.35.249:8000/api/login/", {
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
        <>
      
        <div style={{direction:'rtl'} } className='overflow-hidden'> 
<Header/>
      
        <div   className="form-input ">
            <form className="loginform" onSubmit={handleSubmit}>
                <h1>ورود به سایت</h1>
                {inputs.map((input) => (
                    <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
                ))}
                <button>ورود</button>
                <p  className="text-5xl mt-5" >حساب کاربری ندارید ؟    <Link to='/register'>ثبت نام</Link></p>

            </form>

        </div>
        <Footer/>
        </div>
        </>
    );
}

export default Login;
