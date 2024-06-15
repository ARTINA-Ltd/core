import React from "react";
import { useTranslation } from "react-i18next";

export default function Commissionmax() {
  const { t } = useTranslation("wage");
  return (
    <div className="m-8 sm:m-2 sm:text-[10px] bg-base-200 rounded-md overflow-hidden">
      <table className="w-full">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-primary text-primary-content sm:px-2">{t("table2.h1")}</th>
            <th className="py-2 px-4 bg-primary text-primary-content sm:px-2">{t("table2.h2")}</th>
            <th className="py-2 px-4 bg-primary text-primary-content sm:px-2">{t("table2.h3")}</th>
            <th className="py-2 px-4 bg-primary text-primary-content sm:px-2">{t("table2.h4")}</th>
            <th className="py-2 px-4 bg-primary text-primary-content sm:px-2">{t("table2.h5")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 bg-secondary text-secondary-content sm:px-2">{t("table2.r1")}</td>
            <td className="py-2 px-4 sm:px-2">15 USDT</td>
            <td className="py-2 px-4 sm:px-2">10 USDT</td>
            <td className="py-2 px-4 sm:px-2">500 USDT</td>
            <td className="py-2 px-4 sm:px-2">{t("table2.r1-c4")}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 bg-secondary text-secondary-content sm:px-2">{t("table2.r2")}</td>
            <td className="py-2 px-4 sm:px-2">0.5 USDT</td>
            <td className="py-2 px-4 sm:px-2">0 USDT</td>
            <td className="py-2 px-4 sm:px-2">10 USDT</td>
            <td className="py-2 px-4 sm:px-2">؟</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
