import { useState, useCallback } from "react";
import axios from "axios";
import "./register-styles.css";
import FormInput from "./formInput";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/LandingPageNavBar/Header";
import Footer from "../components/Footer/Footer";
import TestLayout from "../Layouts/TestLayout";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import BorderButton from "../components/Buttons/BorderButton";
import SimpleInput from "../components/Inputs/SimpleInput";
import Notiflix from "notiflix";

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://api.artina.org/api/account/register/", {
        username: values.username,
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        Notiflix.Notify.success("ثبت نام با موفقیت انجام شد");
        navigate("/login");
      })
      .catch((response) => {
        if (response.response.data.error == "This username is already taken.") {
          Notiflix.Notify.failure("نام کاربری تکراری میباشد.");
        }
        if (response.response.data.error == "This email is already registered.") {
          Notiflix.Notify.failure("ایمیل وارد شده تکراری میباشد.");
        }

      });
  };

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const openGoogleLoginPage = useCallback(() => {
    const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const redirectUri = "api/v1/auth/login/google/";

    const scope = [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" ");

    const params = {
      response_type: "code",
      client_id:
        "512823683871-adr9e9dcfqiqii5o2480u5fhbtu4uj1g.apps.googleusercontent.com",
      redirect_uri: `http://localhost:8000/api/v1/auth/login/google/`,
      prompt: "select_account",
      access_type: "offline",
      scope,
    };

    const urlParams = new URLSearchParams(params).toString();

    window.location = `${googleAuthUrl}?${urlParams}`;
  }, []);

  return (
    <TestLayout className="flex items-center justify-center form-input w-full">
      <SimpleCard className={"bg-[#ffffff] w-[450px] sm:m-4"}>
        <div className="text-[24px] text-center">فرم ثبت نام</div>

        <SimpleInput
          className={"mt-6"}
          type="text"
          title="نام کاربری"
          placeholder="مثلا: alireza"
          isValid={values.username != ""}
          validationError="نمیتواند خالی باشد"
          onChange={(e) =>
            setValues((prev) => ({
              ...prev,
              username: e.target.value,
            }))
          }
          defaultValue={""}
        />
        <SimpleInput
          className={"mt-6"}
          type="text"
          title="ایمیل"
          placeholder="مثلا: example@gmail.com"
          isValid={values.email != ""}
          validationError="نمیتواند خالی باشد"
          onChange={(e) =>
            setValues((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
          defaultValue={""}
        />
        <SimpleInput
          className={"mt-6"}
          type="password"
          title="رمز عبور"
          placeholder=""
          isValid={values.password != ""}
          validationError="نمیتواند خالی باشد"
          onChange={(e) =>
            setValues((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
          defaultValue={""}
        />
        <SimpleInput
          className={"mt-6"}
          type="password"
          title="تکرار رمز عبور"
          placeholder=""
          isValid={values.confirmPassword != ""}
          validationError="نمیتواند خالی باشد"
          onChange={(e) =>
            setValues((prev) => ({
              ...prev,
              confirmPassword: e.target.value,
            }))
          }
          defaultValue={""}
        />
        <div className="mt-5 flex justify-center">
          <BorderButton onClick={handleSubmit}>ثبت نام</BorderButton>
        </div>

        <div className="bg-[#0000aa10] px-5 py-3 rounded-2xl mt-5 text-center">
          <Link to="/Login" className="text-indigo-900">
            از قبل حساب کاربری دارید ؟ وارد شوید.
          </Link>
        </div>
      </SimpleCard>
    </TestLayout>
  );
};

export default Register;
