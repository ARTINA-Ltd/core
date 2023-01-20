import {useState, useCallback} from "react";
import axios from "axios";
import "./register-styles.css";
import FormInput from "./formInput";
import GoogleButton from 'react-google-button'
import "../assets/fonts/Vazir-Medium.ttf";
import {useNavigate} from "react-router-dom";


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
            errorMessage: "نام کاربری باید منحصر به فرد بوده و بین ۶ تا ۲۰ کاراکتر باشد",
            label: "نام کاربری",
            pattern: "^[a-zA-Z0-9_]{6,20}$",
            required: true,
        },
        {
            id: 2,
            name: "email",
            type: "email",
            placeholder: "Email",
            errorMessage: "ایمیل آدرس وارد شده معتبر نیست",
            label: "ایمیل",
            pattern: `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$`,
            required: true,
        },
        {
            id: 3,
            name: "password",
            type: "password",
            placeholder: "Password",
            errorMessage: "رمز عبور باید بین ۸ تا ۲۰ کاراکتر باشد و شامل حداقل یک حرف، یک عدد و یک کاراکتر خاص باشد",
            label: "رمز عبور",
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true,
        },
        {
            id: 4,
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm Password",
            errorMessage: "رمز عبور وارد شده با رمز عبور تایید شده یکسان نیست",
            label: "تکرار رمز عبور",
            pattern: values.password,
            required: true,
        }
    ]

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/account/register/", {
            username: values.username,
            email: values.email,
            password: values.password,
        })
            .then((response) => {
                    if (response.status === 201) {
                        alert("ثبت نام با موفقیت انجام شد");
                        navigate("/login");
                    } else {
                        alert("Something went wrong!");
                    }
                }
            )
    }

    const onChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    }

    const openGoogleLoginPage = useCallback(() => {
        const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
        const redirectUri = 'api/v1/auth/login/google/';

        const scope = [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile'
        ].join(' ');

        const params = {
            response_type: 'code',
            client_id: '512823683871-adr9e9dcfqiqii5o2480u5fhbtu4uj1g.apps.googleusercontent.com',
            redirect_uri: `http://localhost:8000/api/v1/auth/login/google/`,
            prompt: 'select_account',
            access_type: 'offline',
            scope
        };

        const urlParams = new URLSearchParams(params).toString();

        window.location = `${googleAuthUrl}?${urlParams}`;
    }, []);

    console.log(values);
    return (
        <div className="form-input">
            <form onSubmit={handleSubmit}>
                <h1>فرم ثبت نام</h1>
                {inputs.map((input) => (
                    <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
                ))}
                <button>ثبت نام</button>
                <div className="google-button-container">
                    <GoogleButton
                        className="google-button"
                        style={{
                            backgroundColor: ("rgb(100,100,255,0.95)"),
                            color: "white",
                            width: "100%",
                            fontFamily: "Vazir-Medium",
                            fontSize: "2.3em",
                            fontWeight: "bold",
                            borderRadius: "7px",
                        }}
                        label="ثبت نام با گوگل"
                        onClick={openGoogleLoginPage}
                    />
                </div>
            </form>
        </div>
    );
}

export default Register;
