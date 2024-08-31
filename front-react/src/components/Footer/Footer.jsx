import React from "react";
import { useTranslation } from "react-i18next";
import { FaInstagram, FaLinkedin, FaDiscord } from "react-icons/fa";
import { SiTelegram } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { Notify } from "notiflix/build/notiflix-notify-aio";


const Footer = () => {
  const { t } = useTranslation(["footer"]);
  const icons = {
    instagram: <FaInstagram className="w-8 h-8" />,
    telegram: <SiTelegram className="w-8 h-8" />,
    twitter: <FaXTwitter className="w-8 h-8" />,
    linkedin: <FaLinkedin className="w-8 h-8" />,
    discord: <FaDiscord className="w-8 h-8" />,
  };

  return (
    <div className="w-full bg-primary text-primary-content py-4">
      <div className="flex justify-between w-3/4 mx-auto lg:flex-col lg:w-4/5">
        <div className="grow flex mb-5 lg: sm:flex-col">
          <div className="w-full flex flex-col gap-2 mb-4">
            <div href="" className="font-b8" id="collection-header">
              {t("artina")}
            </div>
            <a href="/user-collections" className="mr-2 font-b3 collection-item">
              {t("collections")}
            </a>
            <a href="/commission" className="mr-2 font-b3 collection-item">
              {t("wage")}
            </a>
            <a href="/support" className="mr-2 font-b3 collection-item">
              {t("support")}
            </a>
            <a href="/exhibition-list" className="mr-2 font-b3 collection-item">
              {t("allExhibiotions")}{" "}
            </a>
            <a href="/whitepaper" className="mr-2 font-b3 collection-item">
              {t("whitePaper")}
            </a>
          </div>

          <div className="w-full flex flex-col gap-2 mb-4">
            <div href="" className="font-b8">
              {t("facilities")}
            </div>
            <a href="https://metaverse.artina.org/" className="mr-2 font-b3">
              {t("metaverse")}
            </a>
            <a href="/FAQ" className="mr-2 font-b3">
              {t("FAQ")}
            </a>
            <a href="/ai" className="mr-2 font-b3">
              {t("AIimageGenerator")}{" "}
            </a>
            <a href="https://artina.org" onClick={() => Notify.warning(t("addingLater"))} className="mr-2 font-b3">
              {t("blog")}
            </a>
          </div>
          <div className="w-full flex flex-col gap-2 mb-4">
            <div className="font-b8">{t("guide")}</div>
            <a href="help-create-wallet" className="mr-2 font-b3">
              {t("makeWallet")}
            </a>
            <a href="/help-mint" className="mr-2 font-b3">
              {t("NFTAddGuide")}{" "}
            </a>
            <a href="/help-create-exhibition" className="mr-2 font-b3">
              {t("createExhibition")}
            </a>
            <a href="/privacy-policy" className="mr-2 font-b3">
              {t("terms")}{" "}
            </a>
          </div>
        </div>
        <div className="w-auto flex shrink-0 gap-2 items-start lg:justify-center">
          <div className="flex items-center justify-center p-3 rounded-xl border-2 border-secondary">
            <div className="w-[110px] h-[110px] sm:w-[75px] sm:h-[75px]">
              <img width="110" height="110" referrerPolicy="origin" id="rgvjwlaojzpejxlznbqeoeuk" className="cursor-pointer" onClick={() => window.open("https://logo.samandehi.ir/Verify.aspx?id=347128&p=xlaoaodsjyoerfthuiwkmcsi", "Popup", "toolbar=no, scrollbars=no, location=no, statusbar=no, menubar=no, resizable=0, width=450, height=630, top=30")} alt="logo-samandehi" src="https://logo.samandehi.ir/logo.aspx?id=347128&p=qftishwlyndtnbpdodrfaqgw" />
            </div>
          </div>
          <div className="flex items-center justify-center p-3 rounded-xl border-2 border-secondary">
            <a className="w-[110px] h-[110px] sm:w-[75px] sm:h-[75px]" referrerPolicy="origin" target="_blank" href="https://trustseal.enamad.ir/?id=339851&amp;Code=F4HSRl9q4dYEext5JuBT" rel="noreferrer">
              <img width="110" height="110" referrerPolicy="origin" src="https://Trustseal.eNamad.ir/logo.aspx?id=339851&amp;Code=F4HSRl9q4dYEext5JuBT" alt="" className="cursor-pointer" id="F4HSRl9q4dYEext5JuBT"></img>
            </a>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-center gap-3 mt-3">
        <div className="rounded-md p-1 cursor-pointer" onClick={() => window.open("https://instagram.com/artinanft?igshid=MzNlNGNkZWQ4Mg==")}>
          {icons.instagram}
        </div>
        <div className=" rounded-md p-1 cursor-pointer" onClick={() => window.open("https://t.me/artinanft")}>
          {icons.telegram}
        </div>
        <div className="rounded-md p-1 cursor-pointer" onClick={() => window.open("https://twitter.com/artina_nft?t=19-DEqjd_wl8kLxETYPZXg&s=09")}>
          {icons.twitter}
        </div>
        <div className="rounded-md p-1 cursor-pointer" onClick={() => window.open("https://www.linkedin.com/in/artina-nft-a8a66427a")}>
          {icons.linkedin}
        </div>
        <div className=" rounded-md p-1 cursor-pointer" onClick={() => window.open("https://discord.gg/6vXcZ2vZ")}>
          {icons.discord}
        </div>
      </div>
      <div className="bg-primary-content mt-3 bg-clip-text text-transparent mx-auto text-center">Copyright ©2023 by Artina - All rights reserved</div>
    </div>
  );
};

export default Footer;
