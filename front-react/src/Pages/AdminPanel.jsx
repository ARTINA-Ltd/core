import AuthPageCard from "./../components/Cards/AuthPageCard";
import { Link, useNavigate } from "react-router-dom";
import TicketCard from "../components/Cards/TicketCard.jsx";
import MetaVerseCard from "../components/Cards/MetaVerseCard.jsx";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import AdminLayout from "../Layouts/AdminLayout.jsx";
import { Fragment } from "react";
import { UserContext } from "../App.js";
import mand1 from "../assets/images/mand1.png"

const AdminPanel = () => {
  const [loading, setLoading] = useState(true);
  const [docApproval, setDocApproval] = useState(null);
  const [metaTickets, setMetaTickets] = useState(null);
  const [tickets, setTickets] = useState(null);
  const { t } = useTranslation();
  const user = useContext(UserContext);

  const navigate = useNavigate();

  if (user?.data?.role !== "supervisor") {
    navigate("/");
  }
  //sup
  useEffect(() => {
    axios
      .get("https://api.artina.org/api/supervisor/supervisor-tickets/metaverse_tickets/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
      })
      .then((e) => {
        setMetaTickets(e.data.slice(0, 4));
      })
      .catch((err) => {
        console.log(`there was an error${err}`);
      });

    axios
      .get("https://api.artina.org/api/supervisor/document-approvals/unseen_approvals/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
      })
      .then((e) => {
        setDocApproval(e.data.slice(0, 4));
      })
      .catch((err) => {
        console.log(`there was an error ${err}`);
      });

    axios
      .get("https://api.artina.org/api/supervisor/supervisor-tickets/unresponded_tickets/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
      })
      .then((e) => {
        setTickets(e.data.slice(0, 4));
        setLoading(false);
      })
      .catch((err) => {
        console.log(`there was an error:/ ${err}`);
      });
  }, []);

  return (
    <AdminLayout>
      <Fragment>
        {loading === false ? (
          <Fragment>
            <div className={` ${'bg-[#f9f9f9] bg-[length:300px] bg-[url("https://artina.org/12.png")] '} min-h-screen  overflow-hidden pb-8`}>
              <div className="bg-[#4e45d0] my-4 flex flex-col relative text-white gap-4 items-center overflow-hidden rounded-xl shadow-md">
                <img alt="" src={mand1} className=" opacity-[15%] absolute top-1/2 -translate-y-1/2 pointer-events-none overflow-hidden" />
                <h1 className="text-center font-bold text-3xl my-4  p-4 ">{t("auth")}</h1>
              </div>
              {docApproval && docApproval.length !== 0 ? (
                <div className="w-[90vw] my-4 mx-auto h-1/2 rounded-lg p-4">
                  <div className="w-[70vw] flex mx-auto flex-wrap gap-8 justify-center items-center">
                    {docApproval.map((doc) => {
                      return <AuthPageCard key={doc.id} profileImage={doc.user_profile.profile_picture} name={doc.user_profile.first_name + " " + doc.user_profile.last_name} bio={doc.user_profile.bio} destination={doc.id} />;
                    })}
                  </div>
                  <div className="w-36 mr-auto rounded-lg text-white p-4 hover:bg-[#609AF8] ease-in-out duration-200 text-center my-8 bg-[#4e45d0] shadow-md">
                    <Link to={"/authentications"} className="hover:pr-4 ease-in-out duration-200  font-bold">
                      مشاهده همه
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-8 rounded-xl shadow-md text-lg text-center">مورد جدیدی وجود ندارد</div>
              )}
              <div className=" mx-auto bg-[#4e45d0] flex flex-col relative text-white gap-4 items-center overflow-hidden rounded-xl shadow-md my-4">
                <img alt="" src={mand1} className=" opacity-[15%] absolute top-1/2 -translate-y-1/2 pointer-events-none overflow-hidden" />
                <h1 className="text-center font-bold text-3xl my-4 p-4 ">تیکت ها</h1>
              </div>
              {tickets && tickets.length !== 0 ? (
                <div className="w-[90vw] my-4 mx-auto h-1/2 rounded-lg p-4">
                  <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-1">
                    {tickets.map((ticket) => {
                      const text = ticket.ticket.text.substring(0, 25);
                      return <TicketCard key={ticket.id} id={ticket.id} subject={ticket.ticket.subject} text={text.length < 25 ? text : text + " ..."} />;
                    })}
                  </div>
                  <div className="w-36 mr-auto rounded-lg text-white p-4 text-center my-8 hover:bg-[#609AF8] ease-in-out duration-200 bg-[#4e45d0] shadow-sm ">
                    <Link to={"/allTickets"} className="hover:pr-4 ease-in-out duration-200 font-bold">
                      مشاهده همه
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-8 rounded-xl shadow-md text-lg text-center">مورد جدیدی وجود ندارد</div>
              )}
              <div className=" mx-auto bg-[#4e45d0] flex flex-col relative text-white gap-4 items-center overflow-hidden rounded-xl shadow-md my-4">
                <img alt="" src={mand1} className=" opacity-[15%] absolute top-1/2 -translate-y-1/2 pointer-events-none overflow-hidden" />
                <h1 className="text-center font-bold text-3xl my-4 p-4 ">متاورس</h1>
              </div>
              {metaTickets && metaTickets.length !== 0 ? (
                <div className="w-[90vw] my-4 mx-auto h-1/2 rounded-lg p-4">
                  <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-1">
                    {metaTickets.map((ticket) => {
                      return <MetaVerseCard key={ticket.id} title={ticket.ticket.name} count={ticket.ticket.user} img={ticket.ticket.image_url} id={ticket.id} exhibition={ticket.ticket.text} />;
                    })}
                  </div>
                  <div className="w-36 mr-auto rounded-lg text-white p-4 text-center my-8 hover:bg-[#609AF8] ease-in-out duration-200 bg-[#4e45d0] shadow-sm ">
                    <Link to={"/metaversetickets"} className="hover:pr-4 ease-in-out duration-200 font-bold">
                      مشاهده همه
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-8 rounded-xl shadow-md text-lg text-center">مورد جدیدی وجود ندارد</div>
              )}
            </div>
          </Fragment>
        ) : null}
      </Fragment>
    </AdminLayout>
  );
};
export default AdminPanel;
