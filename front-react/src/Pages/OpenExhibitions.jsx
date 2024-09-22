import React, { Fragment, useEffect, useState } from "react";
import TestLayout from "../Layouts/TestLayout";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import { useNavigate } from "react-router";
import axios from "axios";
import ExhibitionCard from "../components/Cards/ExhibitionCard/ExhibitionCard.jsx";

const OpenExhibitions = () => {
  const [getData, setData] = useState();
  const navigate = useNavigate();

  const authTokens = JSON.parse(localStorage.getItem("authTokens"));

  useEffect(() => {
    axios
      .get("https://api.artina.org/api/exhibition/open-for-artist-registration-exhibitions/", {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
        mode: "cors",
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((res) => console.log(res));
  }, []);

  return (
    <TestLayout>
      <div s className={`bg-[#4e45d0] rounded-3xl`}>
        <Fragment>
          <div className={`flex gap-8 flex-wrap  p-4 w-full h-full overflow-auto items-stretch `}>
            {getData
              ? getData.map((item, index) => {
                  return item.image && <ExhibitionCard key={item.id} name={item.marketName} user={item.user} image={item.image} id={item.id} startDate={item.start_date} endDate={item.end_date} description={item.description} deadLine={item.application_deadline} hasTicket={item.has_ticket} userHasTicket={item.user_has_ticket} price={item.price} />;
                })
              : ""}
          </div>
        </Fragment>
      </div>
    </TestLayout>
  );
};

export default OpenExhibitions;
