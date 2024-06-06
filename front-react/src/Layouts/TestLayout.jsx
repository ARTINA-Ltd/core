import React from "react";
import Header from "../components/LandingPageNavBar/Header";
import Footer from "../components/Footer/Footer";
import i18next from "../../src/i18n";
const TestLayout = ({ children, connectWallet, className, wfull = false, rev = false }) => {
  return (
    <div style={{ direction: i18next.dir() }} className={`bg-base-300 overflow-hidden`}>
      <Header connectWallet={connectWallet} rev={rev} />
      <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta httpEquiv="Content-Language" content="fa" />
      <div>
        {/* <div className={``}> */}
        <div className={` m-auto my-0 pt-1 pb-5 min-h-[92vh] ${className} ${wfull ? "w-full" : "w-[90%]"}`}>{children}</div>
      </div>

      <Footer />
    </div>
  );
};

export default TestLayout;
