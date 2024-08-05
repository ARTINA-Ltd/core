import TestLayout from "../Layouts/TestLayout";
import React, { useEffect, useState } from "react";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import ApplicationReqDialog from "../components/Dialog/ApplicationReqDialog/ApplicationReqDialog";
import axios from "axios";
import { useTranslation } from "react-i18next";
import imageTwo from "../assets/images/2.jpg";

const RequestsList = () => {
  const [getData, setData] = useState(null);
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
          <SimpleCard className="bg-primary flex flex-col relative gap-4 items-center justify-center overflow-hidden w-[90%] h-60 mx-auto mb-5 md:h-72 sm:h-52">
            <div className="text-primary-content text-6xl mb-4 z-10 font-b7 sm:text-3xl">{t("requestList")}</div>
          </SimpleCard>
        </div>

        <SimpleCard className={"bg-base flex flex-col mt-8"}>
          <div className="flex flex-wrap gap-4">
            {getData && getData.length > 0 ? (
              getData.map((item, index) => (
                <>
                  <ApplicationReqDialog key={index} user={item.artist} nfts={item.nft} description={item.description} exhibition={item.exhibition} application={item.id} />
                </>
              ))
            ) : (
              <div className="bg-error text-error-content mx-auto px-4 py-2 rounded-md">{t("nothingYet")}</div>
            )}
          </div>
        </SimpleCard>
      </TestLayout>
    </div>
  );
};

export default RequestsList;
