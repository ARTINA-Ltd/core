import React from "react";
import Header from "../components/LandingPageNavBar/Header";
import Footer from "../components/Footer/Footer";

const TestLayout = ({ children , connectWallet}) => {
  return (
    <div style={{ direction: "rtl" }} className="overflow-hidden">
      <Header connectWallet={connectWallet} />
      <div className="bg-[#f1f2f7]">
        <div className=" w-[90%] m-auto py-8 min-h-[90vh]">{children}</div>
      </div>

      <Footer />
    </div>
  );
};

export default TestLayout;
