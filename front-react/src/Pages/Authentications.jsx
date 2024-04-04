import { useEffect, useState } from "react";
import Header from "../components/AdminPageNavbar/Header.js";
import AuthPageCard from "../components/Cards/AuthPageCard.jsx";
import Footer from "../components/Footer/Footer.jsx";
import axios from "axios";

const Authentications = () => {
  const [docApproval, setDocApproval] = useState(null);
  useEffect(() => {
    axios
      .get(
        "https://api.artina.org/api/supervisor/document-approvals/unseen_approvals/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
        }
      )
      .then((e) => {
        setDocApproval(e.data);
      })
      .catch((err) => {
        console.log(`there was an error ${err}`);
      });
  }, []);
  return (
    <div dir="rtl">
      <Header />
      <div
        className={` ${'bg-[#f9f9f9] bg-[length:300px] bg-[url("https://artina.org/12.png")] '} min-h-screen  overflow-hidden pb-8`}
      >
        <div className="bg-[#4e45d0] w-[90vw] mx-auto my-4 flex flex-col relative text-white gap-4 items-center overflow-hidden rounded-xl shadow-md">
          <img
            alt=""
            src="/mand1.png"
            className=" opacity-[15%] absolute top-1/2 -translate-y-1/2 pointer-events-none overflow-hidden"
          />
          <h1 className="text-center font-bold text-3xl my-4  p-4 ">
            احراز هویت
          </h1>
        </div>
        <div className=" w-[70vw] flex mx-auto flex-wrap gap-8 justify-center items-center py-4">
          {docApproval
            ? docApproval.map((doc) => {
                return (
                  <AuthPageCard
                    key={doc.id}
                    profileImage={doc.user_profile.profile_picture}
                    name={
                      doc.user_profile.first_name +
                      " " +
                      doc.user_profile.last_name
                    }
                    bio={doc.user_profile.bio}
                    destination={doc.id}
                  />
                );
              })
            : null}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Authentications;
