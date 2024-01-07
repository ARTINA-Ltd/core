import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import BorderButton from './../../Buttons/BorderButton';
import { useNavigate } from "react-router";


export default function BuyTicketDialog({ onClick, exhibitionId, price, exhibitionName, hasLogin }) {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  // const [amount, setAmount] = useState();


  const buyTicket = () => {
    if (!hasLogin) {
      navigate("/login");
    }
    else {
      axios.post(
        "https://api.artina.org/api/exhibition/Ticket/buy_ticket/",
        {
          exhibition_id: exhibitionId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
          mode: "cors",
        }
      ).then((res) => { window.open(res.data.url) }).catch(console.log);
    }
  };

  const footerContent = (
    <div className="w-full flex justify-end font-b4" onClick={buyTicket}>



      <BorderButton size="lg">پرداخت</BorderButton>
    </div>

  );


  const Header = (
    <div>
      <p className="font-b7">خرید بلیت نمایشگاه <span className="text-[#4e45d0]">"{exhibitionName}"</span></p>
    </div>
  );


  return (
    <div className="card flex justify-content-center" onClick={onClick}>
      <div className="bg-indigo-50 hover:bg-indigo-100 transition-all duration-100 ease-out text-indigo-800 rounded-lg px-4 py-1 opacity-70" onClick={() => setVisible(true)}>
        خرید بلیت
      </div>
      <Dialog
        header={Header}
        visible={visible}
        style={{ width: "50vw", direction: "rtl" }}
        onHide={() => setVisible(false)}
        footer={footerContent}
      >
        <div className="flex font-b4 gap-2 items-center w-full justify-between">
          <div className="flex gap-2 items-center">
            <div className="">
              قیمت بلیت:
            </div>
            <div className="bg-slate-100 hover:bg-slate-200 transition-all py-1 px-3 rounded-md duration-75 ease-out cursor-default">
              {price} تومان
            </div>

          </div>

        </div>
      </Dialog>
    </div>
  );
}
