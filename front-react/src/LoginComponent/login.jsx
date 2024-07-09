import { useState, useContext, useRef } from "react";
import "./login-styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { UserChangeContext } from "../App";
import SimpleInput from "../components/Inputs/SimpleInput";
import TestLayout from "../Layouts/TestLayout";
import SimpleCard from "./../components/Cards/UserDashboardCards/SimpleCard";
import BorderButton from "../components/Buttons/BorderButton";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";
const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const userChange = useContext(UserChangeContext);
  const captchaRef = useRef(null);
  const [captchaRes, setCaptchaRes] = useState(false);
  const { t } = useTranslation(["login"]);
  const handleCaptchaChange = (e) => {
    if (e.length != 0) {
      setCaptchaRes(true);
    } else {
      setCaptchaRes(false);
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "https://api.artina.org/api/account/login/",
        {
          username: values.username,
          password: values.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("authTokens", res.data.access);
          userChange(res);
          Notify.success(t("success"));
          console.log(res.data.role);
          if (res.data.role == "supervisor") {
            navigate("/admin-panel");
          } else {
            navigate("/dashboard");
          }
        }
      })
      .catch((res) => {
        if (res.response && res.response.status === 401) {
          Notify.failure(t("incorrect"));
        } else {
          Notify.failure(t("connectionError"));
        }
      });
  };

  return (
    <TestLayout className="flex items-center justify-center form-input w-full">
      <SimpleCard className={"bg-base-100 w-[450px] sm:m-4"}>
        <div className="text-[24px] text-center">{t("signToSite")}</div>
        <SimpleInput
          className={"mt-6"}
          type="text"
          title={t("username")}
          placeholder={t("example")}
          isValid={values.username != ""}
          validationError={t("required")}
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
          type="password"
          title={t("password")}
          isValid={values.password != ""}
          validationError={t("required")}
          onChange={(e) =>
            setValues((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
          defaultValue={""}
        />
        <div className="w-full flex justify-center items-center mt-5">
          <ReCAPTCHA sitekey={"6LecwBMnAAAAAItOWnJM8T17TlvnA1ewPIUGDuj_"} ref={captchaRef} onChange={handleCaptchaChange} />
        </div>

        <div className="flex justify-center mt-5">
          <BorderButton className={"w-[10rem] h-8"} onClick={!captchaRes ? () => {} : handleSubmit} disabled={!captchaRes}>
            {t("enter")}
          </BorderButton>
        </div>
        <div className="mt-3 text-base-content opacity-80 cursor-pointer text-center" onClick={() => navigate("/forget-password")}>
          {t("forgot")}{" "}
        </div>
        <div className="flex mt-5 items-cente justify-center text-[16px]  gap-4 md:gap-2">
          <div className="md:text-sm md:w-full text-center rounded-lg cursor-pointer transition-all" onClick={() => navigate("/register")}>
            {t("dontHave")}{" "}
          </div>
          <div className="md:text-sm md:w-full text-center text-accent text-lg rounded-lg cursor-pointer transition-all" onClick={() => navigate("/register")}>
            {t("signUp")}{" "}
          </div>
        </div>
      </SimpleCard>
    </TestLayout>
  );
};

export default Login;
