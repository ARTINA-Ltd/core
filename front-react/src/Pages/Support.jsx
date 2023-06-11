import React, { useState, useContext } from "react";
import TestLayout from "../Layouts/TestLayout";
import "../LoginComponent/formInput-style.css";
import SimpleInput from "../components/Inputs/SimpleInput";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import axios from "axios";
import { UserContext } from "../App";
import { Notify } from "notiflix";
import BorderButton from "../components/Buttons/BorderButton";

const Support = () => {
  const [values, setValues] = useState({ subject: "", text: "" });
  const user = useContext(UserContext);

  const handleSubmit = () => {
    axios
      .post(
        "https://api.artina.org/api/account/ticket/",
        {
          subject: values.subject,
          text: values.text,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
          mode: "cors",
        }
      )
      .then(() =>
        Notify.success(
          "درخواست شما با موفقیت ثبت شد. پشتیبانی ما در اسرع وقت به تیکت شما پاسخ خواهند داد."
        )
      )
      .catch(() => Notify.failure("خطا"));
  };

  return (
    <TestLayout className="flex items-center justify-center form-input w-full">
      <SimpleCard className={"bg-[#ffffff] w-[450px]"}>
        <div className="text-[24px]">پشتیبانی</div>
        <SimpleInput
          className={"mt-6"}
          type="text"
          title="موضوع"
          isValid={values.subject != ""}
          validationError="نمیتواند خالی باشد"
          onChange={(e) =>
            setValues((prev) => ({
              ...prev,
              subject: e.target.value,
            }))
          }
          defaultValue={null}
        />

<div className="mt-3">متن درخواست</div>
        <textarea
          className={"w-full border-[1px] border-indigo-600 mt-1 min-h-[70px]"}
          type="text"
          title=""
          isValid={values.text != ""}
          validationError="نمیتواند خالی باشد"
          onChange={(e) =>
            setValues((prev) => ({
              ...prev,
              text: e.target.value,
            }))
          }
          defaultValue={null}
        />

        <div className="flex justify-center mt-5">
          <BorderButton onClick={handleSubmit}>ارسال</BorderButton>
        </div>
      </SimpleCard>
    </TestLayout>
  );
};

export default Support;
