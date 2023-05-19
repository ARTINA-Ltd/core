import React from "react";
import "./style.css";

const Footer = () => {
  return (
    <div className="w-full bg-[#4e45d0] text-white text-[16px] py-4 min-h-[30vh]">
      <div className="bg-gradient-to-r from-slate-50 to-slate-200 bg-clip-text text-transparent">
        Copyright @2022 by Artina - All rights reserved
      </div>
      <a
        referrerPolicy="origin"
        target="_blank"
        href="https://trustseal.enamad.ir/?id=339851&amp;Code=F4HSRl9q4dYEext5JuBT"
      >
        <img
          referrerPolicy="origin"
          src="https://Trustseal.eNamad.ir/logo.aspx?id=339851&amp;Code=F4HSRl9q4dYEext5JuBT"
          alt=""
          className="cursor-pointer"
          id="F4HSRl9q4dYEext5JuBT"
        ></img>
      </a>
    </div>
  );
};

export default Footer;
