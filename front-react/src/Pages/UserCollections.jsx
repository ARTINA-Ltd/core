import TestLayout from "../Layouts/TestLayout";
import React, { useEffect, useState } from "react";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import NftRequestsCard from "./../components/Cards/UserDashboardCards/NftRequestsCard";
import axios from "axios";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const UserCollections = () => {
  const [getData, setData] = useState();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get(`https://api.artina.org/api/transaction/UsersWithNFTsViewSet/`)
      .then((res) => {
        setData(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);
  return (
    <div>
      <TestLayout>
        <SimpleCard className="bg-[#4e45d0] flex flex-col relative gap-4 items-center justify-center overflow-hidden w-full h-96 md:h-72 sm:h-64">
          <img alt="" src="/mand1.png" className=" opacity-[15%] absolute top-1/2 -translate-y-1/2 pointer-events-none overflow-hidden" />
          <div className="text-white text-6xl mb-2 z-10 font-b7">{t("collections")}</div>
        </SimpleCard>
        <SimpleCard className={"bg-base-100 flex flex-col items-center mt-8 py-8"}>
          <div className="text-4xl font-b9 mb-6">{t("artistsList")}</div>
          <div className="grid gap-10 grid-cols-3 lg:grid-cols-2 md:grid-cols-1">
            {getData
              ? getData.map((item) => (
                  <div>
                    <NftRequestsCard image={item.profile_picture} firstName={item.username} verified={item.user_verified} nftCount={item.nft_count} onClick={() => navigate(`/collections/${item.username}`)} />
                  </div>
                ))
              : null}
          </div>
        </SimpleCard>
      </TestLayout>
    </div>
  );
};

export default UserCollections;
