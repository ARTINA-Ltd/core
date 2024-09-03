import React, { useEffect, useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { Notify } from "notiflix";
import { Block } from "notiflix";
import BorderButton from "../components/Buttons/BorderButton.jsx";
import SimpleInput from "../components/Inputs/SimpleInput.jsx";
import TestLayout from "../Layouts/TestLayout.jsx";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const AddExhibition = () => {
  const { t } = useTranslation("exhibitor");
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(false);
  const [ticketPrice, setTicketPrice] = useState(false);
  const [categories, setCtegories] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [options, setOptions] = useState([]);

  const [isChecekd, setIsChecekd] = useState();

  const [values, setValues] = useState({
    marketName: "",
    image: "",
    start_date: "",
    end_date: "",
    description: "",
    application_deadline: "",
    commision: "",
  });

  const [validate, setValidate] = useState({
    marketName: false,
    image: false,
    start_date: false,
    end_date: false,
    description: false,
    application_deadline: false,
  });

  const inputFile = useRef(null);
  const [profileImage, setProfileImage] = useState();
  const [profileImageUrl, setProfileImageUrl] = useState();

  useEffect(() => {
    if (categories != undefined) {
      setOptions([]);

      categories.forEach((element) => {
        setOptions((e) => [...e, { value: element.id, label: element.name }]);
      });
    }
  }, [categories]);

  const handleSubmit = () => {
    axios
      .post(
        `https://api.artina.org/api/exhibition/exhibitions/`,

        {
          marketName: values.marketName,
          image: profileImageUrl,
          start_date: values.start_date,
          end_date: values.end_date,
          description: values.description,
          has_ticket: ticket,
          price: ticket ? ticketPrice : null,
          application_deadline: values.application_deadline,
          category: selectedCategory,
          commision: values.commision,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
        }
      )
      .then((res) => {
        Notify.success(t("addSuccessful"));
        navigate("/exhibitor");
      })
      .catch((e) => {
        Notify.failure(t("error"));

        console.log(e);
      });
  };

  useEffect(() => {
    axios
      .get(`https://api.artina.org/api/exhibition/categories/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
      })
      .then((res) => {
        setCtegories(res.data);
      });
  }, []);
  useEffect(() => {
    if (profileImage) {
      Block.circle("#exhibitionImage");

      Notify.info(t("uploadPhoto"));
      const formData = new FormData();
      formData.append("image", profileImage, profileImage.name);
      axios
        .post("https://api.artina.org/api/transaction/images/", formData)
        .then((res) => {
          Notify.success(t("uploadSuccess"));
          setProfileImageUrl(res.data.image);
          Block.remove("#exhibitionImage", 3000);
        })
        .catch((res) => {
          Notify.failure(t("uploadError"));
          Block.remove("#exhibitionImage", 3000);
        });
    }
  }, [profileImage]);

  return (
    <TestLayout>
      <div className="card mxau flex justify-content-center">
        <div className="w-[80%] lg:w-[80%] mx-auto sm:w-[85%] bg-base-100 p-8 rounded-xl">
          <div>
            <p className="font-b9 mb-4">{t("addEx")}</p>
          </div>
          <div className="font-b4">
            <div className="w-full flex items-center justify-center md:flex-col gap-4 ">
              <div className="relative group items-center flex justify-center w-1/2" id="exhibitionImage">
                <img alt="" src={profileImageUrl ? profileImageUrl : `${"https://api.artina.org/static/images/No_Image_Available.png"}`} className="pointer-events-none rounded-2xl max-w-md overflow-hidden object-cover h-auto flex-shrink-0 w-full" />
                <div className="group-hover:opacity-80 opacity-0 cursor-pointer duration-300 bg-black transition-all w-full h-full absolute inset-0 m-auto items-center justify-center flex rounded-2xl" onClick={() => inputFile.current.click()}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="0.5" stroke="currentColor" className="text-white " width="3em">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                  </svg>
                </div>
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(e) => {
                    setProfileImage(() => e.target.files[0]);
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
                      marketName: e.target.value != "",
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
                      description: e.target.value != "",
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
                    className="select select-bordered w-full max-w-xs mx-4 border-primary"
                  >
                    <option disabled selected>
                      {t("chooseCategore")}{" "}
                    </option>
                    {options.map((msg, i) => {
                      return (
                        <option key={i} value={i + 1}>
                          {msg.label}
                        </option>
                      );
                    })}
                  </select>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col gap-8 mt-8 p-4 rounded-md my-4">
              <div className="flex gap-4 md:flex-col ">
                <SimpleInput
                  className={"shadow-md rounded-md"}
                  type="date"
                  title={t("startDate")}
                  isValid={validate.start_date}
                  validationError={t("required")}
                  onChange={(e) => {
                    setValues((prev) => ({ ...prev, start_date: e.value }));
                    setValidate((prev) => ({ ...prev, start_date: e.value != "" }));
                  }}
                  defaultValue={null}
                  disabled={false}
                />

                <SimpleInput
                  className={"shadow-md rounded-md"}
                  type="date"
                  title={t("endDate")}
                  isValid={validate.end_date}
                  validationError={t("required")}
                  onChange={(e) => {
                    setValues((prev) => ({ ...prev, end_date: e.value }));
                    setValidate((prev) => ({ ...prev, end_date: e.value != "" }));
                  }}
                  defaultValue={null}
                  disabled={false}
                />
              </div>
              <div className="w-full mx-auto flex gap-4 md:w-full">
                <SimpleInput
                  className={"shadow-md rounded-md"}
                  type="date"
                  title={t("deadLine")}
                  isValid={validate.application_deadline}
                  validationError={t("required")}
                  onChange={(e) => {
                    setValues((prev) => ({
                      ...prev,
                      application_deadline: e.value,
                    }));
                    setValidate((prev) => ({
                      ...prev,
                      application_deadline: e.value != "",
                    }));
                  }}
                  defaultValue={null}
                  disabled={false}
                />
                <SimpleInput
                  className={"shadow-md rounded-md"}
                  type="text"
                  title={t("commision")}
                  onChange={(e) => {
                    const value = e.target.value;

                    // Use a regular expression to allow only numbers and restrict to a max of 2 digits
                    if (/^\d{0,2}$/.test(value)) {
                      setValues((prev) => ({
                        ...prev,
                        commision: value,
                      }));

                      // Validate if the number is within 0 and 99
                      setValidate((prev) => ({
                        ...prev,
                        commision: value !== "" && Number(value) <= 99,
                      }));
                    }
                  }}
                  value={values.commision || ""}
                  disabled={false}
                />

              </div>
            </div>
            <div className="flex flex-col gap-4 p-4 rounded-md">
              <div
                className={`border-[1px] w-1/2 mx-auto rounded-full px-3 py-1 cursor-pointer text-center transition-all ${ticket ? "border-green-500 text-green-600 bg-green-50" : "border-red-600 text-red-700 bg-red-50"}`}
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
              ) : (
                ""
              )}

              <div className="w-full flex sm:flex-col justify-end items-center gap-4">
                <a href="/privacy-policy" className="text-gray-400 hover:text-gray-500 hover:bg-gray-50 px-2 py-1 transition-all duration-100 font-b2 rounded-md">
                  {t("policy")}
                </a>
                <div className={`cursor-pointer rounded-full flex items-center gap-3 ${!isChecekd ? "hover:bg-rose-50  hover:scale-105 transition-all border-[1px] border-rose-400 text-rose-400" : "hover:bg-green-50 hover:scale-105 transition-all text-green-600 border-[1px] border-green-600"} transition-all px-3 py-2`} onClick={() => setIsChecekd((prev) => !prev)}>
                  <div className={`h-4 w-4 ${isChecekd ? "bg-green-600" : "bg-rose-50 border-[1px] border-rose-400"} rounded-full`} />
                  <div> {t("agreed")}</div>
                </div>
                <BorderButton onClick={() => handleSubmit()} className="font-b4 text-center" disabled={!isChecekd || values.marketName == false || values.start_date == false || values.end_date == false || values.description == false || values.application_deadline == false || profileImage == null}>
                  { }
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
