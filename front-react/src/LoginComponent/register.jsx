import {useState} from "react";
import axios from "axios";
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
            errorMessage: "نام کاربری باید منحصر به فرد بوده و بین ۶ تا ۲۰ کاراکتر باشد",
            label: "نام کاربری",
            pattern: "^[a-zA-Z0-9]{6,20}$",
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

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/account/register/", {
            username: values.username,
            email: values.email,
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
