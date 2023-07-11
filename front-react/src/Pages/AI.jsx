import axios from "axios";
import { Block } from "notiflix";
import React, { useState } from "react";
import BorderButton from "../components/Buttons/BorderButton";
import AiImagesCard from "../components/Cards/AiImagesCard";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import SimpleInput from "../components/Inputs/SimpleInput";
import TestLayout from "../Layouts/TestLayout";

const AI = () => {
  const [descriotion, setDescription] = useState();
  const [isClicekd, setIsClicekd] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsClicekd(e=>!e);

    // Block.dots("#ai-image");
    // Block.circle("#images");
    // Block.remove("#ai-image", 2000);
    // Block.remove("#images", 2000);

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
    <TestLayout
      className={`flex flex-col items-center transition-all ${
        isClicekd ? "mt-20" : "mt-60"
      } gap-5`}
      rev={true}
    >
      <div id="ai-image" className="rounded-2xl w-1/3 md:w-[97%] xl:w-2/3 ">
        <SimpleCard
          className={
            "bg-[#ffffff] w-full sm:m-4 transition-all bg-white/20 backdrop-blur-lg "
          }
        >
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


      <div
        id="images"
        className={`transition-all ${
          !isClicekd ? "opacity-0" : ""
        }`}
      >
        <AiImagesCard/>
      </div>
    </TestLayout>
  );
};

export default AI;
