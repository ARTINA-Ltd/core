import { useState, useEffect } from "react";
import axios from "axios";
import "./register-styles.css";
import { Link, useNavigate } from "react-router-dom";
import TestLayout from "../Layouts/TestLayout";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import BorderButton from "../components/Buttons/BorderButton";
import SimpleInput from "../components/Inputs/SimpleInput";
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
  const [isChecked, setIsChecked] = useState(false);
  const [captchaRes, setCaptchaRes] = useState(false);
  const [foreigner, setForeigner] = useState(false);

  // Validation states
  const [usernameValid, setUsernameValid] = useState(true);
  const [usernameUnique, setUsernameUnique] = useState(null);
  const [emailValid, setEmailValid] = useState(true);
  const [emailUnique, setEmailUnique] = useState(null);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isRegisterEnabled, setIsRegisterEnabled] = useState(false);

  const { t } = useTranslation(["login"]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the register button should be enabled
    setIsRegisterEnabled(
      isChecked &&
      captchaRes &&
      values.username &&
      values.email &&
      isValidPassword &&
      passwordsMatch &&
      usernameValid &&
      usernameUnique === true &&
      emailValid &&
      emailUnique === true
    );
  }, [isChecked, captchaRes, values, isValidPassword, passwordsMatch, usernameValid, usernameUnique, emailValid, emailUnique]);

  // ReCAPTCHA handler
  const handleCaptchaChange = (e) => {
    setCaptchaRes(e.length !== 0);
  };

  // Username validation
  const handleUsernameChange = (e) => {
    const username = e.target.value;
    const usernamePattern = /^[a-zA-Z0-9_]+$/; // Allow letters, numbers, and underscores

    setValues((prev) => ({
      ...prev,
      username: username,
    }));

    // Check if username matches the required pattern
    if (!usernamePattern.test(username)) {
      setUsernameValid(false);
      setUsernameUnique(null); // reset the uniqueness check
      return;
    }

    setUsernameValid(true);

    // Check username uniqueness
    axios
      .post("https://api.artina.org/api/account/register/check_username/", { username })
      .then((response) => {
        if (response.data.message === "Username is available.") {
          setUsernameUnique(true);
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          setUsernameUnique(false); // Username is not unique
        } else {
          console.error(err); // Handle other potential errors
        }
      });
  };

  // Email validation
  const handleEmailChange = (e) => {
    const email = e.target.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation pattern

    setValues((prev) => ({
      ...prev,
      email: email,
    }));

    // Check if email matches the required pattern
    if (!emailPattern.test(email)) {
      setEmailValid(false);
      setEmailUnique(null); // reset the uniqueness check
      return;
    }

    setEmailValid(true);

    // Check email uniqueness
    axios
      .post("https://api.artina.org/api/account/register/check_email/", { email })
      .then((response) => {
        if (response.data.message === "Email is available.") {
          setEmailUnique(true);
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          setEmailUnique(false); // Email is not unique
        } else {
          console.error(err); // Handle other potential errors
        }
      });
  };

  // Password validation
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    const passwordPattern = /^(?=.*[A-Z]).{8,}$/; // At least one capital letter and at least 8 characters

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
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegisterEnabled) {
      axios
        .post("https://api.artina.org/api/account/register/", {
          username: values.username,
          email: values.email,
          password: values.password,
          isforeigner: foreigner,
          referral_code: values.referralCode,
        })
        .then(() => {
          navigate("/login");
        })
        .catch((response) => {
          if (response.response.data.error === "This username is already taken.") {
            setUsernameUnique(false);
          }
          if (response.response.data.error === "This email is already registered.") {
            setEmailUnique(false);
          }
        });
    }
  };

  return (
    <TestLayout className="flex items-center justify-center form-input w-full">
      <SimpleCard className={"bg-base-100 w-[550px] sm:m-4"}>
        <div className="text-[24px] text-center">{t("signForm")}</div>

        {/* Username field */}
        <SimpleInput
          className={"mt-6"}
          type="text"
          name="username"
          title={t("username")}
          placeholder={t("example")}
          isValid={usernameValid && usernameUnique !== false && values.username !== ""}
          validationError={t("required")}
          onChange={handleUsernameChange}
          defaultValue={""}
        />
        <div className="text-sm mt-1">
          {!usernameValid && <span className="text-red-500">{t("invalidUsername")}</span>}
          {usernameValid && usernameUnique === false && <span className="text-red-500">{t("usernameTaken")}</span>}
          {usernameValid && usernameUnique === true && <span className="text-green-500">{t("usernameAvailable")}</span>}
        </div>

        {/* Email field */}
        <SimpleInput
          className={"mt-6"}
          type="text"
          title={t("email")}
          placeholder={t("emailExample")}
          isValid={emailValid && emailUnique !== false && values.email !== ""}
          validationError={t("required")}
          onChange={handleEmailChange}
          defaultValue={""}
        />
        <div className="text-sm mt-1">
          {!emailValid && <span className="text-red-500">{t("invalidEmail")}</span>}
          {emailValid && emailUnique === false && <span className="text-red-500">{t("emailTaken")}</span>}
          {emailValid && emailUnique === true && <span className="text-green-500">{t("emailAvailable")}</span>}
        </div>

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
        <div className="text-sm mt-1">
          {!isValidPassword && <span className="text-red-500">{t("invalidPassword")}</span>}
        </div>

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


        {/* ReCAPTCHA */}
        <div className="w-full flex justify-center items-center mt-5">
          <ReCAPTCHA sitekey={"6LecwBMnAAAAAItOWnJM8T17TlvnA1ewPIUGDuj_"} onChange={handleCaptchaChange} />
        </div>

        {/* Register Button */}
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
