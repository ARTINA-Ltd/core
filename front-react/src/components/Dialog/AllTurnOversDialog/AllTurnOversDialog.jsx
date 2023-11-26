import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

export default function AllTurnOversDialog({ turnovers }) {
  const [visible, setVisible] = useState(false);

  const footerContent = (
    <div>
      <Button
        label="لغو"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="p-button-text"
      />
    </div>
  );

  const Header = (
    <div>
      <p className="font-b7">فروش nft</p>
    </div>
  );

  return (
    <div className="card flex justify-content-center">
      <div
        className="w-full bg-slate-50 cursor-pointer mt-3 py-1 group rounded-lg text-center flex items-center justify-center gap-4"
        onClick={() => setVisible(true)}
      >
        مشاهده همه
        <div className="pl-4 align-middle group-hover:-translate-x-2 transition-all duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.3"
            stroke="currentColor"
            width={"1em"}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </div>
      </div>

      <Dialog
        header={Header}
        visible={visible}
        style={{ width: "50vw", direction: "rtl" }}
        onHide={() => setVisible(false)}
        footer={footerContent}
      >
        <table className="dashboard-table w-full text-center">
          <thead>
            <tr>
              <th>واحد ارز</th>
              <th>نوع تراکنش </th>
              <th>مقدار(تومان) </th>
              <th />
            </tr>
          </thead>

          <tbody>
            {turnovers ? (
              turnovers.map((item, index) => (
                <tr className="group cursor-pointer hover:bg-slate-50 rounded-xl transition-all font-b4">
                  <td>{item.transaction_currency === 1 ? "تومان" : "اتریوم"}</td>
                  <td>{item.transaction_type === 2 ? "برداشت" : "واریز"}</td>

                  <td>{item.transaction_value} تومان</td>

                  <td className="pl-4 align-middle group-hover:-translate-x-2 transition-all duration-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.3"
                      stroke="currentColor"
                      width={"1em"}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                      />
                    </svg>
                  </td>
                </tr>
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </Dialog>
    </div>
  );
}
