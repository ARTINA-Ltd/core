import { useState, useContext, useRef, useEffect } from "react";
import "./login-styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { UserChangeContext } from "../App";
import SimpleInput from "../components/Inputs/SimpleInput";
import TestLayout from "../Layouts/TestLayout";
import SimpleCard from "./../components/Cards/UserDashboardCards/SimpleCard";
import BorderButton from "../components/Buttons/BorderButton";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [values, setValues] = useState({ username: "", password: "" });
  const userChange = useContext(UserChangeContext);
  const { t } = useTranslation(["login"]);
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=6LfAJGoqAAAAAGKheBOwBD1Z1mLFzUfNBfxIKwtc`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const validateInputs = () => {
    const usernameRegex = /^[a-zA-Z0-9._-]{3,20}$/;
    const passwordRegex = /^.{8,}$/;

    if (!usernameRegex.test(values.username)) {
      Notify.failure(t("invalidUsername"));
      return false;
    }

    if (!passwordRegex.test(values.password)) {
      Notify.failure(t("invalidPassword"));
      return false;
    }

    return true;
  };

  const executeRecaptcha = () => {
    return new Promise((resolve, reject) => {
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute('6LfAJGoqAAAAAGKheBOwBD1Z1mLFzUfNBfxIKwtc', { action: 'login' })
          .then(token => resolve(token))
          .catch(error => reject(error));
      });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      const token = await executeRecaptcha();
      const res = await axios.post(
        "https://api.artina.org/api/account/login/",
        {
          username: values.username.trim(),
          password: values.password,
          recaptcha_token: token,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.status === 200) {
        const tokenData = {
          access: res.data.access,
          refresh: res.data.refresh,
        };

        localStorage.setItem("authTokens", JSON.stringify(tokenData));
        userChange(res);
        Notify.success(t("success"));

        if (res.data.role === "supervisor") {
          navigate("/admin-panel");
        } else if (res.data.role === "user_one") {
          navigate("/dashboard");
        } else {
          navigate("/profile");
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Notify.failure(t("incorrect"));
      } else {
        Notify.failure(t("connectionError"));
      }
    }
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
          isValid={values.username !== "" && /^[a-zA-Z0-9._-]{3,20}$/.test(values.username)}
          validationError={t("invalidUsername")}
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
          isValid={values.password !== "" && /^.{8,}$/.test(values.password)}
          validationError={t("invalidPassword")}
          onChange={(e) =>
            setValues((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
          defaultValue={""}
        />
        <div className="flex justify-center mt-5">
          <BorderButton className={"w-[10rem] h-8"} onClick={handleSubmit}>
            {t("enter")}
          </BorderButton>
        </div>
        <div className="mt-3 text-base-content opacity-80 cursor-pointer text-center" onClick={() => navigate("/forget-password")}>
          {t("forgot")}
        </div>
        <div className="flex mt-5 items-center justify-center text-[16px] gap-4 md:gap-2">
          <div className="md:text-sm md:w-full text-center rounded-lg cursor-pointer transition-all" onClick={() => navigate("/register")}>
            {t("dontHave")}
          </div>
          <div className="md:text-sm md:w-full text-center text-accent text-lg rounded-lg cursor-pointer transition-all" onClick={() => navigate("/register")}>
            {t("signUp")}
          </div>
        </div>
      </SimpleCard>
    </TestLayout>
  );
};

export default Login;
