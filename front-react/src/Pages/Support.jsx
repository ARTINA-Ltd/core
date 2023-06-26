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
  const [values, setValues] = useState({ subject: "", text: "", email: "" });
  const user = useContext(UserContext);
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const inputFile = useRef(null);

  const handleSubmit = () => {
    axios
      .post(
        "https://api.artina.org/api/account/ticket/",
        {
          subject: values.subject,
          text: values.text,
          email: values.email,
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
            isValid={values.subject != ""}
            // onChange={(e) =>
            //   setValues((prev) => ({
            //     ...prev,
            //     subject: e.target.value,
            //   }))
            // }
            defaultValue={null}
          />

          <SimpleInput
            className={"mt-6"}
            type="text"
            title="نام خانوادگی"
            isValid={values.subject != ""}
            // onChange={(e) =>
            //   setValues((prev) => ({
            //     ...prev,
            //     subject: e.target.value,
            //   }))
            // }
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
            isValid={values.subject != ""}
            // onChange={(e) =>
            //   setValues((prev) => ({
            //     ...prev,
            //     subject: e.target.value,
            //   }))
            // }
            defaultValue={null}
          />
        </div>
        <div className="mt-3">متن درخواست</div>
        <textarea
          className={"w-full border-[1px] border-indigo-600 mt-1 min-h-[190px]"}
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
        <div className="mt-3">آپلود عکس</div>
        <div className="w-full flex justify-center">
          <div className="relative group w-3/4">
            <img
              className="w-full h-auto max-h-[300px] object-cover rounded-2xl"
              src={
                imageUrl
                  ? imageUrl
                  : "https://api.artina.org/static/images/No_Image_Available.jpg"
              }
            />

            <div
              className="group-hover:opacity-80 opacity-0 cursor-pointer duration-300 bg-black transition-all h-full w-full absolute inset-0 m-auto items-center justify-center flex rounded-2xl"
              onClick={() => inputFile.current.click()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="0.5"
                stroke="currentColor"
                className="text-white "
                width="3em"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                />
              </svg>
            </div>

            <input
              hidden
              accept="image/*"
              type="file"
              onChange={(e) => {
                setImage(() => e.target.files[0]);
              }}
              ref={inputFile}
            />
          </div>
        </div>

        <div className="flex justify-center mt-5">
          <BorderButton onClick={handleSubmit}>ارسال</BorderButton>
        </div>
      </SimpleCard>
    </TestLayout>
  );
};

export default Support;
