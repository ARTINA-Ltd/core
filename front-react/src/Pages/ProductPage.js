import { createContext, useEffect, useState } from "react";
import React from "react";
import "../ProductPageComponent/index.css";
import MainImage from "../ProductPageComponent/MainImage";
import UnNav from "../ProductPageComponent/Un-nav";
import Footer from "../components/Footer/Footer";
import Price from "../ProductPageComponent/Price";
import Navbar from "../components/LandingPageNavBar/Header";
import Properties from "../ProductPageComponent/Properties";
import Activity from "../ProductPageComponent/Activity";
import Recomendition from "../ProductPageComponent/Recomendition";
import axios from "axios";

function ProductPage() {
  const [data, setData] = useState();
  var Token = localStorage.getItem("authTokens");

  useEffect(() => {
    axios({
       method: "get",
      //  url: "http://78.38.35.249:8000/api/transaction/Nfts/",
       url: "https://api.artina.org/api/account/profile/",
    }).then(d =>{
      setData(d);
      console.log("ressssssssssssss")
      console.log(d)
     }).catch(console.log)
   },[]);

  return (
    <>
      <div className=" overflow-hidden">
        <div style={{ direction: "rtl" }}>
          <Navbar />
        </div>

        <div style={{ direction: "rtl" }} className="grid">
          <div className="col-12 flex grid">
            <div className="lg:col-6 lg:w-6 md:col-6    sm:col-12 ">
              <div className=" lg:mr-8 align-items-center justify-content-center mt-8">
                <MainImage imageSrc={""}/>
              </div>
            </div>
            <div className="col-12 lg:col-16 md:col-6  sm:col-12 ">
              <div className=" sm:mr-9  ml-9   align-items-center justify-content-center    ">
                <Price name="" writer="" date="" description="" price="" />
              </div>
            </div>
          </div>
          <div className="col-12 w-full">
            <Properties />
          </div>
          <div className="col-12">
            <Activity />
          </div>
          <div className="col-12">
            <Recomendition />
          </div>
        </div>
        <div style={{ direction: "rtl" }}>
          <Footer />
        </div>
      </div>
    </>
  );
}
export default ProductPage;
