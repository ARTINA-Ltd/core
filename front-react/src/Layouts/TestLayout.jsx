import React from "react";
import Header from "../components/LandingPageNavBar/Header";
import Footer from "../components/Footer/Footer";
import config from "../config.json";

const TestLayout = ({
  children,
  connectWallet,
  className,
  wfull = false,
  rev = false,
}) => {
  return (
    <div
      style={{ direction: "rtl" }}
      className={`${
        rev
          ? 'bg-[#f9f9f9] bg-cover bg-[url("https://artina.org/6.jpg")] '
          : 'bg-[#f9f9f9] bg-[length:300px] bg-[url("https://artina.org/12.png")] '
      }   overflow-hidden`}
    >
      <Header connectWallet={connectWallet} rev={rev} />
      <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta httpEquiv="Content-Language" content="fa" />
      <div>
        {/* <div className={``}> */}
        <div
          className={` m-auto my-0 pt-1 pb-5 min-h-[92vh] ${className} ${
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
