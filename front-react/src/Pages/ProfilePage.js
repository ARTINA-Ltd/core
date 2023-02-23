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
import { useEffect } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import { useNavigate } from "react-router";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
// {"username":"wixloop",
// "first_name":null,
// "last_name":null,
// "national_code":null,
// "birthdate":null,
// "phone_number":null,
// "cell_number":null,
// "address":null,
// "national_card_picture":"/static/PicturesOfNationalCard/default.png",
// "profile_picture":"/static/PicturesOfProfile/default.png",
// "email":"parsalubo.k@gmail.com",
// "role":"user_zero"}
function ProfilePage() {
   var Token = localStorage.getItem("authTokens");
   const [visible, setVisible] = useState(false);
   const navigate = useNavigate();
    const [position, setPosition] = useState("center");
   const footerContent = (
    <div>
      <Button
        label="ورود دوباره"
        // icon="pi pi-times"
        onClick={() => navigate("/login")}
        className="p-button-text text-3xl font"
      />
    </div>
  );
  const headerContent = (
    <div className="font text-5xl justify-content-center">
      <p>خطا 401 ؛ مدت زمان شما به پایان رسیده</p>
    </div>
  );
   const config = {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  };
  const getInfo = () => {
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
   
    axios
    .get("http://78.38.35.249/api/account/user-info/", config)
    .then((response) => {
      if (response.status == 200) {
        localStorage.setItem(
          "UserDatas",
          JSON.stringify(response.data)
        );
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
        }
        else{
          // setUserDatas(response.data)
        }
      }
    })
    .catch((exception) => {
      console.log(exception);
      if (exception.response.status === 401) {
        setVisible(true);
        localStorage.setItem("authTokens",null)
      }
      // } else if (exception.response.status === 404) {
      //   Show404Errors(toastBC);
      // } else if (exception.response.status === 500) {
      //   Show500Errors(toastBC);
      // } else if (exception.response.status === 401) {
      //   ShowTokenErrors(toastBC);
      // } else if (exception.code === "ERR_NETWORK") {
      //   ShowNetorkErrors(toastBC);
      // }
    });
};
  useEffect(() => {
    getInfo();
  }, []);
  return (
    <div className="" style={{backgroundColor:"#F4EEFF"}} >
        <Dialog
        header={headerContent}
        className="justify-content-center"
        visible={visible}
        footer={footerContent}
        position={position}
        onHide={() => setVisible(false)}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <p className="m-0 font text-4xl">
         مدت زمان توکن شما به پایان رسیده.لطفا از حساب خود خارج شده و مجددا وارد سیستم بشوید.
        </p>
      </Dialog>
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
            <PersonalInfo />
          </div>
        </div>

        <div className="mb-8">
          <Button style={{backgroundColor:'#424874'}}
            label="ویرایش"
            className=" mt-6 lg:text-4xl sm:text-2xl lg:text-2xl text-2xl justify-content-center text-center w-7"
          />
        </div>

        <Footer />
      </div>
    </div>
  );
}
export default ProfilePage;
