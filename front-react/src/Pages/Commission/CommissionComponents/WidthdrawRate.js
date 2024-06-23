import { useTranslation } from "react-i18next";

export default function WidthdrawRate() {
  const { t } = useTranslation("wage");
  return (
    <div>
      <div className="m-8 sm:m-2 sm:text-[10px] bg-base-200 rounded-md overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-primary text-primary-content">{t("table3.h1")}</th>
              <th className="py-2 px-4 bg-primary text-primary-content">{t("table3.h2")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 bg-secondary text-secondary-content">{t("table3.r1")}</td>
              <td className="py-2 px-4">{t("table3.c1")}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 bg-secondary text-secondary-content">{t("table3.r2")}</td>
              <td className="py-2 px-4">{t("table3.c2")}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 bg-secondary text-secondary-content">{t("table3.r3")}</td>
              <td className="py-2 px-4">{t("table3.c3")}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
