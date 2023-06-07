import React from "react";
import "./style.css";

const Footer = () => {
  return (
    <div className="w-full bg-[#4e45d0] text-white py-4">
      <div className="flex justify-between w-2/3 mx-auto">
        <div className="w-full flex flex-col gap-2">
          <div className="font-b8">آرتینا</div>
          <div className="mr-2 font-b3">صفحه ضرب NFT</div>
          <div className="mr-2 font-b3">کالکشن ها</div>
          <div className="mr-2 font-b3">کارمزدها</div>
        </div>

        <div className="w-full flex flex-col gap-2 pr-20">
          <div className="font-b8">امکانات</div>
          <div className="mr-2 font-b3">متاورس</div>
          <div className="mr-2 font-b3">پیش بینی کننده قیمت ان اف تی</div>
          <div className="mr-2 font-b3">تولید عکس با هوش مصنوعی</div>
          <div className="mr-2 font-b3">بلاگ خبری</div>
        </div>
        <div className="w-full flex flex-col gap-2 pr-20">
          <div className="font-b8">راهنما</div>
          <div className="mr-2 font-b3">راهنمای احراز هویت</div>
          <div className="mr-2 font-b3">راهنمای ضرب ان اف تی</div>
          <div className="mr-2 font-b3">راهنمای ایجاد نمایشگاه سه بعدی</div>
        </div>
        <div className="w-auto flex shrink-0 gap-2">
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

          <img
            referrerPolicy="origin"
            id="rgvjwlaojzpejxlznbqeoeuk"
            className="cursor-pointer"
            onClick={() =>
              window.open(
                "https://logo.samandehi.ir/Verify.aspx?id=347128&p=xlaoaodsjyoerfthuiwkmcsi",
                "Popup",
                "toolbar=no, scrollbars=no, location=no, statusbar=no, menubar=no, resizable=0, width=450, height=630, top=30"
              )
            }
            alt="logo-samandehi"
            src="https://logo.samandehi.ir/logo.aspx?id=347128&p=qftishwlyndtnbpdodrfaqgw"
          />
        </div>
      </div>

      <div className="bg-gradient-to-r mt-10 from-slate-50 to-slate-200 bg-clip-text text-transparent mx-auto text-center">
        Copyright @2022 by Artina - All rights reserved
      </div>
    </div>
  );
};

export default Footer;
