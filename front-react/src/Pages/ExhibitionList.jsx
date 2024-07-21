import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import BuyTicketDialog from "../components/Dialog/BuyTicketDialog/BuyTicketDialog";
import ExhibitionCard from "./../components/Cards/ExhibitionCard/ExhibitionCard";
import TestLayout from "../Layouts/TestLayout.jsx";

const ExhibitionList = () => {
  const [getData, setData] = useState();
  useEffect(() => {
    if (localStorage.getItem("authTokens") != "null") {
      axios
        .get("https://api.artina.org/api/exhibition/ExTicketViewSet/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
          mode: "cors",
        })
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios.get("https://api.artina.org/api/exhibition/exhibitions/").then((res) => {
        console.log(res.data);
        setData(res.data);
      });
    }
  }, []);

  const handleTicket = (item) => {
    if (item.has_ticket && item.user_has_ticket) {
      return (
        <div className="flex items-center gap-1 font-b4 text-lg">
          <div className="bg-blue-50 text-blue-800 rounded-lg px-4 py-1 opacity-70">شما بلیت این نمایشگاه را دارید</div>
        </div>
      );
    } else if (item.has_ticket && !item.user_has_ticket) {
      return (
        <div className="flex items-center gap-1 font-b4 text-lg">
          <div className="bg-red-50 text-red-800 rounded-lg px-4 py-1 opacity-70">شما بلیت این نمایشگاه را ندارید</div>
          <BuyTicketDialog onClick={(event) => event.stopPropagation()} price={item.price} exhibitionId={item.id} exhibitionName={item.marketName} hasLogin={localStorage.getItem("authTokens") == "null" ? false : true} />
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-1 w-1/2 md:w-full  font-b4 text-lg">
          <div className="bg-sky-50 text-sky-700 w-full text-center text-sm rounded-xl py-1 opacity-70">نمایشگاه رایگان</div>
        </div>
      );
    }
  };
  // };

  return (
    <TestLayout>
      <div s className={`bg-primary rounded-3xl `}>
        <Fragment>
          <div className={`flex gap-8 flex-wrap  p-4 w-full h-full overflow-auto items-stretch `}>
            {getData
              ? getData.map((item) => {
                  return item.image && <ExhibitionCard key={item.id} name={item.marketName} user={item.user} image={item.image} id={item.id} startDate={item.start_date} endDate={item.end_date} description={item.description} deadLine={item.application_deadline} hasTicket={item.has_ticket} userHasTicket={item.user_has_ticket} price={item.price} handleTicket={handleTicket(item)} />;
                })
              : ""}
          </div>
        </Fragment>
      </div>
    </TestLayout>
  );
};

export default ExhibitionList;
