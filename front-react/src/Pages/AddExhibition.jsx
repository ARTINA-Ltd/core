import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Notify } from "notiflix";
import { Block } from "notiflix";
import BorderButton from "../components/Buttons/BorderButton.jsx";
import SimpleInput from "../components/Inputs/SimpleInput.jsx";
import TestLayout from "../Layouts/TestLayout.jsx";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import DatePicker from "react-multi-date-picker";
import DateObject from "react-date-object";
import gregorian from "react-date-object/calendars/gregorian";
import persian from "react-date-object/calendars/persian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import persian_fa from "react-date-object/locales/persian_fa";
import i18n from "../i18n.js";

const AddExhibition = () => {
  const { t } = useTranslation("exhibitor");
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(false);
  const [ticketPrice, setTicketPrice] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [options, setOptions] = useState([]);
  const [commissionAmount, setCommissionAmount] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [applicationDeadline, setApplicationDeadline] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);

  const inputFile = useRef(null);

  const [values, setValues] = useState({
    marketName: "",
    description: "",
    commision: "",
  });

  const [validate, setValidate] = useState({
    marketName: false,
    description: false,
    commision: false,
  });

  // Convert date to Gregorian for submission
  const convertToGregorian = (date) => {
    if (!date) return null;
    const dateObj = new DateObject({ date });
    return dateObj.toDate(); // Converts to JavaScript Date object
  };

  useEffect(() => {
    if (categories.length > 0) {
      setOptions(categories.map((cat) => ({ value: cat.id, label: cat.name })));
    }
  }, [categories]);

  const handleSubmit = () => {
    if (!startDate || !endDate || !applicationDeadline) {
      Notify.failure(t("error"));
      return;
    }

    const start_date = convertToGregorian(startDate);
    const end_date = convertToGregorian(endDate);
    const application_deadline = convertToGregorian(applicationDeadline);

    const authTokens = JSON.parse(localStorage.getItem("authTokens"));

    axios
      .post(
        `https://api.artina.org/api/exhibition/exhibitions/`,
        {
          marketName: values.marketName,
          image: profileImageUrl,
          start_date: start_date.toISOString(),
          end_date: end_date.toISOString(),
          description: values.description,
          has_ticket: ticket,
          price: ticket ? ticketPrice : null,
          application_deadline: application_deadline.toISOString(),
          category: selectedCategory,
          commision: values.commision,
        },
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      )
      .then((res) => {
        Notify.success(t("addSuccessful"));
        navigate("/exhibitor");
      })
      .catch((e) => {
        if (e.response.status === 400 && e.response.data.price[0] === "Ensure this value is greater than or equal to 5000.") {
          Notify.failure(t("minPrice"));
          // console.log("400 and error");
        } else {
          Notify.failure(t("error"));
          // console.log(e);
        }
      });
  };

  useEffect(() => {
    const authTokens = JSON.parse(localStorage.getItem("authTokens"));
    axios
      .get(`https://api.artina.org/api/exhibition/categories/`, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      })
      .then((res) => {
        setCategories(res.data);
      });
  }, []);

  useEffect(() => {
    const authTokens = JSON.parse(localStorage.getItem("authTokens"));
    if (profileImage) {
      Block.circle("#exhibitionImage");

      Notify.info(t("uploadPhoto"));
      const formData = new FormData();
      formData.append("image", profileImage, profileImage.name);
      axios
        .post("https://api.artina.org/api/transaction/images/", formData,
          {
            headers: {
              Authorization: `Bearer ${authTokens.access}`, // Use the access token
              "Content-Type": "multipart/form-data" // This ensures the correct content type
            },
            mode: "cors",
          }
        )
        .then((res) => {
          Notify.success(t("uploadSuccess"));
          setProfileImageUrl(res.data.image);
          Block.remove("#exhibitionImage", 3000);
        })
        .catch(() => {
          Notify.failure(t("uploadError"));
          Block.remove("#exhibitionImage", 3000);
        });
    }
  }, [profileImage]);

  // Dynamically set the calendar and locale based on the language
  const isPersian = i18n.language === "fa";
  const calendar = isPersian ? persian : gregorian;
  const locale = isPersian ? persian_fa : gregorian_en;

  return (
    <TestLayout>
      <div className="card mxau flex justify-content-center">
        <div className="w-[80%] lg:w-[80%] mx-auto sm:w-full bg-base-100 p-8 rounded-xl">
          <div>
            <p className="font-b9 mb-4">{t("addEx")}</p>
          </div>
          <div className="font-b4">
            <div className="w-full flex items-center justify-center md:flex-col gap-4">
              <div className="relative group items-center flex justify-center w-1/2" id="exhibitionImage">
                <img
                  alt=""
                  src={profileImageUrl ? profileImageUrl : "https://api.artina.org/static/images/No_Image_Available.png"}
                  className="pointer-events-none rounded-2xl max-w-md overflow-hidden object-cover h-auto flex-shrink-0 w-full"
                />
                <div
                  className="group-hover:opacity-80 opacity-0 cursor-pointer duration-300 bg-black transition-all w-full h-full absolute inset-0 m-auto items-center justify-center flex rounded-2xl"
                  onClick={() => inputFile.current.click()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="0.5"
                    stroke="currentColor"
                    className="text-white"
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
                    setProfileImage(e.target.files[0]);
                  }}
                  ref={inputFile}
                />
              </div>
              <div className="flex flex-col p-4 rounded-md gap-8 w-full mx-4">
                <SimpleInput
                  className={"shadow-md rounded-md"}
                  type="text"
                  title={t("name")}
                  placeholder={t("nameExample")}
                  isValid={validate.marketName}
                  validationError={t("required")}
                  onChange={(e) => {
                    setValues((prev) => ({ ...prev, marketName: e.target.value }));
                    setValidate((prev) => ({
                      ...prev,
                      marketName: e.target.value !== "",
                    }));
                  }}
                  defaultValue={null}
                  disabled={false}
                />
                <SimpleInput
                  className={"shadow-md rounded-md"}
                  type="text"
                  title={t("description")}
                  placeholder={t("descriptionExample")}
                  isValid={validate.description}
                  validationError={t("required")}
                  onChange={(e) => {
                    setValues((prev) => ({ ...prev, description: e.target.value }));
                    setValidate((prev) => ({
                      ...prev,
                      description: e.target.value !== "",
                    }));
                  }}
                  defaultValue={null}
                  disabled={false}
                />
                {options ? (
                  <select
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                    }}
                    className="select select-bordered w-full max-w-xs mx-4 border-primary sm:mx-0"
                  >
                    <option disabled selected>
                      {t("chooseCategore")}
                    </option>
                    {options.map((msg, i) => (
                      <option key={i} value={msg.value}>
                        {msg.label}
                      </option>
                    ))}
                  </select>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col gap-8 mt-8 p-4 rounded-md my-4 items-center justify-center">
              <div className="flex gap-4 md:flex-col w-9/12 sm:w-full">
                {/* Start Date Picker */}
                <div className="items-center font-b4 lg:flex-col w-full">
                  <div className={`shadow-md flex gap-2 justify-between items-center font-b4 border-x-2 border-x-transparent ${i18n.dir() === "rtl" ? "border-r-primary" : "border-l-primary"}`}>
                    <div className="mx-1 sm:text-sm font-b5">{t("startDate")}</div>
                    <DatePicker
                      value={startDate}
                      onChange={setStartDate}
                      calendar={calendar}
                      locale={locale}
                      format="YYYY/MM/DD"
                      inputClass="p-2 bg-[#f7f8fa] text-sm w-full h-10 w-400"
                    />
                  </div>
                </div>

                <div className="items-center font-b4 lg:flex-col w-full">
                  <div className={`shadow-md flex gap-2 justify-between items-center font-b4 border-x-2 border-x-transparent ${i18n.dir() === "rtl" ? "border-r-primary" : "border-l-primary"}`}>
                    <div className="mx-1 sm:text-sm font-b5">{t("endDate")}</div>
                    <DatePicker
                      value={endDate}
                      onChange={setEndDate}
                      calendar={calendar}
                      locale={locale}
                      format="YYYY/MM/DD"
                      inputClass="p-2 bg-[#f7f8fa] text-sm w-full h-10 w-400"
                    />
                  </div>
                </div>
              </div>

              <div className="flex font-b4 lg:flex-col w-9/12 gap-4 sm:w-full">
                <div className={`w-full shadow-md flex gap-2 justify-between items-center font-b4 border-x-2 border-x-transparent ${i18n.dir() === "rtl" ? "border-r-primary" : "border-l-primary"}`}>
                  <div className="mx-1 w-full sm:text-sm font-b5">{t("deadLine")}</div>
                  <div className="w-full mx-auto flex gap-4 md:w-full">
                    <DatePicker
                      value={applicationDeadline}
                      onChange={setApplicationDeadline}
                      calendar={calendar}
                      locale={locale}
                      format="YYYY/MM/DD"
                      inputClass="p-2 bg-[#f7f8fa] text-sm w-full h-10"
                    />
                  </div>
                </div>

                <SimpleInput
                  className={"shadow-md rounded-md"}
                  type="number"
                  title={t("commision")}
                  onChange={(e) => {
                    setValues((prev) => ({
                      ...prev,
                      commision: e.value,
                    }));
                  }}
                  disabled={false}
                  maxChars={2}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 p-4 rounded-md">
              <div
                className={`border-[1px] w-1/2 mx-auto rounded-full px-3 py-1 cursor-pointer text-center transition-all ${ticket
                  ? "border-green-500 text-green-600 bg-green-50"
                  : "border-red-600 text-red-700 bg-red-50"
                  }`}
                onClick={() => {
                  setTicket((prev) => !prev);
                }}
              >
                {ticket ? t("hasTicket") : t("noTicket")}
              </div>
              {ticket ? (
                <SimpleInput
                  className={"shadow-md rounded-md"}
                  type="number"
                  title={t("ticketPrice")}
                  isValid={ticketPrice !== ""}
                  validationError={t("required")}
                  onChange={(e) => {
                    setTicketPrice(e.target.value);
                  }}
                  disabled={false}
                />
              ) : null}

              <div className="w-full flex sm:flex-col justify-end items-center gap-4">
                <a
                  href="/privacy-policy"
                  className="text-gray-400 hover:text-gray-500 hover:bg-gray-50 px-2 py-1 transition-all duration-100 font-b2 rounded-md"
                >
                  {t("policy")}
                </a>
                <div
                  className={`cursor-pointer rounded-full flex items-center gap-3 ${!isChecked
                    ? "hover:bg-rose-50  hover:scale-105 transition-all border-[1px] border-rose-400 text-rose-400"
                    : "hover:bg-green-50 hover:scale-105 transition-all text-green-600 border-[1px] border-green-600"
                    } transition-all px-3 py-2`}
                  onClick={() => setIsChecked((prev) => !prev)}
                >
                  <div
                    className={`h-4 w-4 ${isChecked
                      ? "bg-green-600"
                      : "bg-rose-50 border-[1px] border-rose-400"
                      } rounded-full`}
                  />
                  <div> {t("agreed")}</div>
                </div>
                <BorderButton
                  onClick={() => handleSubmit()}
                  className="font-b4 text-center"
                  disabled={
                    !isChecked ||
                    !values.marketName ||
                    !startDate ||
                    !endDate ||
                    !applicationDeadline ||
                    !values.description ||
                    !profileImage
                  }
                >
                  {t("submit")}
                </BorderButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TestLayout>
  );
};

export default AddExhibition;
