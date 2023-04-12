import React from "react";
import Header from "../components/LandingPageNavBar/Header";
import Footer from "../components/Footer/Footer";

const TestLayout = ({ children }) => {
  return (
    <div style={{ direction: "rtl" }} className="overflow-hidden">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default TestLayout;
