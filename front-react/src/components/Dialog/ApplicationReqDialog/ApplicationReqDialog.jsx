import { Dialog } from "primereact/dialog";
import React, { useEffect } from "react";
import { useState } from "react";
import BorderButton from "../../Buttons/BorderButton";
import { Button } from "primereact/button";
import axios from "axios";
import SimpleInput from "../../Inputs/SimpleInput";
import { Notify } from "notiflix";
import NftRequestsCard from "./../../Cards/UserDashboardCards/NftRequestsCard";

const ApplicationReqDialog = ({ user, nfts = [], description, exhibition }) => {
  const [visible, setVisible] = useState(false);
  const [getData, setData] = useState();
  const [getExhebition, setExhebition] = useState();
  const [nftDetails, setNftDetails] = useState([]);
  const [isCharge, setIsCharge] = useState(false);
  const [amount, setAmount] = useState();
  const [tokens, setTokens] = useState();

  //'accept', 'ignored'
  //{
  //   action: 'accept'
  // }
  useEffect(() => {
    axios
      .get(`https://api.artina.org/api/account/userpicture/${user}/`, {
        action: "accept",
      })
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {});
    for (let i = 0; i < nfts.length; i++) {
      axios
        .get(`https://api.artina.org/api/transaction/nfts/${nfts[i]}/`, {})
        .then((res) => {
          if (!nftDetails.includes(res.data)) {
            setNftDetails((prev) => [...prev, res.data]);
          }
        })
        .catch(() => {});
    }
  }, []);
  useEffect(() => {
    console.log(nftDetails)
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
  }, [nftDetails]);

  const Footer = (
    <div className="flex gap-5">
      <BorderButton
        onClick={() => setVisible(false)}
        className="w-full font-b4 text-center"
      >
        لغو
      </BorderButton>

      <BorderButton
        onClick={() => setVisible(false)}
        className="w-full font-b4 text-center"
      >
        رد
      </BorderButton>

      <BorderButton
        onClick={() => setVisible(false)}
        className="w-full font-b4 text-center"
      >
        تایید
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

  return (
    <div className="card flex justify-content-center">
      <NftRequestsCard
        image={getData ? getData.profile_picture : ""}
        firstName={getData ? getData.first_name : ""}
        lastName={getData ? getData.last_name : ""}
        onClick={() => setVisible(true)}
      />

      <Dialog
        header={Header}
        visible={visible}
        style={{ width: "25vw", direction: "rtl" }}
        onHide={() => setVisible(false)}
        footer={Footer}
        className="font-b4"
      >
        <div className={`flex flex-col w-full gap-4 font-b4 items-center`}>
          <img
            src={getData ? getData.profile_picture : ""}
            className="h-[250px] w-[250px] shrink-0 object-cover rounded-full"
            alt=""
          />
          <div className="flex gap-1 text-2xl font-b6">
            <div>{getData ? getData.first_name : ""}</div>
            <div>{getData ? getData.last_name : ""}</div>
          </div>
        </div>
<div className="w-full rounded-2xl m-4 bg-slate-100 text-slate-400 px-4 py-2 font-b5">توضیحات:{description}</div>
        {nftDetails.map((item,index)=>(
            <tr
                  className="border-t group cursor-pointer transition duration-100 w-full  hover:bg-[#0000ff08] font-b4"
                  key={index}
                  // onClick={() => navigate(`/nft-details/${item.token_id}`)}
                >
                  <td className="whitespace-nowrap px-6 font-medium sm:pl-2 sm:pr-3">
                    <img
                      src={item.image_url}
                      className="rounded-lg h-[60px] w-[60px] object-cover my-1 sm:h-[90px] sm:w-[90px]"
                      alt=""
                    />
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 sm:px-1 sm:w-2/5">{item.name}</td>
                  <td className="whitespace-nowrap px-6 py-4 sm:px-1">{item.last_price}</td>
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
        ))}
      </Dialog>
    </div>
  );
};

export default ApplicationReqDialog;
