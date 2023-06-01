import TestLayout from "../Layouts/TestLayout";
import { UserContext } from "../App";
import React, { useEffect, useState, useContext, useRef } from "react";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import NftRequestsCard from "./../components/Cards/UserDashboardCards/NftRequestsCard";
import ApplicationReqDialog from "../components/Dialog/ApplicationReqDialog/ApplicationReqDialog";
import axios from "axios";

const RequestsList = () => {
  const user = useContext(UserContext);
  const [getData, setData] = useState();

  useEffect(() => {
    axios
      .get(`https://api.artina.org/api/exhibition/applications/exhibitor_applications/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
      })
      .then((res) => {
        console.log(res)
        setData(res.data);
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      <TestLayout>
        <div className="w-full justify-center flex gap-4">
          {/* <SimpleCard className="flex w-auto justify-center items-center gap-4 bg-white px-12 shrink-0">
            <img src={user ? user.data.profile_picture : ""} className="object-cover w-[300px] h-[300px] rounded-full " alt="" />
            <div className="grid gap-3">
              <div className="flex items-center gap-1 hover:bg-[#0000aa07] transition-all px-3 py-2 text-2xl font-b7 rounded-lg cursor-default">
                <div>
                  {user ? user.data.first_name : ""}
                </div>
                <div>
                  {user ? user.data.last_name : ""}
                </div>
              </div>
              <div className="flex items-center gap-1 hover:bg-[#0000aa07] transition-all px-3 py-2 text-2xl font-b2 rounded-lg cursor-default">
                <div>
                  {user ? user.data.username : ""}
                </div>
              </div>
            </div>
          </SimpleCard> */}
          <div className="flex w-full justify-center items-center gap-4">
            <img
              src={"/2.jpg"}
              className="w-full max-h-[500px] object-cover rounded-2xl"
              alt=""
            />
          </div>
        </div>

        <SimpleCard className={"bg-white flex flex-col items-center mt-8"}>
          <div className="text-4xl font-b9 mb-6">لیست درخواست ها</div>
          <div className="grid gap-4 grid-cols-4">
            {getData? getData.map((item , index)=>(
            <ApplicationReqDialog key={index} user={item.artist} nfts={item.nft} description={item.description} exhibition={item.exhibition} />

            )):''}
          </div>
        </SimpleCard>
      </TestLayout>
    </div>
  );
};

export default RequestsList;
