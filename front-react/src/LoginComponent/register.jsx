import { useState, useEffect } from "react";
import axios from "axios";
import "./register-styles.css";
import { Link, useNavigate } from "react-router-dom";
import TestLayout from "../Layouts/TestLayout";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import BorderButton from "../components/Buttons/BorderButton";
import SimpleInput from "../components/Inputs/SimpleInput";
import { useTranslation } from "react-i18next";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    foreigner: false,
  });
  const [isChecked, setIsChecked] = useState(false);
  const [foreigner, setForeigner] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Validation states
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isRegisterEnabled, setIsRegisterEnabled] = useState(false);

  const { t } = useTranslation(["login"]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load reCAPTCHA v3 script
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=6LfAJGoqAAAAAGKheBOwBD1Z1mLFzUfNBfxIKwtc`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const executeRecaptcha = () => {
    return new Promise((resolve, reject) => {
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute("6LfAJGoqAAAAAGKheBOwBD1Z1mLFzUfNBfxIKwtc", { action: "register" })
          .then(token => resolve(token))
          .catch(error => reject(error));
      });
    });
  };

  useEffect(() => {
    // Enable the register button only if all conditions are met
    setIsRegisterEnabled(
      isChecked &&
      values.username &&
      values.email &&
      isValidPassword &&
      passwordsMatch
    );
  }, [isChecked, values, isValidPassword, passwordsMatch]);

  // Password validation
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    const passwordPattern = /^(?=.*[A-Z]).{8,}$/;

    setValues((prev) => ({
      ...prev,
      password: password,
    }));

    setIsValidPassword(passwordPattern.test(password));
    setPasswordsMatch(password === values.confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;

    setValues((prev) => ({
      ...prev,
      confirmPassword: confirmPassword,
    }));

    setPasswordsMatch(confirmPassword === values.password);
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegisterEnabled) {
      try {
        const recaptchaToken = await executeRecaptcha(); // Execute reCAPTCHA and get token

        await axios.post("https://api.artina.org/api/account/register/", {
          username: values.username,
          email: values.email,
          password: values.password,
          isforeigner: foreigner,
          referral_code: values.referralCode,
          recaptcha_token: recaptchaToken, // Include reCAPTCHA token
        });

        Notify.success(t("success"));
        
        navigate("/login");
      } catch (error) {
        setErrorMessage(t("Invalid credentials"));
      }
    }
  };

  return (
    <TestLayout className="flex items-center justify-center form-input w-full">
      <SimpleCard className={"bg-base-100 w-[550px] sm:m-4"}>
        <div className="text-[24px] text-center">{t("signForm")}</div>

        {/* Error message */}
        {errorMessage && <div className="text-red-500 text-center mt-2">{errorMessage}</div>}

        <SimpleInput
          className={"mt-6"}
          type="text"
          name="username"
          title={t("username")}
          placeholder={t("example")}
          isValid={values.username !== ""}
          validationError={t("required")}
          onChange={(e) => setValues((prev) => ({ ...prev, username: e.target.value }))}
          defaultValue={""}
        />

        {/* Email field */}
        <SimpleInput
          className={"mt-6"}
          type="text"
          title={t("email")}
          placeholder={t("emailExample")}
          isValid={values.email !== ""}
          validationError={t("required")}
          onChange={(e) => setValues((prev) => ({ ...prev, email: e.target.value }))}
          defaultValue={""}
        />

        {/* Password field */}
        <SimpleInput
          className={"mt-6"}
          type="password"
          title={t("password")}
          placeholder=""
          isValid={isValidPassword && values.password !== ""}
          validationError={t("required")}
          onChange={handlePasswordChange}
          defaultValue={""}
        />

        {/* Confirm Password field */}
        <SimpleInput
          className={"mt-6"}
          type="password"
          title={t("repeat")}
          placeholder=""
          isValid={passwordsMatch}
          validationError={t("passwordMismatch")}
          onChange={handleConfirmPasswordChange}
          defaultValue={""}
        />

        {/* Referral Code */}
        <SimpleInput
          className={"mt-6"}
          type="text"
          title={t("referralCode")}
          placeholder={t("optional8Characters")}
          onChange={(e) =>
            setValues((prev) => ({
              ...prev,
              referralCode: e.target.value,
            }))
          }
          defaultValue={""}
        />

        {/* Foreigner checkbox */}
        <div className="flex items-center mt-6 justify-center">
          <div
            className={`cursor-pointer flex items-center gap-2 py-3.5 px-2 rounded-md transition-all ${foreigner ? "bg-green-50 border-2 border-green-400" : "bg-neutral-50 border-2 border-gray-300"
              } hover:bg-green-100 hover:border-green-400`}
            onClick={() => setForeigner(!foreigner)}
          >
            <div
              className={`w-5 h-5 flex items-center justify-center rounded-full transition-all ${foreigner ? "bg-green-400" : "bg-white border-2 border-gray-300"
                }`}
            >
              {foreigner && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-4 h-4"
                >
                  <path d="M9 11.6L11.6 14.2 15 10.8 16.4 12.2 11.6 17 7.6 13 9 11.6z" />
                </svg>
              )}
            </div>
            <label className="text-sm font-medium text-gray-700">{t("nonPersian")}</label>
          </div>
        </div>

        {/* Terms and Register Button */}
        <div className="w-full mt-5 flex md:flex-col justify-between items-center gap-4">
          <a href="/privacy-policy" className="hover:text-neutral-content hover:bg-neutral px-2 py-1 transition-all duration-100 font-b2 rounded-full">
            {t("policy")}{" "}
          </a>
          <div className="flex gap-4">
            <div className={`cursor-pointer rounded-md flex items-center gap-3 ${!isChecked ? "hover:bg-rose-50 hover:scale-105 transition-all border-[1px] border-rose-400 text-rose-400" : "hover:bg-green-50 hover:scale-105 transition-all text-green-600 border-[1px] border-green-600"} transition-all px-3 py-2`} onClick={() => setIsChecked((prev) => !prev)}>
              <div className={`h-4 w-4 ${isChecked ? "bg-green-600" : "bg-rose-50 border-[1px] border-rose-400"} rounded-full`} />
              <div>{t("agree")}</div>
            </div>
            <BorderButton className={"px-6 py-3"} size="lg" onClick={handleSubmit} disabled={!isRegisterEnabled}>
              {t("signUp")}
            </BorderButton>
          </div>
        </div>

        {/* Login Link */}
        <div className="px-5 py-3 rounded-2xl mt-5 text-center ease-in-out duration-200">
          <Link to="/Login" className="text-accent">
            {t("already")}{" "}
          </Link>
        </div>
      </SimpleCard>
    </TestLayout>
  );
};

export default Register;
