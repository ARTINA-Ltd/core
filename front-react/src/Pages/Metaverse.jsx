import React from "react";
import { useParams } from "react-router";
import Header from "../components/LandingPageNavBar/Header";
import TestLayout from "../Layouts/TestLayout";

const Metaverse = () => {
  const { token } = useParams();

  return (
    <div
      style={{ direction: "rtl" }}
      className={`
        bg-[#f9f9f9] bg-[length:300px] bg-[url("http://localhost:3003/12.png")] overflow-hidden`}
    >
      <Header />
      {token ? (
        <iframe
          src={`http://metaverse.artina.org/?token=${token}`}
          className="w-full h-[100vh]"
        ></iframe>
      ) : (
        <iframe
          src={`https://metaverse.artina.org`}
          className="w-full h-[100vh]"
        ></iframe>
      )}
    </div>
  );
};

export default Metaverse;
