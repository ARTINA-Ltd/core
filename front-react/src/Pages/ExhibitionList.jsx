import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import ExhibitionCard from "./../components/Cards/ExhibitionCard/ExhibitionCard";
import TestLayout from "../Layouts/TestLayout.jsx";
import { useNavigate } from "react-router";
import { Notify } from "notiflix";
import i18n from "./../i18n";
import { useTranslation } from "react-i18next";



const ExhibitionList = () => {
  const navigate = useNavigate();
  const [getData, setData] = useState([]);
  const [selectedExhibition, setSelectedExhibition] = useState(null);

  const { t } = useTranslation("exhibitionList");

  useEffect(() => {
    if (!localStorage.getItem("authTokens")) {
      navigate("/");
      Notify.warning("Please log in to your account");
      return;
    }

    axios
      .get("https://api.artina.org/api/exhibition/ExTicketViewSet/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
        mode: "cors",
      })
      .then((res) => {
        setData(res.data);
        console.log("in:", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);

  const handleBuyTicketClick = (exhibition) => {
    setSelectedExhibition(exhibition);
    document.getElementById("confirmTicketDialog").showModal(); // Show the dialog
  };

  const handleConfirmBuyTicket = () => {
    axios.post("https://api.artina.org/api/exhibition/Ticket/buy_ticket/", {
      exhibition_id: selectedExhibition.id
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
      },
      mode: "cors",
    }).then((res) => {
      console.log("Buying ticket for:", selectedExhibition);
      document.getElementById("confirmTicketDialog").close();
      Notify.success(t("TicketPurchasedSuccessfully"));
      console.log(res);
    }).catch((err) => {
      if (err.response.status === 400 && err.response.data.error === "you have the ticket.") {
        Notify.warning(t("youHaveAlreadyTicket"));
      }
      if (err.response.status === 400 && err.response.data.error === "insufficient balance.") {
        Notify.failure(t("insufficientBalance"));
      }
    });



  };

  const handleTicket = (item) => {
    if (item.has_ticket && item.user_has_ticket) {
      return (
        <div className="flex items-center gap-1 font-b4 text-lg">
          <div className="bg-blue-50 text-blue-800 rounded-lg px-4 py-1 opacity-70">{t("youHaveAlreadyTicket")}</div>
        </div>
      );
    } else if (item.has_ticket && !item.user_has_ticket) {
      return (
        <div className="flex items-center gap-1 font-b4 lg:text-xs text-lg">
          <div className="bg-red-50 text-red-800 rounded-lg px-4 py-1 opacity-70">{t("youNotHaveTicket")}</div>
          <button
            onClick={() => handleBuyTicketClick(item)}
            className="bg-green-500 text-white rounded-lg px-4 py-1 ml-2"
          >
            {t("buyTicket")}
          </button>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-1 w-1/2 md:w-full lg:text-xs font-b4 text-lg">
          <div className="bg-sky-50 text-sky-700 w-full text-center text-sm rounded-xl py-1 opacity-70">{t("freeExhibition")}</div>
        </div>
      );
    }
  };

  return (
    <TestLayout>
      <Fragment>
        <div className={`flex gap-8 flex-wrap p-4 w-full h-full overflow-auto items-stretch`}>
          {getData.length > 0
            ? getData.map((item) => (
              item.image && (
                <ExhibitionCard
                  key={item.id}
                  name={item.marketName}
                  user={item.user}
                  image={item.image}
                  id={item.id}
                  startDate={item.start_date}
                  endDate={item.end_date}
                  description={item.description}
                  deadLine={item.application_deadline}
                  hasTicket={item.has_ticket}
                  userHasTicket={item.user_has_ticket}
                  price={item.price}
                  handleTicket={handleTicket(item)}
                />
              )
            ))
            : "Loading exhibitions..."}
        </div>
      </Fragment>

      {/* Confirmation Dialog */}
      <dialog
        id="confirmTicketDialog"
        className={`${i18n.dir() === "rtl" ? "text-right" : "text-left"} modal relative p-0 m-0 `}
      >
        <div className="modal-box p-0 m-0 bg-white">
          <form method="dialog">
            <button
              onClick={() => document.getElementById("confirmTicketDialog").close()} // Close the dialog when X is clicked
              className="btn btn-sm btn-circle btn-ghost hover:bg-red-500 right-2 my-4 mx-4 mb-4"
            >
              ✕
            </button>
          </form>
          <p className="py-4 z-10 mx-8">
            {t("areYouSureBuyTicket-1")} {selectedExhibition?.marketName} {t("areYouSureBuyTicket-2")}
          </p>
          <div className="mx-4 items-start flex">
            <button
              onClick={handleConfirmBuyTicket}
              className={"btn bg-primary text-primary-content glass mx-auto my-4 px-6"}
            >
              {t("confirm")}
            </button>
          </div>
        </div>
      </dialog>
    </TestLayout>
  );
};

export default ExhibitionList;
