import axios from "axios";
import { Block, Notify } from "notiflix";
import React, { useState } from "react";
import BorderButton from "../components/Buttons/BorderButton";
import AiImagesCard from "../components/Cards/AiImagesCard";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import SimpleInput from "../components/Inputs/SimpleInput";
import TestLayout from "../Layouts/TestLayout";

const AI = () => {
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
          height: "720",
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
        if (res.response && res.response.status === 401) {
          Notify.failure("در ابتدا می‌بایست لاگین کنید");
        }
        else {
        Notify.failure("خطا");
        }
      })
      .finally(() => {
        console.log("sth");
        Block.remove("#ai-image", 3000);
      });
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
            placeholder="مثلا: گل"
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
        className={`transition-all ${!isClicekd ? "opacity-0" : ""}`}
      >
        <div className="flex flex-col relative rounded-2xl overflow-hidden">
        <img src={getImages} alt="" className="object-cover rounded-2xl"/>
          <div className="absolute bottom-10 left-0 right-0 mx-auto bg-black/10 backdrop-blur-xl py-4 z-30 text-center text-sm cursor-pointer text-white mb-4">
            Share | <a href={getImages} download={'ai.jpg'}>Download</a>
          </div>
        </div>
        {/* <AiImagesCard images={getImages} /> */}
      </div>
    </TestLayout>
  );
};

export default AI;
