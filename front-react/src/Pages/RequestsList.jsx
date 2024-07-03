import TestLayout from "../Layouts/TestLayout";
import React, { useEffect, useState } from "react";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import ApplicationReqDialog from "../components/Dialog/ApplicationReqDialog/ApplicationReqDialog";
import axios from "axios";
import { useTranslation } from "react-i18next";

const RequestsList = () => {
  const [getData, setData] = useState();
  const { t } = useTranslation(["exhibitor"]);
  useEffect(() => {
    axios
      .get(`https://api.artina.org/api/exhibition/applications/exhibitor_applications/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      <TestLayout>
        <div className="w-full justify-center flex gap-4">
          <div className="flex w-full justify-center items-center gap-4">
            <img src={"/2.jpg"} className="w-full max-h-[500px] object-cover rounded-2xl" alt="" />
          </div>
        </div>

        <SimpleCard className={"bg-base flex flex-col mt-8"}>
          <div className="text-4xl font-b9 mb-6 sm:text-lg sm:font-b5">{t("requestList")}</div>
          <div className="flex flex-wrap gap-4">
            {getData
              ? getData.map((item, index) => (
                  <>
                    <ApplicationReqDialog key={index} user={item.artist} nfts={item.nft} description={item.description} exhibition={item.exhibition} application={item.id} />
                  </>
                ))
              : ""}
          </div>
        </SimpleCard>
      </TestLayout>
    </div>
  );
};

export default RequestsList;
