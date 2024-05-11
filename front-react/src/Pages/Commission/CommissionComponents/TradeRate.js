import React from "react";
import { useTranslation } from "react-i18next";

export default function TradeRate() {
  const { t } = useTranslation(["wage"]);
  return (
    <div className="m-8 sm:m-2 sm:text-[14px]">
      <table className="w-full">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-indigo-700 text-white">{t("table1.h1")}</th>
            <th className="py-2 px-4 bg-indigo-700 text-white">{t("table1.h2")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 bg-indigo-300">{t("table1.r1")}</td>
            <td className="py-2 px-4">0.35%</td>
          </tr>
          <tr>
            <td className="py-2 px-4 bg-indigo-300">{t("table1.r2")}</td>
            <td className="py-2 px-4">0.3%</td>
          </tr>
          <tr>
            <td className="py-2 px-4 bg-indigo-300">{t("table1.r3")}</td>
            <td className="py-2 px-4">0.25%</td>
          </tr>
          <tr>
            <td className="py-2 px-4 bg-indigo-300">{t("table1.r4")}</td>
            <td className="py-2 px-4">0.2%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
