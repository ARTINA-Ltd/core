import axios from "axios";
import { Block, Notify } from "notiflix";
import React, { useState } from "react";
import BorderButton from "../components/Buttons/BorderButton";
import AiImagesCard from "../components/Cards/AiImagesCard";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import SimpleInput from "../components/Inputs/SimpleInput";
import TestLayout from "../Layouts/TestLayout";

const GetMail = () => {
  const [description, setDescription] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [getImages, setImages] = useState([]);
  const [isValidEmail, setIsValidEmail] = useState(true); // State to track email validity

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailRegex.test(description)) {
      setIsValidEmail(false);
      return;
    }

    setIsClicked(true);
    setIsValidEmail(true); // Reset email validation state

    try {
      const response = await axios.post("https://api.artina.org/api/AI/WaitListViewSet/get_email/", {
        email: description,
      });

      // console.log(response);
      Notify.success("ایمیل شما با موفقیت ثبت شد");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Notify.failure("ایمیل آدرس وارد شده تکراری است");
      } else {
        console.error(error);
        Notify.failure("خطا در ثبت ایمیل");
      }
    } finally {
      // console.log("Done");
    }
  };

  return (
    // <TestLayout
    //   className={`flex flex-col items-center transition-all ${isClicked ? "mt-10" : "mt-60"
    //     } gap-5`}
    //   rev={true}
    // >
    <div
      style={{ direction: "rtl" }}
      className={`bg-[#f9f9f9] bg-cover bg-[url("https://artina.org/6.jpg")] '
          overflow-hidden`}
    >
      <div className={` m-auto my-0 pt-1 pb-5 min-h-[92vh] flex flex-col items-center transition-all ${isClicked ? "mt-10" : "mt-60"} gap-5`}>
        <div id="ai-image" className="rounded-2xl w-1/3 xl:w-2/3 md:w-[50%] sm:w-11/12">
          <SimpleCard className={"bg-[#ffffff] w-full transition-all bg-base-100/80 sm:m-0"}>
            <div className="text-[24px] text-center transition-all">عضویت در خبرنامه آرتینا</div>
            <SimpleInput className={"mt-6"} type="text" title="ایمیل خود را وارد کنید" placeholder="مثلا: mail@artina.org" isValid={isValidEmail} validationError="لطفاً یک ایمیل معتبر وارد کنید" onChange={(e) => setDescription(e.target.value)} defaultValue={description} />

            <div className="flex justify-center mt-5">
              <BorderButton onClick={handleSubmit}>عضویت</BorderButton>
            </div>
          </SimpleCard>
        </div>
      </div>
    </div>
    // {/* </TestLayout> */}
  );
};

export default GetMail;
