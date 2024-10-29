import React, { useState, useContext, useRef, useEffect } from "react";
import TestLayout from "../Layouts/TestLayout";
import "../LoginComponent/formInput-style.css";
import SimpleInput from "../components/Inputs/SimpleInput";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import axios from "axios";
import { UserContext } from "../App";
import { Block, Notify } from "notiflix";
import BorderButton from "../components/Buttons/BorderButton";
import { useTranslation } from "react-i18next";

const Support = () => {
  const [values, setValues] = useState({
    subject: "",
    text: "",
    email: "",
    name: "",
    last_name: "",
    phone_number: "",
  });
  const [captchaToken, setCaptchaToken] = useState(null);
  const user = useContext(UserContext);
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const inputFile = useRef(null);
  const { t } = useTranslation(["support"]);

  const authTokens = JSON.parse(localStorage.getItem("authTokens"));

  useEffect(() => {
    // Load reCAPTCHA v3 script
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=6LfAJGoqAAAAAGKheBOwBD1Z1mLFzUfNBfxIKwtc`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const executeRecaptcha = () => {
    return new Promise((resolve, reject) => {
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute("6LfAJGoqAAAAAGKheBOwBD1Z1mLFzUfNBfxIKwtc", { action: "support" })
          .then((token) => resolve(token))
          .catch((error) => reject(error));
      });
    });
  };

  const handleSubmit = async () => {
    try {
      const recaptchaToken = await executeRecaptcha(); // Execute reCAPTCHA and get token
      const requestData = {
        subject: values.subject,
        text: values.text,
        email: values.email,
        name: values.name,
        last_name: values.last_name,
        phone_number: values.phone_number,
        image_url: imageUrl,
        recaptcha_token: recaptchaToken, // Include reCAPTCHA token
      };

      const headers = user ? { Authorization: `Bearer ${authTokens.access}` } : {};

      await axios.post("https://api.artina.org/api/account/ticket/", requestData, { headers, mode: "cors" });
      Notify.success("درخواست شما با موفقیت ثبت شد. پشتیبانی ما در اسرع وقت به تیکت شما پاسخ خواهند داد.");
    } catch {
      Notify.failure("خطا در ثبت تیکت.");
    }
  };

  useEffect(() => {
    if (image) {
      Notify.info("در حال آپلود عکس");
      Block.circle("#uploadImage");

      const formData = new FormData();
      formData.append("image", image, image.name);
      axios
        .post("https://api.artina.org/api/transaction/images/", formData, {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
            "Content-Type": "multipart/form-data",
          },
          mode: "cors",
        })
        .then((res) => {
          Notify.success("با موفقیت آپلود شد");
          setImageUrl(res.data.image);
          Block.remove("#uploadImage", 3000);
        })
        .catch(() => {
          Notify.failure("خطا در آپلود");
          Block.remove("#uploadImage", 3000);
        });
    }
  }, [image]);

  return (
    <TestLayout className="flex items-center justify-center gap-5">
      <SimpleCard className={"bg-base-100 w-1/2 lg:w-4/5 sm:w-[90%]"}>
        <div className="text-[24px]">{t("support")}</div>

        <div className="flex gap-5 lg:flex-col">
          <SimpleInput
            className={"mt-6"}
            type="text"
            title={t("name")}
            validationError={t("required")}
            isValid={values.name !== ""}
            onChange={(e) =>
              setValues((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            defaultValue={null}
          />

          <SimpleInput
            className={"mt-6 lg:mt-2"}
            type="text"
            title={t("lastName")}
            validationError={t("required")}
            isValid={values.last_name !== ""}
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
          title={t("subject")}
          validationError={t("required")}
          isValid={values.subject !== ""}
          onChange={(e) =>
            setValues((prev) => ({
              ...prev,
              subject: e.target.value,
            }))
          }
          defaultValue={null}
        />

        <div className="flex gap-5 lg:flex-col">
          <SimpleInput
            className={"mt-6"}
            type="text"
            title={t("email")}
            validationError={t("required")}
            isValid={values.email !== ""}
            onChange={(e) =>
              setValues((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            defaultValue={null}
          />

          <SimpleInput
            className={"mt-6 lg:mt-2"}
            type="text"
            validationError={t("atleast11")}
            title={t("phoneNumber")}
            isValid={/^\d{11}$/.test(values.phone_number)}
            onChange={(e) =>
              setValues((prev) => ({
                ...prev,
                phone_number: e.target.value,
              }))
            }
            defaultValue={null}
          />
        </div>

        <div className="mt-5 mb-2">{t("upload")}</div>
        <div className="w-full flex justify-center" id="uploadImage">
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
        
        <div className="mt-3">{t("context")}</div>
        <textarea
          className={"w-full border-[1px] border-primary bg-base-100 outline-none mt-1 min-h-[190px] p-5 rounded-xl text-lg font-b2 leading-loose"}
          type="text"
          title=""
          isValid={values.text !== ""}
          onChange={(e) =>
            setValues((prev) => ({
              ...prev,
              text: e.target.value,
            }))
          }
          defaultValue={null}
        />

        <div className="flex justify-center mt-5">
          <BorderButton onClick={handleSubmit}>
            {t("send")}
          </BorderButton>
        </div>
      </SimpleCard>
    </TestLayout>
  );
};

export default Support;
