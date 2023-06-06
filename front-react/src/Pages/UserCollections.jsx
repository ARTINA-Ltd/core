import TestLayout from "../Layouts/TestLayout";
import { UserContext } from "../App";
import React, { useEffect, useState, useContext, useRef } from "react";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import NftRequestsCard from "./../components/Cards/UserDashboardCards/NftRequestsCard";
import ApplicationReqDialog from "../components/Dialog/ApplicationReqDialog/ApplicationReqDialog";
import axios from "axios";
import { useNavigate } from "react-router";

const UserCollections = () => {
  const user = useContext(UserContext);
  const [getData, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://api.artina.org/api/transaction/UsersWithNFTsViewSet/`)
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);
  return (
    <div>
      <TestLayout>
      <SimpleCard className="bg-[#4e45d0] flex flex-col relative gap-4 items-center justify-center overflow-hidden w-full h-96">
            <img
              src="/mand1.png"
              className=" opacity-[15%] absolute top-1/2 -translate-y-1/2 pointer-events-none overflow-hidden"
            />
            <div className="text-white text-6xl mb-2 z-10 font-b7">
مجموعه ها            </div>
            
          </SimpleCard>
        <SimpleCard className={"bg-white flex flex-col items-center mt-8"}>
          <div className="text-4xl font-b9 mb-6">لیست هنرمندان</div>
          <div className="grid gap-4 grid-cols-4">
            {getData
              ? getData.map((item, index) => (
                  <>
                    <NftRequestsCard
                      image={item.profile_picture}
                      firstName={item.username}
                      nftCount={item.nft_count}
                      onClick={() => navigate(`/collections/${item.username}`)}
                    />
                  </>
                ))
              : ""}
          </div>
        </SimpleCard>
      </TestLayout>
    </div>
  );
};

export default UserCollections;
