import { Fragment, React } from "react";
import { useTranslation } from "react-i18next";
import { IoLanguage } from "react-icons/io5";
import i18n from "../../i18n";

const LanguageSelector = () => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <div className="dropdown z-20 dropdown-hover text-2xl ease-in-out duration-300 transition-all">
        <div tabIndex={0} role="button" className="btn bg-transparent hover:bg-base-200 w-full border-none shadow-none">
          <IoLanguage className="w-8 h-8 text-primary hover:text-secondary ease-in-out " />
        </div>
        <ul tabIndex={0} className="dropdown-content z-[10] menu p-2  bg-base-100 rounded-box w-52 border-none">
          <li
            onClick={() => {
              i18n.changeLanguage("fa");
              window.location.reload();
            }}
            className="p-2 cursor-pointer font-bold  hover:text-primary"
          >
            {t("farsi")}
          </li>
          <li
            onClick={() => {
              i18n.changeLanguage("en");
              window.location.reload();
            }}
            className="p-2 cursor-pointer font-bold  hover:text-primary"
          >
            {t("english")}
          </li>
        </ul>
      </div>
    </Fragment>
  );
};
export default LanguageSelector;
