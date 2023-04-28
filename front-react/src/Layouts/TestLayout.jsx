import React from "react";
import Header from "../components/LandingPageNavBar/Header";
import Footer from "../components/Footer/Footer";

const TestLayout = ({ children }) => {
  return (
    <div style={{ direction: "rtl" }} className="overflow-hidden">
      <Header />
      <div className="bg-[#f1f2f7]">
        <div className=" w-[80%] m-auto py-8">{children}</div>
      </div>

      <Footer />
    </div>
  );
};

export default TestLayout;
