import { useState, useCallback } from "react";
import axios from "axios";
import "./register-styles.css";
import { Link, useNavigate } from "react-router-dom";
import TestLayout from "../Layouts/TestLayout";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import BorderButton from "../components/Buttons/BorderButton";
import SimpleInput from "../components/Inputs/SimpleInput";
import Notiflix from "notiflix";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    foreigner: false,
  });
  const [isChecekd, setIsChecekd] = useState(false);
  const [captchaRes, setCaptchaRes] = useState(false);
  const [foreigner, setForeigner] = useState(false);

  const { t } = useTranslation(["login"]);

  const navigate = useNavigate();

  const handleCaptchaChange = (e) => {
    if (e.length != 0) {
      setCaptchaRes(true);
    } else {
      setCaptchaRes(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isChecekd == true) {
      axios
        .post("https://api.artina.org/api/account/register/", {
          username: values.username,
          email: values.email,
          password: values.password,
          isforeigner: foreigner,
        })
        .then((response) => {
          Notiflix.Notify.success(t("successSign"));
          navigate("/login");
        })
        .catch((response) => {
          if (response.response.data.error == "This username is already taken.") {
            Notiflix.Notify.failure(t("duplicate"));
          }
          if (response.response.data.error == "This email is already registered.") {
            Notiflix.Notify.failure(t("emailDuplicate"));
          }
        });
    } else {
      Notiflix.Notify.failure(t("agreeRequried"));
    }
  };

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <TestLayout className="flex items-center justify-center form-input w-full">
      <SimpleCard className={"bg-base-100 w-[550px] sm:m-4"}>
        <div className="text-[24px] text-center">{t("signForm")}</div>
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
          type="text"
          title={t("email")}
          placeholder={t("emailExample")}
          isValid={values.email != ""}
          validationError={t("required")}
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
          title={t("password")}
          placeholder=""
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
        <SimpleInput
          className={"mt-6"}
          type="password"
          title={t("repeat")}
          placeholder=""
          isValid={values.confirmPassword != ""}
          validationError={t("required")}
          onChange={(e) =>
            setValues((prev) => ({
              ...prev,
              confirmPassword: e.target.value,
            }))
          }
          defaultValue={""}
        />
        {/* make a boolean checkbox if the user is foreigner */}
        <div className="flex mt-6 justify-center">
          <input className="m-2" type="checkbox" id="foreigner" name="foreigner" value="foreigner" onChange={(e) => setForeigner(e.target.checked)} />
          <label for="foreigner">{t("nonPersian")}</label>
        </div>
        <div className="w-full flex justify-center items-center mt-5">
          <ReCAPTCHA sitekey={"6LecwBMnAAAAAItOWnJM8T17TlvnA1ewPIUGDuj_"} onChange={handleCaptchaChange} />
        </div>
        <div className="w-full mt-5 flex justify-between items-center gap-4">
          <a href="/privacy-policy" className="hover:text-neutral-content hover:bg-neutral px-2 py-1 transition-all duration-100 font-b2 rounded-md">
            {t("policy")}{" "}
          </a>
          <div className={`cursor-pointer rounded-full flex items-center gap-3 ${!isChecekd ? "hover:bg-rose-50  hover:scale-105 transition-all border-[1px] border-rose-400 text-rose-400" : "hover:bg-green-50 hover:scale-105 transition-all text-green-600 border-[1px] border-green-600"} transition-all px-3 py-2`} onClick={() => setIsChecekd((prev) => !prev)}>
            <div className={`h-4 w-4 ${isChecekd ? "bg-green-600" : "bg-rose-50 border-[1px] border-rose-400"} rounded-full`} />
            <div> {t("agree")}</div>
          </div>
          <BorderButton className={"px-6 py-3"} size="lg" onClick={!captchaRes ? () => {} : handleSubmit} disabled={!captchaRes}>
            {t("signUp")}
          </BorderButton>
        </div>
        <div className="bg-accent px-5 py-3 rounded-2xl mt-5 text-center hover:bg-primary ease-in-out duration-200">
          <Link to="/Login" className="text-accent-content hover:text-primary-content">
            {t("already")}{" "}
          </Link>
        </div>
      </SimpleCard>
    </TestLayout>
  );
};

export default Register;
