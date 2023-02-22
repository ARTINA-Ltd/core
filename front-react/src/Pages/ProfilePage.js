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

function ProfilePage() {
   var Token = localStorage.getItem("authTokens");

   const config = {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  };
  const getInfo = () => {
  //  Response is : 
  // {
  //     "username": ""
  // }
    axios
      .get(
        "http://78.38.35.249/api/account/user-info/",
        config
      )
      .then((response) => {
        if (response.status == 200) {
          console.log(response.data.username)
          localStorage.setItem("UserDatas", JSON.stringify ( response.data));
         //check another api to see profile full datas.if it was null,start the data
         // if it is not valid send a toast to login
        } 
      })
      .catch((exception) => {
        console.log(exception)
        if (exception.response.status === 401) {
          console.log("401");}
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
    <div className="    " style={{backgroundColor:"#F4EEFF"}} >
       
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
