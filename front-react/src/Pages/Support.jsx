import React, { useState } from "react";
import TestLayout from "../Layouts/TestLayout";
import "../LoginComponent/formInput-style.css";
import SimpleInput from "../components/Inputs/SimpleInput";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";

const Support = () => {
  const [values, setValues] = useState({ email: "", text: "" });

  const handleSubmit = () => {};
  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  return (
    <TestLayout className="w-full form-input">
      <SimpleCard className={"bg-[#ffffff] w-[450px]"}>
        <div className="text-[24px]">پشتیبانی</div>
        <SimpleInput
          className={"mt-6"}
          type="text"
          title="ایمیل"
          placeholder="مثلا: youremail@gmail.com"
          isValid={ValidateEmail(values.email)}
          validationError="نمیتواند خالی باشد"
          onChange={e =>
            setValues(prev => ({
              ...prev,
              email: e.target.value
            }))}
          defaultValue={null}
        />

        <SimpleInput
          className={"mt-6"}
          type="text"
          title="متن درخواست"
          isValid={true}
          validationError="نمیتواند خالی باشد"
          onChange={e =>
            setValues(prev => ({
              ...prev,
              email: e.target.value
            }))}
          defaultValue={null}
        />

        <div className="flex justify-center mt-7">
          <div
            className=" text-white text-[14px] bg-[#4e45d0] py-5 px-[6rem] rounded-lg cursor-pointer transition-all hover:bg-[#372fac]"
            onClick={handleSubmit}
          >
            ارسال
          </div>
        </div>
      </SimpleCard>
    </TestLayout>
  );
};

export default Support;
