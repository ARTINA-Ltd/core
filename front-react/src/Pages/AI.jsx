import axios from "axios";
import { Block } from "notiflix";
import React, { useState } from "react";
import BorderButton from "../components/Buttons/BorderButton";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import SimpleInput from "../components/Inputs/SimpleInput";
import TestLayout from "../Layouts/TestLayout";

const AI = () => {
  const [descriotion, setDescription] = useState();
  const [isClicekd, setIsClicekd] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsClicekd(true);

    Block.dots("#ai-image");
    Block.circle("#images");
    Block.remove("#ai-image", 2000);
    Block.remove("#images", 2000);

    // await axios
    //   .post(
    //     "https://api.artina.org/api/account/login/",
    //     {
    //       username: values.username,
    //       password: values.password,
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     if (res.status === 200) {
    //       localStorage.setItem("authTokens", res.data.access);
    //       userChange(res);
    //       Notify.success("با موفقیت وارد شدید");
    //       navigate("/dashboard");
    //     }
    //   })
    //   .catch((res) => {
    //     Notify.failure("خطا");
    //   });
  };

  return (
    <TestLayout className="flex flex-col justify-center form-input gap-5 items-center">
      <div className={`${!isClicekd ? "" : "hidden"} transition-all`}></div>
      <div id="ai-image" className="rounded-2xl w-2/3 transition-all">
        <SimpleCard className={"bg-[#ffffff] w-full sm:m-4 transition-all"}>
          <div className="text-[24px] text-center transition-all">
            تولید عکس با هوش مصنوعی
          </div>
          <SimpleInput
            className={"mt-6"}
            type="text"
            title="توضیحات عکس"
            placeholder="مثلا: alireza"
            isValid={descriotion != ""}
            validationError="نمی‌تواند خالی باشد"
            onChange={(e) => setDescription(e.target.value)}
            defaultValue={""}
          />

          <div className="flex justify-center mt-5">
            <BorderButton onClick={handleSubmit}>تولید</BorderButton>
          </div>
        </SimpleCard>
      </div>
      <div className={`${!isClicekd ? "" : "hidden"}  transition-all`}></div>
      <div
        id="images"
        className={`grid grid-cols-2 col-span-2 gap-5 rounded-2xl w-2/3 p-4 bg-indigo-500 ${
          !isClicekd ? "hidden" : ""
        }`}
      >
        <SimpleCard className="bg-[#ffffffc7]">
          <img src="/2.jpg" alt="" className="object-cover rounded-2xl" />
          <div className="flex justify-center w-full mt-3 gap-3">
            <BorderButton>دانلود عکس</BorderButton>
            <BorderButton>اشتراک گذاری</BorderButton>
          </div>
        </SimpleCard>

        <SimpleCard className="bg-white">
          {" "}
          <img src="/2.jpg" alt="" className="object-cover rounded-2xl" />
          <div className="flex justify-center w-full mt-3 gap-3">
            <BorderButton>دانلود عکس</BorderButton>
            <BorderButton>اشتراک گذاری</BorderButton>
          </div>
        </SimpleCard>
        <SimpleCard className="bg-white">
          {" "}
          <img src="/2.jpg" alt="" className="object-cover rounded-2xl" />
          <div className="flex justify-center w-full mt-3 gap-3">
            <BorderButton>دانلود عکس</BorderButton>
            <BorderButton>اشتراک گذاری</BorderButton>
          </div>
        </SimpleCard>
        <SimpleCard className="bg-white">
          {" "}
          <img src="/2.jpg" alt="" className="object-cover rounded-2xl" />
          <div className="flex justify-center w-full mt-3 gap-3">
            <BorderButton>دانلود عکس</BorderButton>
            <BorderButton>اشتراک گذاری</BorderButton>
          </div>
        </SimpleCard>
      </div>
    </TestLayout>
  );
};

export default AI;
