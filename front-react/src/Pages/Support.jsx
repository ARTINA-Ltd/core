import React, { useState, useContext } from "react";
import TestLayout from "../Layouts/TestLayout";
import "../LoginComponent/formInput-style.css";
import SimpleInput from "../components/Inputs/SimpleInput";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import axios from "axios";
import { UserContext } from "../App";
import { Notify } from "notiflix";
import BorderButton from "../components/Buttons/BorderButton";
import { useRef } from "react";
import { useEffect } from "react";

const Support = () => {
  const [values, setValues] = useState({
    subject: "",
    text: "",
    email: "",
    name: "",
    last_name: "",
    phone_number: "",
  });
  const user = useContext(UserContext);
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const inputFile = useRef(null);

  const handleSubmit = () => {
    if (user) {
      axios
        .post(
          "https://api.artina.org/api/account/ticket/",
          {
            subject: values.subject,
            text: values.text,
            email: values.email,
            name: values.name,
            last_name: values.last_name,
            phone_number: values.phone_number,
            image_url: imageUrl,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
            },
            mode: "cors",
          }
        )
        .then((res) => {
          console.log(res);
          Notify.success(
            "درخواست شما با موفقیت ثبت شد. پشتیبانی ما در اسرع وقت به تیکت شما پاسخ خواهند داد."
          );
        })
        .catch(() => Notify.failure("خطا"));
    } else {
      axios
        .post("https://api.artina.org/api/account/ticket/", {
          subject: values.subject,
          text: values.text,
          email: values.email,
          name: values.name,
          last_name: values.last_name,
          phone_number: values.phone_number,
          image_url: imageUrl,
        })
        .then((res) => {
          console.log(res);
          Notify.success(
            "درخواست شما با موفقیت ثبت شد. پشتیبانی ما در اسرع وقت به تیکت شما پاسخ خواهند داد."
          );
        })
        .catch(() => Notify.failure("خطا"));
    }
  };

  useEffect(() => {
    if (image) {
      Notify.info("در حال آپلود عکس");
      const formData = new FormData();
      formData.append("image", image, image.name);
      axios
        .post("https://api.artina.org/api/transaction/images/", formData)
        .then((res) => {
          Notify.success("با موفقیت آپلود شد");
          setImageUrl(res.data.image);
        })
        .catch(() => Notify.failure("خطا در آپلود"));
    }
  }, [image]);
  return (
    <TestLayout className="flex items-center justify-center gap-5">
      <SimpleCard className={"bg-[#ffffff] w-1/2"}>
        <div className="text-[24px]">پشتیبانی</div>

        <div className="flex gap-5">
          <SimpleInput
            className={"mt-6"}
            type="text"
            title="نام"
            isValid={values.name != ""}
            onChange={(e) =>
              setValues((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            defaultValue={null}
          />

          <SimpleInput
            className={"mt-6"}
            type="text"
            title="نام خانوادگی"
            isValid={values.last_name != ""}
            onChange={(e) =>
              setValues((prev) => ({
                ...prev,
                last_name: e.target.value,
              }))
            }
            defaultValue={null}
          />
        </div>

        <SimpleInput
          className={"mt-6"}
          type="text"
          title="موضوع"
          isValid={values.subject != ""}
          onChange={(e) =>
            setValues((prev) => ({
              ...prev,
              subject: e.target.value,
            }))
          }
          defaultValue={null}
        />

        <div className="flex gap-5">
          <SimpleInput
            ltr={true}
            className={"mt-6"}
            type="text"
            title="ایمیل"
            isValid={values.email != ""}
            onChange={(e) =>
              setValues((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            defaultValue={null}
          />

          <SimpleInput
            ltr={true}
            className={"mt-6"}
            type="text"
            title="شماره تلفن"
            isValid={values.phone_number != ""}
            onChange={(e) =>
              setValues((prev) => ({
                ...prev,
                phone_number: e.target.value,
              }))
            }
            defaultValue={null}
          />
        </div>
        <div className="mt-3">آپلود عکس</div>
        <div className="w-full flex justify-center">
          <div className="relative group w-full">
            <input
              accept="image/*"
              type="file"
              onChange={(e) => {
                setImage(() => e.target.files[0]);
              }}
              ref={inputFile}
            />
          </div>
        </div>
        <div className="mt-3">متن درخواست</div>
        <textarea
          className={"w-full border-[1px] border-indigo-600 mt-1 min-h-[190px]"}
          type="text"
          title=""
          isValid={values.text != ""}
          validationError="نمی‌تواند خالی باشد"
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
