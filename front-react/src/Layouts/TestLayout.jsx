import React from "react";
import Header from "../components/LandingPageNavBar/Header";
import Footer from "../components/Footer/Footer";
import config from "../config.json"

const TestLayout = ({ children, connectWallet, className = "" }) => {
  return (
    <div style={{ direction: "rtl" }} className="overflow-hidden">
      <Header connectWallet={connectWallet} />
      <div className={`bg-[#f9f9f9]`}>
        <div className={`w-[90%] m-auto my-0 pt-1 pb-5 min-h-[80vh] ${className}`}>
          {children}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TestLayout;
