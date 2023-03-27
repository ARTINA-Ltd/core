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
import React, { useEffect, useRef, useState } from "react";
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

function ProfilePage() {
  const [waiting, setWaiting] = useState(false);
  var Token = localStorage.getItem("authTokens");
  const [UserDatafromlocal, setUserDatafromlocal] = useState(
    JSON.parse(localStorage.getItem("UserDatas"))
  );
  const navigate = useNavigate();
  const toastBC = useRef(null);
  const config = {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  };
  const getInfo = () => {
    axios
      .get("http://api.artina.orgapi/account/user-info/", config)
      .then((response) => {
        if (response.status == 200) {
          localStorage.setItem("UserDatas", JSON.stringify(response.data));
          if (
            response.data.national_code == null ||
            response.data.first_name == null ||
            response.data.address == null ||
            response.data.email == null ||
            response.data.username == null ||
            response.data.birthdate == null ||
            response.data.phone_number == null ||
            response.data.last_name == null
          ) {
            navigate("/profile");
          } else {
            // setUserDatas(response.data)
          }
        }
      })
      .catch((exception) => {
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
  const UpdateInfo = () => {
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
    const user = {
      address: UserDatafromlocal.nationalCode,
      birthdate: UserDatafromlocal.phoneNumber,
      cell_number: UserDatafromlocal.password,
      email: UserDatafromlocal.confirmPassword,
      first_name: UserDatafromlocal.firstname,
      last_name: UserDatafromlocal.lastname,
      national_code: UserDatafromlocal.stateId,
      national_card_picture: UserDatafromlocal.stateId,
      phone_number: UserDatafromlocal.stateId,
      profile_picture: UserDatafromlocal.stateId,
      // role: userData.stateId,
      // username: userData.stateId,
    };

    axios
      .post(
        "http://api.artina.orgapi/account/profile/",
        {
          address: user["nationalCode"],
          birthdate: user["shabaNumber"],
          phoneNumber: user["phoneNumber"],
          cell_number: user["password"],
          email: user["cityname"],
          first_name: user["statename"],
          last_name: user["confirmPassword"],
          national_code: user["stateID"],
          national_card_picture: user["firstname"],
          phone_number: user["lastname"],
          profile_picture: user["cityID"],
        },
        config
      )
      .then((response) => {
        if (response.status == 200) {
          alert("as");
        }
      })
      .catch((exception) => {
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
  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div className="" style={{ backgroundColor: "#F4EEFF" }}>
      <Toast
        ref={toastBC}
        position="bottom-center"
        className="text-3xl w-full"
      />

      <div className="  overflow-hidden     " style={{ direction: "rtl" }}>
        <Header />

        <div className="justify-content-center text-center  mt-6 flex">
          <h2 className="  font lg:text-8xl sm:text-4xl lg:text-6xl text-4xl ">
            مشخصات شخصی
          </h2>
        </div>
        <div dir="rtl" className="flex grid col-12  m-3">
          <div className="lg:col-6   p-4    md:col-6 sm:col-12 mt-6">
            <Profileuploader />
            <IDUpdate />
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
                        {" "}
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
                      <p>
                        نام :
                        <InputText
                          className="h-4rem nameinput "
                          placeholder=""
                          onChange={handlechange}
                          name="first_name"
                          value={UserDatafromlocal.first_name}
                        />
                      </p>
                    </div>
                    <div
                      className="col-12 sm:col-6 md:col-6 lg:col-6  justify-content-start"
                      style={{ display: "flex" }}
                    >
                      <p>
                        {" "}
                        نام خانوادگی :{" "}
                        <InputText
                          className="h-4rem "
                          onChange={handlechange}
                          name="last_name"
                          value={UserDatafromlocal.last_name}
                          placeholder="کاظمی"
                        />
                      </p>
                    </div>
                  </div>
                  <div className=" col-12 grid flex   mt-2  ">
                    <div
                      className="col-12 sm:col-6 md:col-6 lg:col-6  justify-content-start"
                      style={{ display: "flex" }}
                    >
                      <p>
                        {" "}
                        کدملی :
                        <InputText
                          className="h-4rem IDinfo"
                          onChange={handlechange}
                          name="national_code"
                          value={UserDatafromlocal.national_code}
                          placeholder="4311333232"
                        />
                      </p>
                    </div>
                    <div
                      className="col-12 sm:col-6 md:col-6 lg:col-6  justify-content-start"
                      style={{ display: "flex" }}
                    >
                      <p className="">
                        تاریخ تولد :
                        <Calendar
                          value={UserDatafromlocal.birthdate}
                          className="h-4rem dateinfo"
                          showButtonBar
                          onChange={handlechange}
                          name="birthdate"
                          placeholder="1398/09/09"
                        />
                      </p>
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
                        {" "}
                        راه های ارتباطی{" "}
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
                      <p>
                        شماره ثابت :{" "}
                        <InputText
                        onChange={handlechange}
                        name="cell_number"
                          value={UserDatafromlocal.cell_number}
                          className="h-4rem homenum"
                          placeholder="09121822776"
                        />
                      </p>
                    </div>
                    <div
                      className="col-11 sm:col-6 md:col-6 lg:col-6  justify-content-start"
                      style={{ display: "flex" }}
                    >
                      <p>
                        {" "}
                        شماره همراه :{" "}
                        <InputText
                          value={UserDatafromlocal.phone_number}
                          className="h-4rem phonenum"
                          onChange={handlechange}
                          name="phone_number"
                          placeholder="0987123323"
                        />
                      </p>
                      {/* <Calendar value={date} onChange={(e) => setDate(e.value)} />         */}
                    </div>
                  </div>
                  <div
                    className=" col-7 sm:col-12 font justify-content-start mt-2 w-full  "
                    style={{ display: "flex" }}
                  >
                    ایمیل :{" "}
                    <InputText
                      value={UserDatafromlocal.email}
                      onChange={handlechange}
                      name="email"
                      className="h-4rem Pemail font "
                      style={{ width: "40%" }}
                      placeholder="parsa@gmail.com"
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
            onClick={UpdateInfo}
            className=" mt-6 lg:text-4xl sm:text-2xl lg:text-2xl text-2xl justify-content-center text-center w-7"
          />
        </div>

        <Footer />
      </div>
    </div>
  );
}
export default ProfilePage;
