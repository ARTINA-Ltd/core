import React from "react";
import Header from "../components/LandingPageNavBar/Header";
import Footer from "../components/Footer/Footer";

const TestLayout = ({ children }) => {
  return (
    <div style={{ direction: "rtl" }} className="overflow-hidden">
      <Header />
      <div className="bg-[#f8f9fd]">
        {children}
      </div>

      <Footer />
    </div>
  );
};

export default TestLayout;
