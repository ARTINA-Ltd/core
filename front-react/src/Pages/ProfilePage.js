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
  });

  const [waiting, setWaiting] = useState(false);
  var Token = localStorage.getItem("authTokens");
  const [UserDatafromlocal, setUserDatafromlocal] = useState({
    birthdate: "26",
  });
  const navigate = useNavigate();
  const toastBC = useRef(null);
  const config = {
    headers: {
      Authorization: `bearer ${Token}`,
    },
  };
  // const getInfo = () => {
  //   axios
  //     .get("http://78.38.35.249:8000/api/account/user-info/", config)
  //     .then((response) => {
  //       if (response.status == 200) {
  //         localStorage.setItem("UserDatas", JSON.stringify(response.data));
  //         if (
  //           response.data.national_code == null ||
  //           response.data.first_name == null ||
  //           response.data.address == null ||
  //           response.data.email == null ||
  //           response.data.username == null ||
  //           response.data.birthdate == null ||
  //           response.data.phone_number == null ||
  //           response.data.last_name == null
  //         ) {
  //           navigate("/profile");
  //         } else {
  //           // setUserDatas(response.data)
  //         }
  //       }
  //     })
  //     .catch((exception) => {
  //       console.log(exception);

  //       if (exception.response.status === 404) {
  //         Show404Errors(toastBC);
  //       } else if (exception.response.status === 500) {
  //         Show500Errors(toastBC);
  //       } else if (exception.response.status === 401) {
  //         ShowTokenErrors(toastBC);
  //       } else if (exception.code === "ERR_NETWORK") {
  //         ShowNetorkErrors(toastBC);
  //       }
  //     });
  // };
  // address: null
  // birthdate: null
  // cell_number: null
  // email: "parsalubo.k@gmail.com"
  // first_name: null
  // last_name: null
  // national_card_picture: "/static/PicturesOfNationalCard/default.png"
  // national_code: null
  // phone_number: null
  // profile_picture: "/static/PicturesOfProfile/default.png"
  // role: "user_zero"
  // username: "wixloop"
  // console.log(UserDatafromlocal)
  const handlechange = (e) => {
    setUserDatafromlocal((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  // const UpdateInfo = () => {
  // address: null
  // birthdate: null
  // cell_number: null
  // email: "parsalubo.k@gmail.com"
  // first_name: null
  // last_name: null
  // national_card_picture: "/static/PicturesOfNationalCard/default.png"
  // national_code: null
  // phone_number: null
  // profile_picture: "/static/PicturesOfProfile/default.png"
  // role: "user_zero"
  // username: "wixloop"
  // const user = {
  //   address: user.data.national_code,
  //   birthdate: UserDatafromlocal.phoneNumber,
  //   cell_number: UserDatafromlocal.password,
  //   email: UserDatafromlocal.confirmPassword,
  //   first_name: UserDatafromlocal.firstname,
  //   last_name: UserDatafromlocal.lastname,
  //   national_code: UserDatafromlocal.stateId,
  //   national_card_picture: UserDatafromlocal.stateId,
  //   phone_number: UserDatafromlocal.stateId,
  //   profile_picture: UserDatafromlocal.stateId,
  //   // role: userData.stateId,
  //   // username: userData.stateId,
  // };

  //   axios
  //     .post(
  //       "http://78.38.35.249:8000/api/account/profile/",
  //       {
  //         address: user["nationalCode"],
  //         birthdate: user["shabaNumber"],
  //         phoneNumber: user["phoneNumber"],
  //         cell_number: user["password"],
  //         email: user["cityname"],
  //         first_name: user["statename"],
  //         last_name: user["confirmPassword"],
  //         national_code: user["stateID"],
  //         national_card_picture: user["firstname"],
  //         phone_number: user["lastname"],
  //         profile_picture: user["cityID"],
  //       },
  //       config
  //     )
  //     .then((response) => {
  //       if (response.status == 200) {
  //         alert("as");
  //       }
  //     })
  //     .catch((exception) => {
  //       console.log(exception);

  //       if (exception.response.status === 404) {
  //         Show404Errors(toastBC);
  //       } else if (exception.response.status === 500) {
  //         Show500Errors(toastBC);
  //       } else if (exception.response.status === 401) {
  //         ShowTokenErrors(toastBC);
  //       } else if (exception.code === "ERR_NETWORK") {
  //         ShowNetorkErrors(toastBC);
  //       }
  //     });
  // };
  useEffect(() => {
    setformValues((prev) => ({
      ...prev,
      first_name: user ? user.data.username : "",
      last_name: user ? user.data.last_name : ""
    }))
  }, [user]);
  console.log(user != null ? user.data.username : null);

  return (
    <TestLayout>

      <Toast
        ref={toastBC}
        position="bottom-center"
        className="text-3xl w-full"
      />
      <div className="w-[80%] m-auto flex gap-10 pt-5">
        <SimpleCard className="bg-[#4e45d0] w-[45%] flex flex-col relative gap-10 items-center ">
          <img src="/mand1.png" className=" opacity-40 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none" />
          <div className="text-white text-[32px] mb-10 z-10">پروفایل کاربری</div>
          <div className="text-white text-[20px] z-10">تصویر پروفایل</div>
          <div className="bg-slate-300 w-[70%] pt-[70%] rounded-full z-10" />
          <div className="">
            <Profileuploader />
            {/* <IDUpdate /> */}
          </div>
        </SimpleCard>
        <SimpleCard className={"flex flex-col gap-10 bg-white w-full"}>
          <div className="text-[24px]">اطلاعات شخصی</div>
          <div className="flex gap-10">
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
              defaultValue={
                user != null ? user.data.first_name : null
              }
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
            // disabled={true}
            />
          </div>
          <div className="flex gap-10">
            <SimpleInput
              type="text"
              title="کد ملی"
              placeholder="مثلا: 1234567890"
              isValid={false}
              validationError="نمیتواند خالی باشد"
              onChange={handlechange}
              defaultValue={
                user != null ? user.data.national_code : null
              }
            // disabled={true}
            />
            <SimpleInput
              type="text"
              title="تاریخ تولد"
              placeholder="مثلا: 1375/06/11"
              isValid={UserDatafromlocal.birthdate != ""}
              validationError="نمیتواند خالی باشد"
              onChange={handlechange}
              defaultValue={user != null ? user.data.birthdate : null}
            // disabled={true}
            />
          </div>
          <hr className="opacity-10" />
          <div className="text-[24px]">راه‌های ارتباطی</div>
          <div className="flex gap-10">
            <SimpleInput
              type="text"
              title="شماره ثابت"
              placeholder="02112345678"
              isValid={false}
              validationError="نمیتواند خالی باشد"
              onChange={handlechange}
              defaultValue={
                user != null ? user.data.cell_number : null
              }
              disabled={
                user != null ? user.data.cell_number != null : null
              }
            />
            <SimpleInput
              type="text"
              title="شماره موبایل"
              placeholder="09123456789"
              isValid={false}
              validationError="نمیتواند خالی باشد"
              onChange={handlechange}
              defaultValue={
                user != null ? user.data.phone_number : null
              }
              disabled={
                user != null ? user.data.phone_number != null : null
              }
            />
          </div>
          <div className="flex gap-10">
            <SimpleInput
              type="text"
              title="ایمیل "
              placeholder="09123456789"
              isValid={false}
              validationError="نمیتواند خالی باشد"
              onChange={handlechange}
              defaultValue={user != null ? user.data.email : null}
              disabled={user != null ? user.data.email != null : null}
            />
          </div>
          <hr className="opacity-10" />
          <div className="text-[24px]">اطلاعات حساب کاربری</div>
          <div className="flex gap-10">
            <div className="text-[16px] bg-rose-500 w-full py-5 rounded-lg text-white">
              امتیاز در سایت: 5700
            </div>
            <div className="text-[16px] bg-yellow-500 w-full py-5 rounded-lg text-white">
              نوع کاربر: طلایی
            </div>
          </div>
          <div className="flex justify-center">
            <div className="text-[16px] bg-gradient-to-r from-lime-400 to-lime-500 w-[40%] py-5 rounded-2xl h-80 flex flex-col items-center justify-center">
              <div className="text-[24px]">
                6063 7373 5689 8569
              </div>
              <div className="text-[16px] mt-6">
                شبا
              </div>
              <div className="text-[20px]">
                IR18 - 1231265874484659859629291
              </div>
            </div>

          </div>
          <div className="flex justify-end">
            <div className=" text-white text-[16px] bg-[#4e45d0] py-5 px-[6rem] rounded-lg cursor-pointer transition-all hover:bg-[#372fac]">
              ویرایش
            </div>
          </div>
        </SimpleCard>

      </div>
      <div className="m-auto text-[32px]">
        مشخصات شخصی
      </div>
      <div className="grid col-12 m-3">
        <div className="lg:col-6   p-4    md:col-6 sm:col-12 mt-6">
          <Profileuploader />
          {/* <IDUpdate /> */}
        </div>

        <div className="lg:col-6 md:col-6 p-4 sm:col-12 mt-2">
          <div
            className="  mt-6   mr-2  align-items-center justify-content-center"
            style={{ width: "97%" }}
          >
            <Accordion multiple activeIndex={[0, 1, 2]}>
              <AccordionTab
                style={{
                  borderColor: "#424874",
                  borderWidth: "2px",
                  borderRadius: "4px",
                }}
                header={
                  <div className="flex mr-3 align-items-center Accheader">
                    <span className="vertical-align-middle font text-3xl">
                      اطلاعات شخصی
                    </span>
                  </div>
                }
                className="text-4xl mb-4  "
              >
                <div className=" col-12 grid flex  align-items-center   ">
                  <div
                    className="col-12 sm:col-6 md:col-6 lg:col-6   justify-content-start"
                    style={{ display: "flex" }}
                  >
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
                      defaultValue={
                        user != null ? user.data.first_name : null
                      }
                    // disabled={true}
                    />
                    {/* <p>
                        نام :
                        <InputText
                          className="h-4rem nameinput "
                          placeholder=""
                          onChange={handlechange}
                          name="first_name"
                          // value={UserDatafromlocal.first_name}
                        />
                      </p> */}
                  </div>
                  <div
                    className="col-12 sm:col-6 md:col-6 lg:col-6  justify-content-start"
                    style={{ display: "flex" }}
                  >
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
                    // disabled={true}
                    />
                  </div>
                </div>
                <div className=" col-12 grid flex   mt-2  ">
                  <div
                    className="col-12 sm:col-6 md:col-6 lg:col-6  justify-content-start"
                    style={{ display: "flex" }}
                  >
                    <SimpleInput
                      type="text"
                      title="کد ملی"
                      placeholder="مثلا: 1234567890"
                      isValid={false}
                      validationError="نمیتواند خالی باشد"
                      onChange={handlechange}
                      defaultValue={
                        user != null ? user.data.national_code : null
                      }
                    // disabled={true}
                    />
                  </div>
                  <div
                    className="col-12 sm:col-6 "
                    style={{ display: "flex" }}
                  >
                    <SimpleInput
                      type="text"
                      title="تاریخ تولد"
                      placeholder="مثلا: 1375/06/11"
                      isValid={UserDatafromlocal.birthdate != ""}
                      validationError="نمیتواند خالی باشد"
                      onChange={handlechange}
                      defaultValue={user != null ? user.data.birthdate : null}
                    // disabled={true}
                    />
                  </div>
                </div>
              </AccordionTab>
              <AccordionTab
                style={{
                  borderColor: "#424874",
                  borderWidth: "2px",
                  borderRadius: "4px",
                }}
                header={
                  <div className="flex mr-3 align-items-center">
                    <span className="vertical-align-middle font text-3xl">
                      راه های ارتباطی
                    </span>
                  </div>
                }
                className="text-4xl mb-4"
              >
                <div className=" col-12 flex mt-2  ">
                  <div
                    className="col-11 sm:col-6 md:col-6 lg:col-6  justify-content-start"
                    style={{ display: "flex" }}
                  >
                    <SimpleInput
                      type="text"
                      title="شماره ثابت"
                      placeholder="02112345678"
                      isValid={false}
                      validationError="نمیتواند خالی باشد"
                      onChange={handlechange}
                      defaultValue={
                        user != null ? user.data.cell_number : null
                      }
                      disabled={
                        user != null ? user.data.cell_number != null : null
                      }
                    />
                  </div>
                  <div
                    className="col-11 sm:col-6 md:col-6 lg:col-6  justify-content-start"
                    style={{ display: "flex" }}
                  >
                    <SimpleInput
                      type="text"
                      title="شماره ثابت"
                      placeholder="09123456789"
                      isValid={false}
                      validationError="نمیتواند خالی باشد"
                      onChange={handlechange}
                      defaultValue={
                        user != null ? user.data.phone_number : null
                      }
                      disabled={
                        user != null ? user.data.phone_number != null : null
                      }
                    />
                    {/* <Calendar value={date} onChange={(e) => setDate(e.value)} />         */}
                  </div>
                </div>
                <div
                  className=" col-7 sm:col-12 font justify-content-start mt-2 w-full  "
                  style={{ display: "flex" }}
                >
                  <SimpleInput
                    type="text"
                    title="ایمیل "
                    placeholder="09123456789"
                    isValid={false}
                    validationError="نمیتواند خالی باشد"
                    onChange={handlechange}
                    defaultValue={user != null ? user.data.email : null}
                    disabled={user != null ? user.data.email != null : null}
                  />
                </div>
              </AccordionTab>
              <AccordionTab
                style={{
                  borderColor: "#424874",
                  borderWidth: "2px",
                  borderRadius: "4px",
                }}
                header={
                  <div className="flex mr-3 align-items-center">
                    <span className="vertical-align-middle font text-3xl">
                      {" "}
                      اطلاعات حساب کاربری
                    </span>
                  </div>
                }
                className="text-4xl mb-4"
              >
                <div className=" col-12 grid flex mt-2  ">
                  <div
                    className="col-11 sm:col-6 md:col-6 lg:col-6  justify-content-start"
                    style={{ display: "flex" }}
                  >
                    <p className="font">امتیاز در سایت : 99999 </p>
                  </div>
                  <div
                    className="col-11 sm:col-6 md:col-6 lg:col-6   justify-content-start"
                    style={{ display: "flex" }}
                  >
                    <p className="font"> نوع کاربر :طلایی</p>
                  </div>
                </div>

                <div className="col-12 grid flex justify-content-center">
                  <h1 className="text-5xl col-12 justify-content-center  ">
                    -----احرازهویت------
                  </h1>
                  <div className="flex  col-12 w-5   justify-content-center   ">
                    <img
                      src={image1}
                      alt=""
                      className=""
                      style={{ height: "90px" }}
                    />
                  </div>
                  <div className="col-12">
                    <p className="text-4xl mt-12">
                      52154651486514651613 :شماره شبا
                    </p>
                  </div>
                </div>
              </AccordionTab>
            </Accordion>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <Button
          style={{ backgroundColor: "#424874" }}
          label="ویرایش"
          // onClick={UpdateInfo}
          className=" mt-6 lg:text-4xl sm:text-2xl lg:text-2xl text-2xl justify-content-center text-center w-7"
        />
      </div>

    </TestLayout>

  );
}
export default ProfilePage;
