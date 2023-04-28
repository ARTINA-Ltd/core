import Image from "../ProfilePage/image";
import PersonalInfo from "../ProfilePage/PersonalInfo";
import Navbar from "../ProfilePage/nav-bar";
import OtherInfo from "../ProfilePage/OtherInfo";
import Autinticate from "../ProfilePage/Autinticate";
import Header from "../components/LandingPageNavBar/Header";
import Footer from "../components/Footer/Footer";
import Profileuploader from "../components/Uploaders/Profileuploader";
import IDUpdate from "../components/Uploaders/IDUpdate";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import "../ProfilePage/Personalinfo.css";

import { InputText } from "primereact/inputtext";
import image1 from "../ProductPageComponent/images/creditcard.png";

import { Calendar } from "primereact/calendar";
import { Accordion, AccordionTab } from "primereact/accordion";
import { useNavigate } from "react-router";
import { Dialog } from "primereact/dialog";
import {
  Show404Errors,
  Show500Errors,
  ShowNetorkErrors,
  ShowTokenErrors,
} from "../components/ErrorDialogs/ShowErrors";
import { Toast } from "primereact/toast";
import SimpleInput from "../components/Inputs/SimpleInput";
import { text } from "@fortawesome/fontawesome-svg-core";
import { UserContext } from "../App";
import TestLayout from "../Layouts/TestLayout";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";

function ProfilePage() {
  const user = useContext(UserContext);

  const [formValues, setformValues] = useState({
    first_name: user ? user.data.first_name : "",
    last_name: user ? user.data.last_name : "",
    national_code: user ? user.data.national_code : "",
    birthdate: user ? user.data.birthdate : "",
    cell_number: user ? user.data.cell_number : "",
    phone_number: user ? user.data.phone_number : "",
    email: user ? user.data.email : "",
  });

  const [waiting, setWaiting] = useState(false);

  var Token = localStorage.getItem("authTokens");

  const navigate = useNavigate();

  const toastBC = useRef(null);

  const config = {
    headers: {
      Authorization: `bearer ${Token}`,
    },
  };

  function UpdateInfo() {
    console.log("post");
    axios
      .patch(
        // "https://api.artina.org/api/account/profile/",
        "http://78.38.35.249:8000/api/account/profile/",
        {
          user: 6,
          address: user ? user.data.address : '',
          birthdate: formValues.birthdate,
          cell_number: formValues.cell_number,
          email: formValues.email,
          first_name: formValues.first_name,
          last_name: formValues.last_name,
          national_code: formValues.national_code,
          phone_number: formValues.phone_number,
        },
        config
      )
      .then((response) => {
        if (response.status == 200) {
          alert("as");
        }
      })
      .catch((exception) => {
        console.log("exception");
        console.log(exception);

        if (exception.response.status === 404) {
          Show404Errors(toastBC);
        } else if (exception.response.status === 500) {
          Show500Errors(toastBC);
        } else if (exception.response.status === 401) {
          ShowTokenErrors(toastBC);
        } else if (exception.code === "ERR_NETWORK") {
          ShowNetorkErrors(toastBC);
        }
      });
  };

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
      cell_number: user ? user.data.cell_number : "",
      phone_number: user ? user.data.phone_number : "",
      email: user ? user.data.email : "",
    }));
    console.log(user);
  }, [user]);

  return (
    <TestLayout>
      <Toast
        ref={toastBC}
        position="bottom-center"
        className="text-3xl w-full"
      />
      <div className="flex gap-16">
        <SimpleCard className="bg-[#4e45d0] w-[45%] flex flex-col relative gap-12 items-center ">
          <img
            src="/mand1.png"
            className=" opacity-40 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none"
          />
          <div className="text-white text-[32px] mb-10 z-10">
            پروفایل کاربری
          </div>
          <div className="text-white text-[20px] z-10">تصویر پروفایل</div>
          <div className="bg-slate-50 w-[70%] pt-[70%] rounded-full z-10 relative">
            <img src={`https://api.artina.org${user? user.data.profile_picture : ''}`} className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none w-8"/>
          </div>
          <div className="">
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
              // disabled={true}
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
              isValid={formValues.national_code.length == 10}
              validationError="نمیتواند خالی باشد"
              onChange={(e) =>
                setformValues((prev) => ({
                  ...prev,
                  national_code: e.target.value,
                }))
              }
              defaultValue={user != null ? user.data.national_code : null}
              disabled={user != null ? user.data.national_code != null : null}
            />
            <SimpleInput
              type="text"
              title="تاریخ تولد"
              placeholder="مثلا: 1375/06/11"
              isValid={formValues.birthdate.length == 10}
              validationError="نمیتواند خالی باشد"
              onChange={(e) =>
                setformValues((prev) => ({
                  ...prev,
                  birthdate: e.target.value,
                }))
              }
              defaultValue={user != null ? user.data.birthdate : null}
              disabled={user != null ? user.data.birthdate != null : null}
            />
          </div>
          <hr className="opacity-10" />
          <div className="text-[24px]">راه‌های ارتباطی</div>
          <div className="flex gap-12">
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
          </div>
          <div className="flex gap-12">
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
          <hr className="opacity-10" />
          <div className="text-[24px]">اطلاعات حساب کاربری</div>
          <div className="flex gap-12">
            <div className="text-[16px] bg-rose-500 w-full py-5 rounded-lg text-white">
              امتیاز در سایت: 5700
            </div>
            <div className="text-[16px] bg-yellow-500 w-full py-5 rounded-lg text-white">
              نوع کاربر: طلایی
            </div>
          </div>
          <div className="flex justify-center">
            <div className="text-[16px] bg-gradient-to-r from-lime-400 to-lime-500 w-[40%] py-5 rounded-2xl h-96 flex flex-col items-center justify-center">
              <div className="text-[24px]">6063 7373 5689 8569</div>
              <div className="text-[16px] mt-6">شبا</div>
              <div className="text-[20px]">
                IR18 - 1231265874484659859629291
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <div
              className=" text-white text-[16px] bg-[#4e45d0] py-5 px-[6rem] rounded-lg cursor-pointer transition-all hover:bg-[#372fac]"
              onClick={e=>UpdateInfo()}
            >
              ویرایش
            </div>
          </div>
        </SimpleCard>
      </div>
    </TestLayout>
  );
}
export default ProfilePage;
