import React, { useState } from "react";
import TestLayout from "../Layouts/TestLayout";
import SimpleInput from "../components/Inputs/SimpleInput";
import SimpleCard from "./../components/Cards/UserDashboardCards/SimpleCard";
import BorderButton from "../components/Buttons/BorderButton";
import axios from "axios";
import { Notify } from "notiflix";
import { useNavigate } from "react-router";

const ForgetPassword = () => {
  const [values, setValues] = useState({ phone_number: "", code: "", password:"" });
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    axios
      .post("https://api.artina.org/api/account/user-PasswordReset/", {
        phone_number: values.phone_number,
        token: values.code,
        password: values.password
      })
      .then((e) => {
        Notify.success("رمز عبور شما با موفقیت تغییر یافت");
        navigate('/login');
      })
      .catch((res) => {Notify.failure("خطا");
    });
  };

  const handleSend = () => {
    axios
      .post("https://api.artina.org/api/account/send-verification-code/", {
        phone_number: values.phone_number,
      })
      .then((e) => {
        Notify.success("ارسال شد");
        setIsClicked(true);
      })
      .catch(() => Notify.failure("کاربری با این شماره موبایل وجود ندارد"));
  };
  return (
    <TestLayout className="flex items-center justify-center form-input w-[100%]">
      <SimpleCard className={"bg-[#ffffff] w-[450px]"}>
        <div className="text-[24px]">بازیابی رمز عبور</div>
        <div>
          <SimpleInput
            className={"mt-6"}
            type="text"
            title="شماره موبایل"
            placeholder="مثلا: 09121234567"
            isValid={values.phone_number != ""}
            validationError="نمیتواند خالی باشد"
            onChange={(e) =>
              setValues((prev) => ({
                ...prev,
                phone_number: e.target.value,
              }))
            }
            defaultValue={null}
            // disabled={isClicked}
          />

          <div className={`justify-end mt-3 ${!isClicked ? 'flex' : 'hidden'}`}>
            <BorderButton onClick={handleSend}>ارسال کد</BorderButton>
          </div>
        </div>


        {isClicked ? (
          <div>
            <SimpleInput
              className={"mt-6"}
              type="text"
              title="کد"
              placeholder="مثلا: 12345"
              isValid={values.code != ""}
              validationError="نمیتواند خالی باشد"
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
              title="رمز عبور جدید"
              placeholder="مثلا: 12345"
              isValid={values.password != ""}
              validationError="نمیتواند خالی باشد"
              onChange={(e) =>
                setValues((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              defaultValue={null}
            />
            <div className="flex justify-end mt-3 mb-5">
              <BorderButton
                onClick={handleSubmit}
              >
                ثبت
              </BorderButton>
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
