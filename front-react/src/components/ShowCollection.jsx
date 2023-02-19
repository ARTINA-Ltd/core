import React from "react";
import "./ShowCollection.css";
import Collections from "./Collection/Collection";
import Header from "./LandingPageNavBar/Header";
import Footer from "./Footer/Footer";
const ShowCollection = () => {
  return (
    <div className="overflow-hidden" style={{ direction: "rtl" }}>
      <Header />
      <div className="    ">
        <Collections />
      </div>

      <Footer />
    </div>
  );
};

export default ShowCollection;
