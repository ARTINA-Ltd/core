import React, { useState } from "react";
import TestLayout from "../Layouts/TestLayout";
import SimpleInput from "../components/Inputs/SimpleInput";
import SimpleCard from "./../components/Cards/UserDashboardCards/SimpleCard";

const ForgetPassword = () => {
  const [values, setValues] = useState({ username: "", code: "" });
  const [isClicked, setIsClicked] = useState(false);
  const handleSubmit = () => {
    setIsClicked(false);

  };
  const handleSend = () => {
    setIsClicked(true);
  };
  return <TestLayout className="flex items-center justify-center form-input w-[100%]">
      <SimpleCard className={"bg-[#ffffff] w-[450px]"}>
        <div className="text-[24px]">بازیابی رمز عبور</div>
        <div>
          <SimpleInput className={"mt-6"} type="text" title="نام کاربری" placeholder="مثلا: alireza" isValid={values.username != ""} validationError="نمیتواند خالی باشد" onChange={e => setValues(
                prev => ({
                  ...prev,
                  username: e.target.value
                })
              )} defaultValue={null} />

          <div className="flex justify-end mt-3">
            <div className=" text-white text-[14px] bg-[#4e45d0] py-5 px-[5rem] rounded-lg cursor-pointer transition-all hover:bg-[#372fac]" onClick={handleSend}>
              ارسال کد
            </div>
          </div>
        </div>
        {isClicked ? <div>
              <SimpleInput className={"mt-6"} type="text" title="کد" placeholder="مثلا: 12345" isValid={values.code != ""} validationError="نمیتواند خالی باشد" onChange={e => setValues(
                    prev => ({
                      ...prev,
                      code: e.target.value
                    })
                  )} defaultValue={null} />
              <div className="flex justify-end mt-3 mb-5">
                <div className=" text-[#4e45d0] text-[14px] bg-[#4e45d020] py-5 px-[4rem] rounded-lg cursor-pointer transition-all hover:bg-[#372fac20]" onClick={handleSubmit}>
                  ثبت
                </div>
              </div>
            </div> : ""}
      </SimpleCard>
    </TestLayout>;
};

export default ForgetPassword;
