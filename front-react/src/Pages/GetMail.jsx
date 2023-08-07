import axios from "axios";
import { Block, Notify } from "notiflix";
import React, { useState } from "react";
import BorderButton from "../components/Buttons/BorderButton";
import AiImagesCard from "../components/Cards/AiImagesCard";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import SimpleInput from "../components/Inputs/SimpleInput";
import TestLayout from "../Layouts/TestLayout";

const GetMail = () => {
  const [descriotion, setDescription] = useState();
  const [isClicekd, setIsClicekd] = useState(false);
  const [getImages, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsClicekd(true);

    Block.circle("#ai-image");
    // Block.remove("#images", 3000);

    await axios
      .post(
        "https://api.artina.org/api/AI/generated_images/",
        {
          text: descriotion,
          width: "512",
          height: "1016",
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
        setImages(res.data.image_url)
      })
      .catch((res) => {
        Notify.failure("خطا");
      })
      .finally(() => {
        console.log("sth");
        Block.remove("#ai-image", 3000);
      });
  };

  return (
    <TestLayout
      className={`flex flex-col items-center transition-all ${
        isClicekd ? "mt-10" : "mt-60"
      } gap-5`}
      rev={true}
    >
      <div id="ai-image" className="rounded-2xl w-1/3 md:w-[90%] xl:w-2/3 ">
        <SimpleCard
          className={
            "bg-[#ffffff] w-full sm:m-4 transition-all bg-white/80 "
          }
        >
          <div className="text-[24px] text-center transition-all">
          عضویت در خبرنامه آرتینا
          </div>
          <SimpleInput
            className={"mt-6"}
            type="text"
            title="ایمیل خود را وارد کنید"
            placeholder="مثلا: mail@artina.org"
            isValid={descriotion != ""}
            validationError="نمی‌تواند خالی باشد"
            onChange={(e) => setDescription(e.target.value)}
            defaultValue={""}
          />

          <div className="flex justify-center mt-5">
            <BorderButton onClick={handleSubmit}>عضویت</BorderButton>
          </div>
        </SimpleCard>
      </div>
    </TestLayout>
  );
};

export default GetMail;
