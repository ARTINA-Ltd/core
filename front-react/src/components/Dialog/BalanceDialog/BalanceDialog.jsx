import { Dialog } from "primereact/dialog";
import React, { useEffect } from "react";
import { useState } from "react";
import BorderButton from "../../Buttons/BorderButton";
import { Button } from "primereact/button";
import axios from "axios";
import SimpleInput from "../../Inputs/SimpleInput";

const BalanceDialog = () => {
  const [visible, setVisible] = useState(false);
  const [getData, setData] = useState();
  const [isCharge, setIsCharge] = useState(false);

  useEffect(() => {
    axios
      .get("https://api.artina.org/api/account/user-balance/get_balance/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
        mode: "cors",
      })
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((e) => {
        console.log(localStorage.getItem("authTokens"));
      });
  }, []);

  const Footer = (
    <div className="flex gap-5">
      <BorderButton
        onClick={() => setVisible(false)}
        className="w-full font-b4 text-center"
      >
        لغو
      </BorderButton>

      <BorderButton
        className={"w-full font-b4 text-center"}
        onClick={() => setIsCharge(true)}
        autoFocus
      >
        شارژ کیف پول
      </BorderButton>
    </div>
  );

  const Header = (
    <div>
      <p className="font-b9">کیف پول</p>
    </div>
  );

  return (
    <div className="card flex justify-content-center">
      <div
        className="px-2 py-1 rounded-xl hover:bg-[#e1e1e1] bg-[#f1f1f1] transition-all cursor-pointer"
        onClick={() => setVisible(true)}
      >
        کیف پول
      </div>
      <Dialog
        header={Header}
        visible={visible}
        style={{ width: "25vw", direction: "rtl" }}
        onHide={() => setVisible(false)}
        footer={Footer}
        className="font-b4"
      >
        {!isCharge ? (
          <div className="w-full flex gap-4 flex-col items-center font-b4">
            <div className="bg-[#fafafa] border-r-[2px] border-[#4e45d0] w-full py-3 px-2 flex justify-between">
              <div>موجودی ریالی قابل معامله :</div>
              <div>{getData ? getData.rial_available_balance : ""}</div>
            </div>
            <div className="bg-[#fafafa] border-r-[2px] border-[#4e45d0] w-full py-3 px-2 flex justify-between">
              <div>موجودی ریالی غیر قابل معامله: </div>{" "}
              <div>{getData ? getData.rial_unavailable_balance : ""}</div>
            </div>
            <div className="bg-[#fafafa] border-r-[2px] border-[#4e45d0] w-full py-3 px-2 flex justify-between">
              <div>موجودی اتریوم</div>
              <div>{getData ? getData.eth_balance : ""}</div>
            </div>
          </div>
        ) : (
          <div className="w-full flex gap-4 flex-col items-center font-b4 mt-2">
            <SimpleInput
        
                type="text"
                title="مقدار"
                placeholder="مثلا: 654"
                validationError="نمیتواند خالی باشد"
                
              />
            
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default BalanceDialog;
