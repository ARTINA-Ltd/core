import FancyText from "@carefully-coded/react-text-gradient";
import { useTranslation } from "react-i18next";
import HeroBannerImage from "../../assets/images/HeroBanner.jpg"
const HeroBanner = () => {
  const { t } = useTranslation(["translation"]);
  return (
    <div className="relative w-full">
      <img src={HeroBannerImage} alt="Hero" className="w-full h-screen object-cover" />
      <div className="w-full top-0 left-0 opacity-50 h-screen bg-gradient-to-t from-violet-900 to-black absolute z-10"></div>
      <p className="leading-snug absolute text-6xl font-bold cursor-default capitalize text-white z-20 top-3/4 sm:top-1/2 sm:text-5xl mx max-w-[650px] mx-12 ">
        {t("bannerParaghraph.before")}{" "}
        <FancyText className={""} gradient={{ from: "#F305B8", to: "#00F0F7", type: "linear" }} animateTo={{ from: "#FFFFFF", to: "#F305B8" }} animateDuration={1000}>
          {t("bannerParaghraph.artina")}{" "}
        </FancyText>{" "}
        {t("bannerParaghraph.after")}{" "}
      </p>
    </div>
  );
};
export default HeroBanner;
