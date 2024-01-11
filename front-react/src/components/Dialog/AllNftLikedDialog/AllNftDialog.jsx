import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useNavigate } from "react-router";


export default function AllNftDialog({ likedNfts }) {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();


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
      <p className="font-b7">nft های پسندیده شده</p>
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
        style={{ direction: "rtl" }}
        onHide={() => setVisible(false)}
        footer={footerContent}
        className="w-[50vw] sm:w-[90%]"
      >
        <table className="dashboard-table w-full text-center">
          <thead>
            <tr>
              <th className="text-md font-b4">عکس nft</th>
              <th className="text-md font-b4">نام</th>
              <th className="text-md font-b4">قیمت</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {likedNfts ? (
              likedNfts.map((item, index) => (
                <tr
                  className="group cursor-pointer hover:bg-slate-50 rounded-xl transition-all font-b4 sm:text-xs"
                  onClick={() => navigate(`/nft-details/${item.token_id}`)}
                  key={index}
                >
                  <td>
                    <div className="flex justify-center w-full">
                      <img
                        src={item.image_url}
                        alt=""
                        className="w-[42px] h-[42px] rounded-xl"
                      />
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.last_price}</td>

                  <td className="pl-4 align-middle group-hover:-translate-x-2 transition-all duration-200 sm:pl-2">
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
