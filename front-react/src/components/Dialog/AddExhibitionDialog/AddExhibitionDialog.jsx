import { Dialog } from "primereact/dialog";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import BorderButton from "../../Buttons/BorderButton";
import axios from "axios";
import SimpleInput from "../../Inputs/SimpleInput";
import { Notify } from "notiflix";
import { Block } from "notiflix";

const AddExhibitionDialog = ({ user, nfts = [], description, exhibition }) => {
  const [visible, setVisible] = useState(false);
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
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.value);
  };
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
          ticket: ticket,
          ticketPrice: ticket ? ticketPrice : 0,
          application_deadline: values.application_deadline,
          category: selectedCategory,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
        }
      )
      .then((res) => {
        setVisible(false);
        Notify.success("نمایشگاه با موفقت افزوده شد");
        window.location.reload(true);
      })
      .catch(() => {
        Notify.failure("خطا");
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
        console.log("_____________________");
        console.log("categories");
        console.log(res.data);
        console.log("_____________________");
        setCtegories(res.data);
      });
  }, []);
  useEffect(() => {
    if (profileImage) {
      Block.circle("#exhibitionImage");

      Notify.info("در حال آپلود عکس");
      const formData = new FormData();
      formData.append("image", profileImage, profileImage.name);
      axios
        .post("https://api.artina.org/api/transaction/images/", formData)
        .then((res) => {
          Notify.success("با موفقیت آپلود شد");
          setProfileImageUrl(res.data.image);
          Block.remove("#exhibitionImage", 3000);
        })
        .catch((res) => {
          Notify.failure("خطا در آپلود");
          console.log(res);
          Block.remove("#exhibitionImage", 3000);
        });
    }
  }, [profileImage]);

  const Footer = (
    <div className="flex gap-5 justify-end">
      <BorderButton onClick={() => setVisible(false)} className="font-b4 text-center">
        لغو
      </BorderButton>
      <BorderButton onClick={() => handleSubmit()} className="font-b4 text-center" disabled={!isChecekd}>
        ثبت
      </BorderButton>
      {/* <BorderButton
        className={"w-full font-b4 text-center"}
       
      >
        شارژ کیف پول
      </BorderButton> */}
    </div>
  );

  const Header = (
    <div>
      <p className="font-b9">افزودن نمایشگاه</p>
    </div>
  );

  return (
    <div className="card flex justify-content-center">
      <Dialog header={Header} visible={visible} style={{ direction: "rtl" }} onHide={() => setVisible(false)} footer={Footer} className="w-[35%] lg:w-[70%] sm:w-[85%]">
        <div className="font-b4">
          <div className="w-full flex items-center justify-center">
            <div className="relative group items-center flex justify-center w-1/2" id="exhibitionImage">
              <img alt="" src={profileImageUrl ? profileImageUrl : `${"https://api.artina.org/static/images/No_Image_Available_SrUxrax.png"}`} className="pointer-events-none rounded-2xl overflow-hidden object-cover h-auto flex-shrink-0 w-full" />
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
          </div>
          <div className="flex flex-col gap-8 mt-8">
            <SimpleInput
              type="text"
              title="نام نمایشگاه"
              placeholder="مثلا: نمایشگاه تست"
              isValid={validate.marketName}
              validationError="نمی‌تواند خالی باشد"
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
              type="text"
              title="توضیحات نمایشگاه"
              placeholder="مثلا: نمایشگاه تست"
              isValid={validate.description}
              validationError="نمی‌تواند خالی باشد"
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

            <div className="flex flex-wrap gap-2">
              <div className="w-full">
                {options ? (
                  <select
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                    }}
                    className="select select-bordered w-full max-w-xs mx-4 border-primary"
                  >
                    <option disabled selected>
                      دسته بندی را انتخاب کنید
                    </option>
                    {options.map((msg, i) => {
                      return (
                        <option key={i} value={msg.label}>
                          {msg.label}
                        </option>
                      );
                    })}
                  </select>
                ) : null}
              </div>
            </div>

            <SimpleInput
              type="date"
              title="تاریخ شروع"
              isValid={validate.start_date}
              validationError="نمی‌تواند خالی باشد"
              onChange={(e) => {
                setValues((prev) => ({ ...prev, start_date: e.value }));
                setValidate((prev) => ({ ...prev, start_date: e.value != "" }));
              }}
              defaultValue={null}
              disabled={false}
            />

            <SimpleInput
              type="date"
              title="تاریخ پایان"
              isValid={validate.end_date}
              validationError="نمی‌تواند خالی باشد"
              onChange={(e) => {
                setValues((prev) => ({ ...prev, end_date: e.value }));
                setValidate((prev) => ({ ...prev, end_date: e.value != "" }));
              }}
              defaultValue={null}
              disabled={false}
            />

            <SimpleInput
              type="date"
              title=" آخرین مهلت ثبت نام"
              isValid={validate.application_deadline}
              validationError="نمی‌تواند خالی باشد"
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

            <div className={`border-[1px] rounded-full px-3 py-1 cursor-pointer text-center transition-all ${ticket ? "border-green-500 text-green-600 bg-green-50" : "border-red-600 text-red-700 bg-red-50"}`} onClick={() => setTicket((prev) => !prev)}>
              {ticket ? "تیکت دارد" : "تیکت ندارد"}
            </div>
            {ticket ? (
              <SimpleInput
                type="number"
                title=" قیمت تیکت"
                isValid={ticketPrice !== ""}
                validationError="نمی‌تواند خالی باشد"
                onChange={(e) => {
                  setTicketPrice(e.target.value);
                }}
                defaultValue={null}
                disabled={false}
              />
            ) : (
              ""
            )}

            <div className="w-full flex justify-end items-center gap-4">
              <a href="/privacy-policy" className="text-gray-400 hover:text-gray-500 hover:bg-gray-50 px-2 py-1 transition-all duration-100 font-b2 rounded-md">
                مشاهده قوانین و مقررات
              </a>
              <div className={`cursor-pointer rounded-full flex items-center gap-3 ${!isChecekd ? "hover:bg-rose-50  hover:scale-105 transition-all border-[1px] border-rose-400 text-rose-400" : "hover:bg-green-50 hover:scale-105 transition-all text-green-600 border-[1px] border-green-600"} transition-all px-3 py-2`} onClick={() => setIsChecekd((prev) => !prev)}>
                <div className={`h-4 w-4 ${isChecekd ? "bg-green-600" : "bg-rose-50 border-[1px] border-rose-400"} rounded-full`} />
                <div> با قوانین موافقم</div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default AddExhibitionDialog;
