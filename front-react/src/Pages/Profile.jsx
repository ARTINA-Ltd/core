import React, { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import "../ProfilePage/Personalinfo.css";

import { useNavigate } from "react-router";
import {
  Show404Errors,
  Show500Errors,
  ShowNetorkErrors,
  ShowTokenErrors,
} from "../components/ErrorDialogs/ShowErrors";
import { Toast } from "primereact/toast";
import SimpleInput from "../components/Inputs/SimpleInput";
import { UserContext } from "../App";
import TestLayout from "../Layouts/TestLayout";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import { Button, IconButton } from "@mui/material";
import { Notify } from "notiflix";

function Profile() {
  const user = useContext(UserContext);

  const [formValues, setformValues] = useState({
    first_name: user ? user.data.first_name : "",
    last_name: user ? user.data.last_name : "",
    national_code: user ? user.data.national_code : "",
    birthdate: user ? user.data.birthdate : "",
    cell_number: user ? user.data.cell_number : "",
    phone_number: user ? user.data.phone_number : "",
    email: user ? user.data.email : "",
    address: user ? user.data.address : "",
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
      .post("https://api.artina.org/api/account/phone-verification/", {
        phone_number: formValues.phone_number,
        verification_code: phoneVerificationCode,
      })
      .then((e) => {
        Notify.success("تایید شد");
      });
  };
  function hanldeClickPhone() {
    setCounter(60);
    setCounterPause(false);
    setIsPhoneDisabled(true);
    setShowPhoneValidate(true);
    setTimeout((e) => {
      setIsPhoneDisabled(false);
      setCounterPause(true);
    }, 60000);
    axios
      .post("https://api.artina.org/api/account/send-verification-code/", {
        phone_number: formValues.phone_number,
        username: user.data.username,
      })
      .then((e) => {
        Notify.success("ارسال شد");
      });
  }

  function UpdateInfo() {
    console.log(user);
    axios
      .patch(
        // "https://api.artina.org/api/account/profile/",
        `https://api.artina.org/api/account/profile/${
          user ? user.data.id : ""
        }/`,
        {
          user: user ? user.data.id : "",
          first_name: formValues.first_name,
          last_name: formValues.last_name,
          national_code: formValues.national_code,
          birthdate: formValues.birthdate,
          phone_number: formValues.phone_number,
          phone_number_verified: false,
          cell_number: formValues.cell_number,
          address: formValues.address,
          national_card_picture: nationalCardImageUrl
            ? nationalCardImageUrl
            : user.data.profile_picture,
          profile_picture: profileImageUrl
            ? profileImageUrl
            : user.data.profile_picture,
          email_verified: false,
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
        console.log(res);
      })
      .catch((e) => {
        Notify.failure("خطا");
        console.log(e);
      });
  }

  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  useEffect(() => {
    setformValues((prev) => ({
      ...prev,
      first_name: user ? user.data.username : "",
      last_name: user ? user.data.last_name : "",
      national_code: user ? user.data.national_code : "",
      birthdate: user ? user.data.birthdate : "",
      address: user ? user.data.address : "",
      cell_number: user ? user.data.cell_number : "",
      phone_number: user ? user.data.phone_number : "",
      email: user ? user.data.email : "",
    }));
    if (user) {
      user.data.phone_number !== null
        ? setIsPhoneVerified(true)
        : setIsPhoneVerified(false);
    }
  }, [user]);

  useEffect(() => {
    if (nationalCardImage) {
      Notify.info("در حال آپلود عکس");
      const formData = new FormData();
      formData.append("image", nationalCardImage, nationalCardImage.name);
      console.log(nationalCardImage);
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
      console.log(profileImage);
      axios
        .post("https://api.artina.org/api/transaction/images/", formData)
        .then((res) => {
          Notify.success("با موفقیت آپلود شد");
          setProfileImageUrl(res.data.image);
          console.log(res.data.image);
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
      <div className="flex gap-16 items-start flex-col lg:flex-row">
        <SimpleCard className="bg-[#4e45d0] flex flex-col relative gap-12 items-center overflow-hidden w-[100%] lg:w-[45%]">
          <img
            src="/mand1.png"
            className=" opacity-[35%] absolute top-1/2 -translate-y-1/2 pointer-events-none overflow-hidden"
          />
          <div className="text-white text-[32px] mb-4 z-10">پروفایل کاربری</div>
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
            className="pointer-events-none w-[16vw] h-[16vw] my-8 rounded-full overflow-hidden object-cover z-10"
          />

          <div className="mb-6 ">
            <Button variant="contained" component="label">
              انتخاب تصویر
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={(e) => {
                  setProfileImage(() => e.target.files[0]);
                }}
              />
            </Button>
            {/* <Profileuploader /> */}
            {/* <IDUpdate /> */}
          </div>
        </SimpleCard>
        <SimpleCard className={"flex flex-col gap-12 bg-white w-full"}>
          <div className="text-[24px]">اطلاعات شخصی</div>
          <div className="flex gap-12">
            <SimpleInput
              type="text"
              title="نام"
              placeholder="مثلا: علیرضا"
              isValid={formValues.first_name != ""}
              validationError="نمیتواند خالی باشد"
              onChange={(e) =>
                setformValues((prev) => ({
                  ...prev,
                  first_name: e.target.value,
                }))
              }
              defaultValue={user != null ? user.data.first_name : null}
            />
            <SimpleInput
              type="text"
              title="نام خانوادگی"
              placeholder="مثلا: موسوی"
              isValid={formValues.last_name != ""}
              validationError="نمیتواند خالی باشد"
              onChange={(e) =>
                setformValues((prev) => ({
                  ...prev,
                  last_name: e.target.value,
                }))
              }
              defaultValue={user != null ? user.data.last_name : null}
              disabled={user != null ? user.data.last_name != null : null}
            />
          </div>
          <div className="flex gap-12">
            <SimpleInput
              type="text"
              title="کد ملی"
              placeholder="مثلا: 1234567890"
              validationError="نمیتواند خالی باشد"
              onChange={(e) =>
                setformValues(
                  // isValid={formValues.national_code.length == 10}
                  (prev) => ({ ...prev, national_code: e.target.value })
                )
              }
              defaultValue={user != null ? user.data.national_code : null}
              disabled={user != null ? user.data.national_code != null : null}
            />
            <SimpleInput
              type="text"
              title="تاریخ تولد"
              placeholder="مثلا: 1375/06/11"
              validationError="نمیتواند خالی باشد"
              onChange={(e) =>
                setformValues(
                  // isValid={formValues.birthdate.length == 10}
                  (prev) => ({ ...prev, birthdate: e.target.value })
                )
              }
              defaultValue={user != null ? user.data.birthdate : null}
              disabled={user != null ? user.data.birthdate != null : null}
            />
            <SimpleInput
              type="text"
              title="شماره ثابت"
              placeholder="02112345678"
              isValid={formValues.cell_number === 11}
              validationError="نمیتواند خالی باشد"
              onChange={(e) =>
                setformValues((prev) => ({
                  ...prev,
                  cell_number: e.target.value,
                }))
              }
              defaultValue={user != null ? user.data.cell_number : null}
              disabled={user != null ? user.data.cell_number != null : null}
            />
          </div>
          <div>
            <SimpleInput
              type="text"
              title="آدرس"
              placeholder="مثلا: تهران ..."
              isValid={formValues.address != "" && formValues.address != null}
              validationError="نمیتواند خالی باشد"
              onChange={(e) =>
                setformValues((prev) => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
              defaultValue={user != null ? user.data.address : null}
              disabled={user != null ? user.data.address != null : null}
            />
          </div>
          <hr className="opacity-[5%] mt-5" />
          <div className="text-[24px]">احراز هویت</div>
          <div className="flex gap-12">
            <SimpleInput
              type="text"
              title="شماره موبایل"
              placeholder="09123456789"
              isValid={formValues.phone_number === 11}
              validationError="نمیتواند خالی باشد"
              onChange={(e) =>
                setformValues((prev) => ({
                  ...prev,
                  phone_number: e.target.value,
                }))
              }
              defaultValue={user != null ? user.data.phone_number : null}
              disabled={user != null ? user.data.phone_number != null : null}
            />
            <div className={`${showPhoneValidate ? "" : "hidden"}`}>
              <SimpleInput
                type="text"
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
                isPhoneVerified ? "hidden" : "flex gap-12 "
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

          <div className="flex gap-12">
            <div className=" w-full">
              <SimpleInput
                type="text"
                title="ایمیل "
                placeholder="09123456789"
                isValid={ValidateEmail(formValues.email)}
                validationError="نمیتواند خالی باشد"
                onChange={(e) =>
                  setformValues((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                defaultValue={user != null ? user.data.email : null}
                disabled={user != null ? user.data.email != null : null}
              />
            </div>

            {/* <div className="flex gap-12 transition-all w-full">
              <div className={`w-full ${showEmailValidate ? "" : "hidden"}`}>
                <SimpleInput
                  type="text"
                  title="کد "
                  placeholder="1234"
                  isValid={ValidateEmail(formValues.email)}
                  validationError="نمیتواند خالی باشد"
                  onChange={e =>
                    setformValues(prev => ({
                      ...prev,
                      email: e.target.value,
                    }))}
                  defaultValue={user != null ? user.data.email : null}
                  disabled={user != null ? user.data.email != null : null}
                />
              </div>
              <div
                className={`w-full ${!showEmailValidate
                  ? "hidden"
                  : "bg-sky-400 cursor-pointer hover:bg-sky-500 w-full text-nowrap px-10 rounded-lg transition-all  text-white text-[14px] flex items-center justify-center"} `}
                onClick={() => {}}
              >
                ثبت
              </div>
              <div
                className={`w-full ${isEmailDisabled
                  ? "bg-rose-800 cursor-not-allowed hover:bg-rose-900"
                  : "bg-rose-500 cursor-pointer hover:bg-rose-600"} w-full text-nowrap px-10 rounded-lg transition-all  text-white text-[14px] flex items-center justify-center`}
                onClick={() => hanldeClickEmail()}
              >
                {showEmailValidate ? "ارسال مجدد کد" : "ارسال کد"}
              </div>
            </div> */}
          </div>
          <div className="flex gap-12" />
          <hr className="opacity-[5%] mt-5" />
          <div className="text-[24px]">اطلاعات حساب کاربری</div>
          <div className="flex gap-12">
            <div className="text-[14px] bg-rose-500 px-10 w-full py-5 rounded-lg text-white">
              امتیاز در سایت: 5700
            </div>
            <div className="text-[14px] bg-yellow-500 w-full py-5 rounded-lg text-white">
              نوع کاربر: طلایی
            </div>
          </div>
          <div className="flex justify-center">
            <Button variant="contained" component="label">
              انتخاب تصویر کارت ملی
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={(e) => setNationalCardImage(() => e.target.files[0])}
              />
            </Button>
          </div>
          <div className="flex justify-center ">
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
              className="w-[500px] h-[350px]"
            />
          </div>

          {/* <div className="flex justify-center">
            <div className="text-[14px] bg-gradient-to-r from-lime-400 to-lime-500 w-[40%] py-5 rounded-2xl h-96 flex flex-col items-center justify-center">
              <div className="text-[24px]">6063 7373 5689 8569</div>
              <div className="text-[14px] mt-6">شبا</div>
              <div className="text-[20px]">
                IR18 - 1231265874484659859629291
              </div>
            </div>
          </div> */}
          <div className="flex justify-end">
            <div
              className=" text-white text-[14px] bg-[#4e45d0] py-5 px-[6rem] rounded-lg cursor-pointer transition-all hover:bg-[#372fac]"
              onClick={() => UpdateInfo()}
            >
              ویرایش
            </div>
          </div>
        </SimpleCard>
      </div>
    </TestLayout>
  );
}
export default Profile;
