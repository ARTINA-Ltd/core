import React from "react";
import Header from "../components/LandingPageNavBar/Header";
import Footer from "../components/Footer/Footer";
import config from "../config.json";

const TestLayout = ({ children, connectWallet, className, wfull = false }) => {
  return (
    <div style={{ direction: "rtl" }} className="overflow-hidden">
      <Header connectWallet={connectWallet} />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta http-equiv="Content-Language" content="fa" />
      <div className={`bg-[#f9f9f9]`}>
        <div
          className={` m-auto my-0 pt-1 pb-5 min-h-[80vh] ${className} ${
            wfull ? "w-full" : "w-[90%]"
          }`}
        >
          {children}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TestLayout;
