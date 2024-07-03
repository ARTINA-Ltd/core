/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import SimpleInput from "../components/Inputs/SimpleInput";
import { UserContext } from "../App";
import { UserChangeContext } from "../App";

import TestLayout from "../Layouts/TestLayout";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import { Block, Notify } from "notiflix";
import BorderButton from "../components/Buttons/BorderButton";

function Profile() {
  const user = useContext(UserContext);
  const userChange = useContext(UserChangeContext);
  const [editBio, setEditBio] = useState();
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
    bio: user ? user.data.bio : "",
    postal_code: user ? user.data.postal_code : "",
  });

  const [validate, setValidate] = useState({
    first_name: false,
    last_name: false,
    national_code: false,
    birthdate: false,
    cell_number: false,
    phone_number: false,
    email: false,
    address: false,
    bio: false,
    postal_code: false,
  });

  const [counter, setCounter] = useState(10);
  const [counterPause, setCounterPause] = useState(true);

  const [profileImage, setProfileImage] = useState();
  const [profileImageUrl, setProfileImageUrl] = useState();
  const [nationalCardImage, setNationalCardImage] = useState();
  const [nationalCardImageUrl, setNationalCardImageUrl] = useState();

  const [shabaNumber, setShabaNumber] = useState();

  const [showPhoneValidate, setShowPhoneValidate] = useState(false);
  const [showEmailValidate, setShowEmailValidate] = useState(false);
  const [phoneVerificationCode, setPhoneVerificationCode] = useState();
  const [emailVerificationCode, setEmailVerificationCode] = useState();

  const [isPhoneDisabled, setIsPhoneDisabled] = useState(false);
  const [isEmailDisabled, setIsEmailDisabled] = useState(false);

  const [isPhoneVerified, setIsPhoneVerified] = useState();
  const [isEmailVerified, setIsEmailVerified] = useState();

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

  const handleSendEmailVerificationCode = () => {
    axios
      .post(
        "https://api.artina.org/api/account/email-verification-code/",
        {
          email: values.email,
          verification_code: emailVerificationCode,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
        }
      )
      .then((e) => {
        Notify.success("تایید شد");
        setIsEmailVerified(true);
      });
  };

  function hanldeClickPhone() {
    if (validation()) {
      setCounter(60);
      setCounterPause(false);
      setIsPhoneDisabled(true);
      setShowPhoneValidate(true);
      setTimeout((e) => {
        setIsPhoneDisabled(false);
        setCounterPause(true);
      }, 60000);
      var b_date;

      if (typeof values.birthdate !== "string") {
        b_date = values.birthdate;
      } else {
        b_date = values.birthdate != "" && values.birthdate != null ? new Date(values.birthdate.split("/")[2], values.birthdate.split("/")[1] - 1, values.birthdate.split("/")[0]) : "";
      }

      axios
        .put(
          // "https://api.artina.org/api/account/profile/",
          `https://api.artina.org/api/account/profile/${user ? user.data.id : ""}/`,
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
            bio: values.bio,
            postal_code: values.postal_code,
            national_card_picture: nationalCardImageUrl ? nationalCardImageUrl : user.data.national_card_picture,
            profile_picture: profileImageUrl ? profileImageUrl : user.data.profile_picture,
            shaba_number: shabaNumber,

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
            })
            .catch(() => {
              Notify.failure("شماره تکراری میباشد");
              setIsPhoneDisabled(false);
              setShowPhoneValidate(false);
              setCounterPause(true);
            });
        })
        .catch((e) => {
          Notify.failure("خطا");
        });
    }
  }

  function handleClickEmail() {
    if (validation()) {
      setCounter(60);
      setCounterPause(false);
      setIsEmailDisabled(true);
      setShowEmailValidate(true);
      setTimeout((e) => {
        setIsEmailDisabled(false);
        setCounterPause(true);
      }, 60000);
      var b_date;

      if (typeof values.birthdate !== "string") {
        b_date = values.birthdate;
      } else {
        b_date = values.birthdate != "" && values.birthdate != null ? new Date(values.birthdate.split("/")[2], values.birthdate.split("/")[1] - 1, values.birthdate.split("/")[0]) : "";
      }

      axios
        .put(
          `https://api.artina.org/api/account/profile/${user ? user.data.id : ""}/`,
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
            bio: values.bio,
            postal_code: values.postal_code,
            national_card_picture: nationalCardImageUrl ? nationalCardImageUrl : user.data.national_card_picture,
            profile_picture: profileImageUrl ? profileImageUrl : user.data.profile_picture,
            shaba_number: shabaNumber,
            email: values.email,
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
            .post(
              "https://api.artina.org/api/account/email-verification-code/email_verification/",
              {
                email: values.email,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
                },
              }
            )
            .then((e) => {
              userChange();

              Notify.success("ارسال شد");
            })
            .catch(() => {
              Notify.failure("ایمیل تکراری میباشد");
              setIsEmailDisabled(false);
              setShowEmailValidate(false);
              setCounterPause(true);
            });
        })
        .catch((e) => {
          Notify.failure("خطا");
        });
    }
  }

  function validation() {
    if (shabaNumber !== null) {
      if (shabaNumber.length === 24) {
        return true;
      } else {
        Notify.failure("شماره شبا بایستی 24 رقمی باشد");
        return false;
      }
    } else return true;
  }

  function UpdateInfo() {
    //
    if (validation()) {
      var b_date;
      if (typeof values.birthdate !== "string") {
        b_date = values.birthdate;
        console.log("IF", values.birthdate);
      } else {
        console.log("ELSE", values.birthdate);

        b_date = values.birthdate != "" && values.birthdate != null ? new Date(values.birthdate.split("/")[2], values.birthdate.split("/")[1] - 1, values.birthdate.split("/")[0]) : "";
      }
      axios
        .put(
          // "https://api.artina.org/api/account/profile/",
          `https://api.artina.org/api/account/profile/${user ? user.data.id : ""}/`,
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
            postal_code: values.postal_code,
            address: values.address,
            bio: values.bio,
            national_card_picture: nationalCardImageUrl ? nationalCardImageUrl : user.data.national_card_picture,
            profile_picture: profileImageUrl ? profileImageUrl : user.data.profile_picture,
            shaba_number: shabaNumber,

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
  }

  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  useEffect(() => {
    console.log(user);
    if (user && user.data) {
      setValues({
        ...values,
        first_name: user ? user.data.first_name : "",
        last_name: user ? user.data.last_name : "",
        national_code: user ? user.data.national_code : "",
        birthdate: user ? user.data.birthdate : "",
        address: user ? user.data.address : "",
        bio: user ? user.data.bio : "",
        postal_code: user ? user.data.postal_code : "",
        cell_number: user ? user.data.cell_number : "",
        phone_number: user ? user.data.phone_number : "",
        email: user ? user.data.email : "",
      });
      setEditBio(user?.data.bio === null);
      setValidate(values);
      if (user) {
        setShabaNumber(user ? user.data.shaba_number : null);
        setIsPhoneVerified(user ? user.data.phone_number_verified == true : null);
        setIsEmailVerified(user ? user.data.email_verified == true : null);
      }
    }
  }, [user]);

  useEffect(() => {
    if (nationalCardImage) {
      Block.circle("#nationalCardImage");

      Notify.info("در حال آپلود عکس");
      const formData = new FormData();
      formData.append("image", nationalCardImage, nationalCardImage.name);
      axios
        .post("https://api.artina.org/api/transaction/images/", formData)
        .then((res) => {
          Block.remove("#nationalCardImage", 3000);

          Notify.success("با موفقیت آپلود شد");
          setNationalCardImageUrl(res.data.image);
        })
        .catch(() => {
          Notify.failure("خطا در آپلود");
          Block.remove("#nationalCardImage", 3000);
        });
    }
  }, [nationalCardImage]);

  useEffect(() => {
    if (profileImage) {
      Block.circle("#profileImage");

      Notify.info("در حال آپلود عکس");
      const formData = new FormData();
      formData.append("image", profileImage, profileImage.name);
      axios
        .post("https://api.artina.org/api/transaction/images/", formData)
        .then((res) => {
          Notify.success("با موفقیت آپلود شد");
          setProfileImageUrl(res.data.image);
          Block.remove("#profileImage", 3000);
        })
        .catch(() => {
          Notify.failure("خطا در آپلود");

          Block.remove("#profileImage", 3000);
        });
    }
  }, [profileImage]);

  useEffect(() => {
    if (counter > 0 && !counterPause) {
      setTimeout(() => setCounter(counter - 1), 1000);
    }
  }, [counter]);

  return (
    <TestLayout connectWallet={false}>
      {user && (
        <div style={{ direction: "rtl" }} className="flex gap-5 items-start sm:flex-col">
          <SimpleCard className={"flex flex-col gap-4 bg-base-100 w-full"}>
            {user && user.data.role == "user_zero" ? <div className=" bg-red-50 text-red-500 py-2 text-center rounded-lg w-full">مشخصات شما هنوز احراز نشده است!</div> : <div className=" bg-success w-full text-success-content py-2 text-center rounded-lg">حساب کاربری شما احراز شده است .</div>}
            <div className="text-[24px] font-b9">اطلاعات شخصی</div>
            <div className="flex gap-4 items-center">
              <div className="flex-shrink-0 relative group rounded-full" id="profileImage">
                <img src={profileImageUrl ? profileImageUrl : `${user ? user.data.profile_picture : "https://i.pinimg.com/originals/66/b8/58/66b858099df3127e83cb1f1168f7a2c6.jpg"}`} className="pointer-events-none rounded-full overflow-hidden object-cover w-[200px] h-[200px] flex-shrink-0 sm:w-[120px] sm:h-[120px]" />
                <div className="group-hover:visible opacity-70 invisible cursor-pointer bg-gradient-to-b from-black to-[#00000050] w-[200px] h-[200px] absolute inset-0  items-center justify-center flex rounded-full" onClick={() => inputFile.current.click()}>
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
              <div className="flex w-full gap-4">
                <div className="w-full flex flex-col gap-4">
                  <div className="flex w-full gap-4 sm:flex-col">
                    <SimpleInput
                      type="text"
                      title="نام"
                      placeholder="مثلا: علیرضا"
                      isValid={validate.first_name}
                      validationError="نمی‌تواند خالی باشد"
                      onChange={(e) => {
                        setValues({ ...values, first_name: e.target.value });
                        setValidate({ ...validate, first_name: e.target.value != "" });
                      }}
                      defaultValue={user != null ? user.data.first_name : null}
                      disabled={user != null ? user.data.first_name != null : null}
                    />
                    <SimpleInput
                      type="text"
                      title="نام خانوادگی"
                      placeholder="مثلا: موسوی"
                      isValid={validate.last_name}
                      validationError="نمی‌تواند خالی باشد"
                      onChange={(e) => {
                        setValues({
                          ...values,
                          last_name: e.target.value,
                        });
                        setValidate({
                          ...validate,
                          last_name: e.target.value != "",
                        });
                      }}
                      defaultValue={user != null ? user.data.last_name : null}
                      disabled={user != null ? user.data.last_name != null : null}
                    />
                  </div>
                  <div className="flex gap-2 w-[50%]">
                    <SimpleInput
                      className={""}
                      type="text"
                      title="درباره من"
                      isValid={validate.bio}
                      validationError="نمی‌تواند خالی باشد"
                      disabled={!editBio}
                      onChange={(e) => {
                        setValues({ ...values, bio: e.target.value });
                        setValidate({ ...validate, bio: e.target.value != "" });
                      }}
                      defaultValue={user != null ? user.data.bio : null}
                    />
                    <button onClick={() => setEditBio(true)}>
                      <FaRegEdit className="text-primary text-xl hover:text-secondary ease-in-out duration-200" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-[232px] sm:gap-4">
              <SimpleInput
                type="number"
                title="کد ملی"
                placeholder="مثلا: 1234567890"
                validationError="کدملی بایستی 10 رقمی باشد"
                isValid={validate.national_code}
                onChange={(e) => {
                  console.log(values);
                  setValues({
                    ...values,
                    national_code: e.target.value,
                  });
                  setValidate({
                    ...validate,
                    national_code: e.target.value !== null ? e.target.value.length == 10 : false,
                  });
                }}
                defaultValue={user != null ? user.data.national_code : null}
                disabled={user != null ? user.data.national_code != null : false}
                maxChars={10}
              />
              <SimpleInput
                type="date"
                title="تاریخ تولد"
                placeholder="مثلا: 1375/06/11"
                validationError="نمی‌تواند خالی باشد"
                isValid={validate.birthdate}
                onChange={(e) => {
                  setValues({ ...values, birthdate: e.value });
                }}
                defaultValue={user != null ? user.data.birthdate : null}
                disabled={user != null ? user.data.birthdate != null : null}
              />
            </div>
            <div className="flex gap-[232px] sm:gap-4">
              <SimpleInput
                type="text"
                title="آدرس"
                placeholder="مثلا: تهران ..."
                isValid={validate.address}
                validationError="نمی‌تواند خالی باشد"
                onChange={(e) => {
                  setValues({ ...values, address: e.target.value });
                  setValidate({
                    ...validate,
                    address: e.target.value != "",
                  });
                }}
                defaultValue={user != null ? user.data.address : null}
                disabled={user != null ? user.data.address != null : null}
              />
              <SimpleInput
                type="number"
                ltr={true}
                title="کد پستی"
                placeholder="مثلا: 3521 ..."
                هس
                onChange={(e) => {
                  setValues({ ...values, postal_code: e.target.value });
                  setValidate({ ...validate, postal_code: e.target.value != "" });
                }}
                defaultValue={user != null ? user.data.postal_code : null}
                disabled={user != null ? user.data.postal_code != null : null}
                maxChars={10}
              />
            </div>
            <div className="flex gap-4">
              <SimpleInput
                type="number"
                title="شماره ثابت"
                placeholder="02112345678"
                isValid={validate.cell_number}
                validationError="نمی‌تواند خالی باشد"
                onChange={(e) => {
                  setValues({ ...values, cell_number: e.target.value });
                  setValidate({ ...validate, cell_number: e.target.value !== null ? e.target.value.length == 11 : false });
                }}
                defaultValue={user != null ? user.data.cell_number : null}
                disabled={user != null ? user.data.cell_number != null : null}
                maxChars={11}
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
                validationError="نمی‌تواند خالی باشد"
                onChange={(e) => {
                  setValues({ ...values, phone_number: e.target.value });
                  setValidate({ ...validate, phone_number: e.target.value !== null ? e.target.value.length == 11 : false });
                }}
                defaultValue={user != null ? user.data.phone_number : null}
                disabled={user.data.phone_number != null}
                maxChars={11}
              />
              <div className={`${showPhoneValidate && !isPhoneVerified ? "" : "hidden"}`}>
                <SimpleInput
                  type="number"
                  title="کد "
                  placeholder="1234"
                  onChange={
                    (e) => setPhoneVerificationCode(e.target.value) // isValid={}
                  }
                  defaultValue={null}
                />
              </div>
              {!user.data.phone_number && (
                <div className={`transition-all w-1/2 shrink-0 ${isPhoneVerified ? "hidden" : "flex gap-4 "}`}>
                  <div className={`w-1/3 ${!showPhoneValidate ? "hidden" : "bg-sky-400 cursor-pointer hover:bg-sky-500 w-full text-nowrap px-10 rounded-lg transition-all  text-white text-[14px] flex items-center justify-center"} `} onClick={handleSendPhoneVerificationCode}>
                    ثبت
                  </div>
                  <div className={`w-1/3  ${isPhoneDisabled ? "bg-primary cursor-not-allowed hover:bg-[#372fac]" : "bg-[#372fac] cursor-pointer"} w-full text-nowrap flex-nowrap whitespace-nowrap px-10 rounded-lg transition-all  text-white text-[14px] flex items-center justify-center`} onClick={() => (!isPhoneDisabled ? hanldeClickPhone() : "")}>
                    {isPhoneDisabled ? `ارسال مجدد کد (${counter})` : "ارسال کد"}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <SimpleInput
                type="text"
                title="ایمیل"
                placeholder="mail@domain.com"
                isValid={ValidateEmail(values.email)}
                validationError="نمی‌تواند خالی باشد"
                onChange={(e) => {
                  setValues({ ...values, email: e.target.value });
                  setValidate({ ...validate, email: e.target.value !== null ? e.target.value.length == 11 : false });
                }}
                defaultValue={user != null ? user.data.email : null}
                disabled={user.data.email != null}
                maxChars={30}
              />
              <div className={`${showEmailValidate && !isEmailVerified ? "" : "hidden"}`}>
                <SimpleInput
                  type="number"
                  title="کد "
                  placeholder="1234"
                  onChange={
                    (e) => setEmailVerificationCode(e.target.value) // isValid={}
                  }
                  defaultValue={null}
                />
              </div>
              {user.data.email == null && (
                <div className={`transition-all w-1/2 shrink-0 ${isEmailVerified ? "hidden" : "flex gap-4 "}`}>
                  <div className={`w-1/3 ${!showEmailValidate ? "hidden" : "bg-sky-400 cursor-pointer hover:bg-sky-500 w-full text-nowrap px-10 rounded-lg transition-all  text-white text-[14px] flex items-center justify-center"} `} onClick={handleSendEmailVerificationCode}>
                    ثبت
                  </div>
                  <div className={`w-1/3  ${isEmailDisabled ? "bg-primary cursor-not-allowed hover:bg-[#372fac]" : "bg-[#372fac] cursor-pointer"} w-full text-nowrap flex-nowrap whitespace-nowrap px-10 rounded-lg transition-all  text-white text-[14px] flex items-center justify-center`} onClick={() => (!isEmailDisabled ? handleClickEmail() : "")}>
                    {isEmailDisabled ? `ارسال مجدد کد (${counter})` : "ارسال کد"}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <BorderButton onClick={() => UpdateInfo()}>ثبت</BorderButton>
            </div>
          </SimpleCard>
          <div className="flex flex-col gap-4 items-center justify-center w-[35%] relative sm:w-full">
            <SimpleCard className="bg-primary flex flex-col relative gap-4 items-center overflow-hidden w-full">
              <div className="text-white text-[27px] mb-2 z-10 font-b9 sm:text-[20px]">آپلود فرم احراز هویت</div>
              <BorderButton className={"text-white border-white"} onClick={() => window.open("http://api.artina.org/static/pdfs/Form-new-version.pdf")}>
                متن احراز هویت
              </BorderButton>
              <div className="flex justify-center z-10 group relative w-full h-auto rounded-2xl" id="nationalCardImage">
                <img src={nationalCardImageUrl ? nationalCardImageUrl : `${user ? user.data.national_card_picture : "/5.png"}`} className="w-auto h-auto rounded-2xl" />
                <div className="bg-gradient-to-b from-black to-[#00000050] w-full h-full absolute rounded-2xl opacity-70 flex items-center justify-center group-hover:visible invisible cursor-pointer" onClick={() => inputFileNC.current.click()}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="0.5" stroke="currentColor" className="text-white " width="3em">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                  </svg>
                </div>
                <input hidden accept="image/*" type="file" onChange={(e) => setNationalCardImage(() => e.target.files[0])} ref={inputFileNC} />
              </div>
            </SimpleCard>

            <SimpleCard className="bg-primary flex flex-col relative text-white gap-4 items-center overflow-hidden w-full">
              <div className="text-white text-[27px] mb-2 z-10 font-b9">اطلاعات کارت بانکی</div>
              <div className="font-b3">شماره شبا</div>
              <div className="flex items-center gap-5 w-full py-2 px-2" dir="ltr">
                <div className="pt-2">IR </div>

                <SimpleInput defaultValue={user && user.data ? user.data.shaba_number : null} disabled={user && user.data != null ? user.data.shaba_number != null : false} title={""} type="number" onChange={(e) => setShabaNumber(e.target.value)} className="border-none text-white" maxChars={24} />
              </div>
            </SimpleCard>
          </div>
        </div>
      )}
    </TestLayout>
  );
}
export default Profile;
