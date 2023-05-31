import { Dialog } from "primereact/dialog";
import React, { useEffect } from "react";
import { useState } from "react";
import BorderButton from "../../Buttons/BorderButton";
import { Button } from "primereact/button";
import axios from "axios";
import SimpleInput from "../../Inputs/SimpleInput";
import { Notify } from "notiflix";
import NftRequestsCard from './../../Cards/UserDashboardCards/NftRequestsCard';

const ApplicationReqDialog = ({ user }) => {
  const [visible, setVisible] = useState(false);
  const [getData, setData] = useState();
  const [isCharge, setIsCharge] = useState(false);
  const [amount, setAmount] = useState();

  useEffect(() => {
    axios
      .get(`https://api.artina.org/api/account/userpicture/${user}/`, {})
      .then(res => {
        setData(res.data);
      })
      .catch(() => {});
  }, []);
  useEffect(() => {
    // axios
    //   .get("https://api.artina.org/api/account/user-balance/get_balance/", {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
    //     },
    //     mode: "cors",
    //   })
    //   .then((res) => {
    //     setData(res.data);
    //   })
    //   .catch((e) => {
    //   });
  }, []);

  const Footer = (
    <div className="flex gap-5">
      <BorderButton
        onClick={() => setVisible(false)}
        className="w-full font-b4 text-center"
      >
        لغو
      </BorderButton>

      {/* <BorderButton
        className={"w-full font-b4 text-center"}
       
      >
        شارژ کیف پول
      </BorderButton> */}
    </div>
  );

  const Header = (
    <div>
      <p className="font-b9">تست</p>
    </div>
  );

  return <div className="card flex justify-content-center">
      <NftRequestsCard image={getData ? getData.profile_picture : ""} firstName={getData ? getData.first_name : ""} lastName={getData ? getData.last_name : ""} onClick={() => setVisible(true)} />

      <Dialog header={Header} visible={visible} style={{ width: "25vw", direction: "rtl" }} onHide={() => setVisible(false)} footer={Footer} className="font-b4" />
    </div>;
};

export default ApplicationReqDialog;
