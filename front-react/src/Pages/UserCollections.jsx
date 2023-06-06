import TestLayout from "../Layouts/TestLayout";
import { UserContext } from "../App";
import React, { useEffect, useState, useContext, useRef } from "react";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import NftRequestsCard from "./../components/Cards/UserDashboardCards/NftRequestsCard";
import ApplicationReqDialog from "../components/Dialog/ApplicationReqDialog/ApplicationReqDialog";
import axios from "axios";

const UserCollections = () => {
  const user = useContext(UserContext);
  const [getData, setData] = useState();

  useEffect(() => {
    axios
      .get(
        `https://api.artina.org/api/exhibition/applications/exhibitor_applications/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      <TestLayout>
        <SimpleCard className={"bg-white flex flex-col items-center mt-8"}>
          <div className="text-4xl font-b9 mb-6">لیست درخواست ها</div>
          <div className="grid gap-4 grid-cols-4">
            {getData
              ? getData.map((item, index) => (
                  <>
                    <NftRequestsCard
                      image={getData ? getData.profile_picture : ""}
                      firstName={getData ? getData.first_name : ""}
                      lastName={getData ? getData.last_name : ""}
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
