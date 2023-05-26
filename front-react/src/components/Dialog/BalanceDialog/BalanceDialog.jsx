import { Dialog } from "primereact/dialog";
import React, { useEffect } from "react";
import { useState } from "react";
import BorderButton from "../../Buttons/BorderButton";
import { Button } from "primereact/button";
import axios from "axios";
import SimpleInput from "../../Inputs/SimpleInput";
import { Notify } from "notiflix";

const BalanceDialog = () => {
  const [visible, setVisible] = useState(false);
  const [getData, setData] = useState();
  const [isCharge, setIsCharge] = useState(false);
  const [amount, setAmount] = useState();

  const updateBalance = () => {
    console.log(amount);
    axios
      .post(
        "https://api.artina.org/api/account/user-balance/updating_balance/",
        {
          currency: "rial",
          amount: amount,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
          mode: "cors",
        }
      )
      .then(() => Notify.success("با موفقیت شارژ شد"))
      .catch(() => Notify.failure("خطا"))
  };
  useEffect(() => {
    axios
      .get("https://api.artina.org/api/account/user-balance/get_balance/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
        mode: "cors",
      })
      .then((res) => {
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
        onClick={() => {
          if (isCharge == true) {
            updateBalance();
          } else {
            setIsCharge(true);
          }
        }}
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

      <div className="w-full cursor-pointer py-2 px-3 text-sm hover:bg-[#0000aa07]"
        onClick={() => setVisible(true)}
        >کیف پول</div>

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
              type="number"
              title="مقدار"
              placeholder="مثلا: 654"
              isValid={amount != ""}
              validationError="نمیتواند خالی باشد"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default BalanceDialog;
