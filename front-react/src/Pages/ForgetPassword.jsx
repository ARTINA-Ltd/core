import React, { useState } from "react";
import TestLayout from "../Layouts/TestLayout";
import SimpleInput from "../components/Inputs/SimpleInput";
import SimpleCard from "./../components/Cards/UserDashboardCards/SimpleCard";
import BorderButton from "../components/Buttons/BorderButton";
import axios from "axios";
import { Notify } from "notiflix";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const ForgetPassword = () => {
  const [values, setValues] = useState({ phone_number: "", code: "", password: "" });
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation(["login"]);
  const handleSubmit = () => {
    axios
      .post("https://api.artina.org/api/account/user-PasswordReset/", {
        phone_number: values.phone_number,
        token: values.code,
        password: values.password,
      })
      .then((e) => {
        Notify.success(t("passwordChanged"));
        navigate("/login");
      })
      .catch((res) => {
        Notify.failure(t("error"));
      });
  };

  const handleSend = () => {
    axios
      .post("https://api.artina.org/api/account/send-verification-code/", {
        phone_number: values.phone_number,
      })
      .then((e) => {
        Notify.success(t("sent"));
        setIsClicked(true);
      })
      .catch(() => Notify.failure(t("noUser")));
  };
  return (
    <TestLayout className="flex items-center justify-center form-input w-[100%]">
      <SimpleCard className={"bg-base-100 w-[450px]"}>
        <div className="text-center text-[24px]">{t("recovery")}</div>
        <div>
          <SimpleInput
            className={"mt-6"}
            type="text"
            title={t("phone")}
            placeholder="09121234567"
            isValid={values.phone_number != ""}
            validationError={t("required")}
            onChange={(e) =>
              setValues((prev) => ({
                ...prev,
                phone_number: e.target.value,
              }))
            }
            defaultValue={null}
            // disabled={isClicked}
          />

          <div className={`justify-end mt-3 ${!isClicked ? "flex" : "hidden"}`}>
            <BorderButton onClick={handleSend} size="lg">
              {t("sendCode")}
            </BorderButton>
          </div>
        </div>

        {isClicked ? (
          <div>
            <SimpleInput
              className={"mt-6"}
              type="text"
              title={t("code")}
              placeholder="12345"
              isValid={values.code != ""}
              validationError={t("required")}
              onChange={(e) =>
                setValues((prev) => ({
                  ...prev,
                  code: e.target.value,
                }))
              }
              defaultValue={null}
            />
            <SimpleInput
              className={"mt-6"}
              type="password"
              title={t("newPass")}
              placeholder="12345"
              isValid={values.password != ""}
              validationError={t("required")}
              onChange={(e) =>
                setValues((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              defaultValue={null}
            />
            <div className="flex justify-end mt-3 mb-5">
              <BorderButton onClick={handleSubmit}>ثبت</BorderButton>
            </div>
          </div>
        ) : (
          ""
        )}
      </SimpleCard>
    </TestLayout>
  );
};

export default ForgetPassword;
