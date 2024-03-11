import { useState } from "react";
import Header from "../components/AdminPageNavbar/Header.js";
import AuthPageCard from "../components/Cards/AuthPageCard.jsx";
import Footer from "../components/Footer/Footer.jsx";

const Authentications = () => {
  return (
    <div dir="rtl">
      <Header />
      <div className="bg-slate-200 w-[90vw] mx-auto p-8">
        <AuthPageCard />
      </div>

      <Footer />
    </div>
  );
};
export default Authentications;
