import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";

import SimpleInput from "../components/Inputs/SimpleInput";
import { UserContext } from "../App";
import { UserChangeContext } from "../App";

import TestLayout from "../Layouts/TestLayout";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import { Button } from "@mui/material";
import { Notify } from "notiflix";
import BorderButton from "../components/Buttons/BorderButton";

function Profile() {
  const user = useContext(UserContext);
  const userChange = useContext(UserChangeContext);

  const inputFile = useRef(null);
  const inputFileNC = useRef(null);

  const [values, setValues] = useState({
    first_name: user ? user.data.first_name : "",
    last_name: user ? user.data.last_name : "",
    national_code: user ? user.data.national_code : "",
    birthdate: user ? user.data.birthdate : "",
    cell_number: user ? user.data.cell_number : "",
    phone_number: user ? user.data.phone_number : "",
    email: user ? user.data.email : "",
    address: user ? user.data.address : "",
  });

  const [validate, setValidate] = useState({
    first_name: true,
    last_name: true,
    national_code: true,
    birthdate: true,
    cell_number: true,
    phone_number: true,
    email: true,
    address: true,
  });

  const [counter, setCounter] = useState(10);
  const [counterPause, setCounterPause] = useState(true);

  const [profileImage, setProfileImage] = useState();
  const [profileImageUrl, setProfileImageUrl] = useState();
  const [nationalCardImage, setNationalCardImage] = useState();
  const [nationalCardImageUrl, setNationalCardImageUrl] = useState();

  const [showPhoneValidate, setShowPhoneValidate] = useState(false);
  const [showEmailValidate, setShowEmailValidate] = useState(false);
  const [phoneVerificationCode, setPhoneVerificationCode] = useState();

  const [isPhoneDisabled, setIsPhoneDisabled] = useState(false);
  const [isEmailDisabled, setIsEmailDisabled] = useState(false);

  const [isPhoneVerified, setIsPhoneVerified] = useState();

  function hanldeClickEmail() {
    setIsEmailDisabled(true);
    setShowEmailValidate(true);
    setTimeout(() => {
      setIsEmailDisabled(false);
    }, 10000);
  }

  const handleSendPhoneVerificationCode = () => {
    axios
      .post(
        "https://api.artina.org/api/account/phone-verification/",
        {
          phone_number: values.phone_number,
          verification_code: phoneVerificationCode,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
        }
      )
      .then((e) => {
        Notify.success("تایید شد");
        setIsPhoneVerified(true);
      });
  };
  function hanldeClickPhone() {
  UpdateInfo();            
    setCounter(60);
    setCounterPause(false);
    setIsPhoneDisabled(true);
    setShowPhoneValidate(true);
    setTimeout((e) => {
      setIsPhoneDisabled(false);
      setCounterPause(true);
    }, 60000);
    var b_date;

    if (typeof values.birthdate === "string") {
      b_date =
        values.birthdate != "" && values.birthdate != null
          ? new Date(
              values.birthdate.split("/")[2],
              values.birthdate.split("/")[1] - 1,
              values.birthdate.split("/")[0]
            )
          : "";
    } else b_date = values.birthdate;

    axios
      .put(
        // "https://api.artina.org/api/account/profile/",
        `https://api.artina.org/api/account/profile/${
          user ? user.data.id : ""
        }/`,
        {
          user: user ? user.data.id : "",
          first_name: values.first_name,
          last_name: values.last_name,
          national_code: values.national_code,
          birthdate:
            b_date != ""
              ? Intl.DateTimeFormat("en-UK", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                }).format(b_date)
              : null,
          phone_number: values.phone_number,
          cell_number: values.cell_number,
          address: values.address,
          national_card_picture: nationalCardImageUrl
            ? nationalCardImageUrl
            : user.data.national_card_picture,
          profile_picture: profileImageUrl
            ? profileImageUrl
            : user.data.profile_picture,
          // role: user ? user.data.role : ""
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
        }
      )
      .then((res) => {
        Notify.success("اطلاعات با موفقیت به روز رسانی شد");
        axios
          .post("https://api.artina.org/api/account/send-verification-code/", {
            phone_number: values.phone_number,
            username: user.data.username,
          })
          .then((e) => {
            userChange();

            Notify.success("ارسال شد");
          });
      })
      .catch((e) => {
        Notify.failure("خطا");
      });
  }

  function UpdateInfo() {
   var b_date;
    if (typeof values.birthdate === "string") {
      b_date =
        values.birthdate != "" && values.birthdate != null
          ? new Date(
              values.birthdate.split("/")[2],
              values.birthdate.split("/")[1] - 1,
              values.birthdate.split("/")[0]
            )
          : "";
    } else b_date = values.birthdate;

    axios
      .put(
        // "https://api.artina.org/api/account/profile/",
        `https://api.artina.org/api/account/profile/${
          user ? user.data.id : ""
        }/`,
        {
          user: user ? user.data.id : "",
          first_name: values.first_name,
          last_name: values.last_name,
          national_code: values.national_code,
          birthdate:
            b_date != ""
              ? Intl.DateTimeFormat("en-UK", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                }).format(b_date)
              : null,
          phone_number: values.phone_number,
          cell_number: values.cell_number,
          address: values.address,
          national_card_picture: nationalCardImageUrl
            ? nationalCardImageUrl
            : user.data.national_card_picture,
          profile_picture: profileImageUrl
            ? profileImageUrl
            : user.data.profile_picture,
          // role: user ? user.data.role : ""
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
        }
      )
      .then((res) => {
        Notify.success("اطلاعات با موفقیت به روز رسانی شد");
        userChange();
      })
      .catch((e) => {
        Notify.failure("خطا");
      });
  }

  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  useEffect(() => {
    setValues((prev) => ({
      ...prev,
      first_name: user ? user.data.first_name : "",
      last_name: user ? user.data.last_name : "",
      national_code: user ? user.data.national_code : "",
      birthdate: user ? user.data.birthdate : "",
      address: user ? user.data.address : "",
      cell_number: user ? user.data.cell_number : "",
      phone_number: user ? user.data.phone_number : "",
      email: user ? user.data.email : "",
    }));
    if (user) {
      setIsPhoneVerified(user.data.phone_number_verified == true);
    }
  }, [user]);

  useEffect(() => {
    if (nationalCardImage) {
      Notify.info("در حال آپلود عکس");
      const formData = new FormData();
      formData.append("image", nationalCardImage, nationalCardImage.name);
      axios
        .post("https://api.artina.org/api/transaction/images/", formData)
        .then((res) => {
          Notify.success("با موفقیت آپلود شد");
          setNationalCardImageUrl(res.data.image);
        })
        .catch(() => Notify.failure("خطا در آپلود"));
    }
  }, [nationalCardImage]);

  useEffect(() => {
    if (profileImage) {
      Notify.info("در حال آپلود عکس");
      const formData = new FormData();
      formData.append("image", profileImage, profileImage.name);
      axios
        .post("https://api.artina.org/api/transaction/images/", formData)
        .then((res) => {
          Notify.success("با موفقیت آپلود شد");
          setProfileImageUrl(res.data.image);
        })
        .catch(() => Notify.failure("خطا در آپلود"));
    }
  }, [profileImage]);

  useEffect(() => {
    if (counter > 0 && !counterPause) {
      setTimeout(() => setCounter(counter - 1), 1000);
    }
  }, [counter]);

  return (
    <TestLayout connectWallet={false}>
      <div className="flex gap-5 items-start ">
        <SimpleCard className={"flex flex-col gap-4 bg-white w-full"}>
          <div className="text-[24px] font-b9">اطلاعات شخصی</div>
          <div className="flex gap-4 items-center">
            <div className="flex-shrink-0 relative group">
              <img
                src={
                  profileImageUrl
                    ? profileImageUrl
                    : `${
                        user
                          ? user.data.profile_picture
                          : "https://i.pinimg.com/originals/66/b8/58/66b858099df3127e83cb1f1168f7a2c6.jpg"
                      }`
                }
                className="pointer-events-none rounded-full overflow-hidden object-cover w-[200px] h-[200px] flex-shrink-0"
              />
              <div
                className="group-hover:visible opacity-70 invisible cursor-pointer bg-gradient-to-b from-black to-[#00000050] w-[200px] h-[200px] absolute inset-0  items-center justify-center flex rounded-full"
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
                  setProfileImage(() => e.target.files[0]);
                }}
                ref={inputFile}
              />
            </div>
            <div className="flex w-full gap-4">
              <SimpleInput
                type="text"
                title="نام"
                placeholder="مثلا: علیرضا"
                isValid={validate.first_name}
                validationError="نمیتواند خالی باشد"
                onChange={(e) => {
                  setValues((prev) => ({
                    ...prev,
                    first_name: e.target.value,
                  }));
                  setValidate((prev) => ({
                    ...prev,
                    first_name: e.target.value != "",
                  }));
                }}
                defaultValue={user != null ? user.data.first_name : null}
                disabled={user != null ? user.data.first_name != null : null}
              />
              <SimpleInput
                type="text"
                title="نام خانوادگی"
                placeholder="مثلا: موسوی"
                isValid={validate.last_name}
                validationError="نمیتواند خالی باشد"
                onChange={(e) => {
                  setValues((prev) => ({
                    ...prev,
                    last_name: e.target.value,
                  }));
                  setValidate((prev) => ({
                    ...prev,
                    last_name: e.target.value != "",
                  }));
                }}
                defaultValue={user != null ? user.data.last_name : null}
                disabled={user != null ? user.data.last_name != null : null}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <SimpleInput
              type="number"
              title="کد ملی"
              placeholder="مثلا: 1234567890"
              validationError="کدملی بایستی 10 رقمی باشد"
              isValid={validate.national_code}
              onChange={(e) => {
                setValues((prev) => ({
                  ...prev,
                  national_code: e.target.value,
                }));
                setValidate((prev) => ({
                  ...prev,
                  national_code: e.target.value.length == 10,
                }));
              }}
              defaultValue={user != null ? user.data.national_code : null}
              disabled={user != null ? user.data.national_code != null : false}
            />
            <SimpleInput
              type="date"
              title="تاریخ تولد"
              placeholder="مثلا: 1375/06/11"
              validationError="نمیتواند خالی باشد"
              isValid={validate.birthdate}
              onChange={(e) => {
                setValues((prev) => ({ ...prev, birthdate: e.value }));
              }}
              defaultValue={user != null ? user.data.birthdate : null}
              disabled={user != null ? user.data.birthdate != null : null}
            />
          </div>
          <div>
            <SimpleInput
              type="text"
              title="آدرس"
              placeholder="مثلا: تهران ..."
              isValid={validate.address}
              validationError="نمیتواند خالی باشد"
              onChange={(e) => {
                setValues((prev) => ({
                  ...prev,
                  address: e.target.value,
                }));
                setValidate((prev) => ({
                  ...prev,
                  address: e.target.value != "",
                }));
              }}
              defaultValue={user != null ? user.data.address : null}
              disabled={user != null ? user.data.address != null : null}
            />
          </div>
          <div className="flex gap-4">
            <SimpleInput
              type="text"
              title="شماره ثابت"
              placeholder="02112345678"
              isValid={validate.cell_number}
              validationError="نمیتواند خالی باشد"
              onChange={(e) => {
                setValues((prev) => ({
                  ...prev,
                  cell_number: e.target.value,
                }));
                setValidate((prev) => ({
                  ...prev,
                  cell_number: e.target.value.length == 11,
                }));
              }}
              defaultValue={user != null ? user.data.cell_number : null}
              disabled={user != null ? user.data.cell_number != null : null}
            />
          </div>

          <hr className="opacity-[5%] mt-5" />
          <div className="text-[24px] font-b9">احراز هویت</div>
          <div className="flex gap-4">
            <SimpleInput
              type="number"
              title="شماره موبایل"
              placeholder="09123456789"
              isValid={validate.phone_number}
              validationError="نمیتواند خالی باشد"
              onChange={(e) => {
                setValues((prev) => ({
                  ...prev,
                  phone_number: e.target.value,
                }));
                setValidate((prev) => ({
                  ...prev,
                  phone_number: e.target.value.length == 11,
                }));
              }}
              defaultValue={user != null ? user.data.phone_number : null}
              disabled={isPhoneVerified}
            />
            <div
              className={`${
                showPhoneValidate && !isPhoneVerified ? "" : "hidden"
              }`}
            >
              <SimpleInput
                type="number"
                title="کد "
                placeholder="1234"
                validationError="نمیتواند خالی باشد"
                onChange={
                  (e) => setPhoneVerificationCode(e.target.value) // isValid={}
                }
                defaultValue={null}
              />
            </div>
            <div
              className={`transition-all ${
                isPhoneVerified ? "hidden" : "flex gap-4 "
              }`}
            >
              <div
                className={`w-full ${
                  !showPhoneValidate
                    ? "hidden"
                    : "bg-sky-400 cursor-pointer hover:bg-sky-500 w-full text-nowrap px-10 rounded-lg transition-all  text-white text-[14px] flex items-center justify-center"
                } `}
                onClick={handleSendPhoneVerificationCode}
              >
                ثبت
              </div>
              <div
                className={`w-full ${
                  isPhoneDisabled
                    ? "bg-[#4e45d0] cursor-not-allowed hover:bg-[#372fac]"
                    : "bg-[#372fac] cursor-pointer"
                } w-full text-nowrap px-10 rounded-lg transition-all  text-white text-[14px] flex items-center justify-center`}
                onClick={() => (!isPhoneDisabled ? hanldeClickPhone() : "")}
              >
                {isPhoneDisabled ? `ارسال مجدد کد (${counter})` : "ارسال کد"}
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className=" w-full">
              <SimpleInput
                type="text"
                title="ایمیل "
                placeholder="09123456789"
                isValid={ValidateEmail(values.email)}
                validationError="نمیتواند خالی باشد"
                onChange={(e) =>
                  setValues((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                defaultValue={user != null ? user.data.email : null}
                disabled={user != null ? user.data.email != null : null}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <BorderButton onClick={() => UpdateInfo()}>ثبت</BorderButton>
          </div>
        </SimpleCard>
        <SimpleCard className="bg-[#4e45d0] flex flex-col relative gap-4 items-center overflow-hidden w-[35%]">
          <img
            src="/mand1.png"
            className=" opacity-[15%] absolute top-1/2 -translate-y-1/2 pointer-events-none overflow-hidden"
          />
          <div className="text-white text-[27px] mb-2 z-10 font-b9">
            اطلاعات حساب کاربری
          </div>
          <div className="text-white font-b3">تصویر کارت ملی </div>
          <div className="flex justify-center z-10 group relative w-full h-auto">
            <img
              src={
                nationalCardImageUrl
                  ? nationalCardImageUrl
                  : `${
                      user
                        ? user.data.national_card_picture
                        : "https://thumbs.dreamstime.com/b/id-card-white-background-business-identification-icon-identity-template-badge-personal-contact-78370022.jpg"
                    }`
              }
              className="w-auto h-auto rounded-2xl"
            />
            <div
              className="bg-gradient-to-b from-black to-[#00000050] w-full h-full absolute rounded-2xl opacity-70 flex items-center justify-center group-hover:visible invisible cursor-pointer"
              onClick={() => inputFileNC.current.click()}
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
              onChange={(e) => setNationalCardImage(() => e.target.files[0])}
              ref={inputFileNC}
            />
          </div>
        </SimpleCard>
      </div>
    </TestLayout>
  );
}
export default Profile;
