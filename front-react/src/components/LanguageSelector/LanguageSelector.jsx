import { Fragment, React } from "react";
import { useTranslation } from "react-i18next";
import { IoLanguage } from "react-icons/io5";
import i18n from "../../i18n";

const LanguageSelector = () => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <div className="dropdown z-20 dropdown-hover ease-in-out duration-300 transition-all">
        <div tabIndex={0} role="button" className="btn border-none shadow-none">
          <IoLanguage className="w-8 h-8 text-[#6860db] hover:text-[#4e45d0] ease-in-out " />
        </div>
        <ul tabIndex={0} className="dropdown-content z-[10] menu p-2  bg-white rounded-box w-52 border-none">
          <li
            onClick={() => {
              i18n.changeLanguage("fa");
              window.location.reload();
            }}
            className="p-4 cursor-pointer font-bold  hover:text-[#4e45d0]"
          >
            {t("farsi")}
          </li>
          <li
            onClick={() => {
              i18n.changeLanguage("en");
              window.location.reload();
            }}
            className="p-4 cursor-pointer font-bold  hover:text-[#4e45d0]"
          >
            {t("english")}
          </li>
        </ul>
      </div>
    </Fragment>
  );
};
export default LanguageSelector;
