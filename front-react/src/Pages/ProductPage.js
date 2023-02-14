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
function ProductPage() {
  return (
    <>
      <div className=" overflow-hidden">
        <div style={{ direction: "rtl" }}>
          <Navbar />
        </div>

        <div style={{ direction: "rtl" }} className="grid">
          <div className="col-12 flex grid">
            <div className="lg:col-6 lg:w-6 md:col-6    sm:col-12 ">
              <div className=" lg:mr-8 align-items-center justify-content-center">
                <MainImage />
              </div>
            </div>
            <div className="col-6 md:col-6  sm:col-12 ">
              <div className=" sm:mr-9  ml-9   align-items-center justify-content-center    ">
                <Price />
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
