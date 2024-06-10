import { Route, Routes } from "react-router";
import React, { createContext, useEffect, useState } from "react";
import NFTDetails from "./Pages/NFTDetails";
import Register from "./LoginComponent/register";
import Login from "./LoginComponent/login";
import NFTUploadPage from "./Pages/NftUploadPage";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import Profile from "./Pages/Profile";
import UserDashboard from "./Pages/UserDashboard";
import { ScrollTop } from "primereact/scrolltop";
import Commission from "./Pages/Commission/Commission";
import Support from "./Pages/Support";
import axios from "axios";
import Contact from "./Pages/Contact";
import Collections from "./Pages/Collections";
import ForgetPassword from "./Pages/ForgetPassword";
import Home from "./Pages/Home";
import ExhibitionList from "./Pages/ExhibitionList";
import OpenExhibitions from "./Pages/OpenExhibitions";
import ArtistApplicationForm from "./Pages/ArtistApplicationForm";
import ExhibitionCollections from "./Pages/ExhibitionCollections";
import RequestsList from "./Pages/RequestsList";
import Exhibitor from "./Pages/Exhibitor";
import UserCollections from "./Pages/UserCollections";
import Dashboard from "./Pages/Dashboard";
import AboutUs from "./Pages/AboutUs";
import HelpMint from "./Pages/help-mint";
import HelpCreateExhibition from "./Pages/help-create-exhibition";
import MetaExplanation from "./Pages/metaverse_explanation";
import HelpQuestions from "./Pages/help-questions";
import HelpCreateWallet from "./Pages/help-create-wallet";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import AI from "./Pages/AI";
import Metaverse from "./Pages/Metaverse";
import GetMail from "./Pages/GetMail";
import NotFound from "./Pages/NotFound";
import RedirectedPage from "./Pages/RedirectPage";
import WhitePaper from "./Pages/WhitePaper";
import PreMint from "./Pages/PreMint";

// HEAD ADMIN_PANEL BRANCH
import Authentications from "./Pages/Authentications";
import Authenticate from "./Pages/Authenticate";
import TicketResponse from "./Pages/TicketResponse";
import AdminPanel from "./Pages/AdminPanel";
import AllTickets from "./Pages/AllTickets";
import MetaverseTickets from "./Pages/MetaverseTickets.jsx";
import ExhibitionApproval from "./Pages/ExhibitionApproval.jsx";

// HEAD MAIN BRANCH
import AllCollections from "./Pages/AllCollections";
import { GoftinoSnippet } from "@mohsen007/react-goftino";
import AddExhibition from "./Pages/AddExhibition.jsx";
import InternationalProfile from "./Pages/InternationalProfile.jsx";

const GOFTINO_KEY = "cD7Gse";

export const UserContext = createContext();
export const UserChangeContext = createContext();

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [user, setUser] = useState();

  useEffect(() => {
    axios({
      method: "get",
      url: "https://api.artina.org/api/account/user-info/",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
      },
      mode: "cors",
    })
      .then((data) => {
        setUser(data);
      })
      .catch(() => setUser(undefined));
  }, []);

  const userChange = async () => {
    console.log("called");
    await axios
      .get("https://api.artina.org/api/account/user-info/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
        mode: "cors",
      })
      .then((data) => {
        setUser(data);
        console.log(data);
      })
      .catch((res) => {
        setUser(undefined);
        console.log(res);
      });
  };

  return (
    <>
      <GoftinoSnippet
        goftinoKey={GOFTINO_KEY}
        onReady={() => {
          window.Goftino.open();
        }}
      />
      <ThirdwebProvider activeChain="ethereum" autoConnect={false}>
        <UserContext.Provider value={user}>
          <UserChangeContext.Provider value={userChange}>
            <div className="App">
              <React.Suspense
                fallback={
                  <div className="w-[100vw] h-[100vh] flex justify-center items-center">
                    <span className="loading loading-spinner loading-lg "></span>
                  </div>
                }
              >
                <ScrollTop className="bg-primary animate-bounce scale-75" icon="pi pi-arrow-up" />

                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route exact path="artist-application-form/:id" element={<ArtistApplicationForm />} />
                  <Route exact path="nft-details/:id" element={<NFTDetails />} />
                  <Route exact path="Commission" element={<Commission />} />
                  <Route exact path="login" element={<Login />} />
                  <Route exact path="forget-password" element={<ForgetPassword />} />
                  <Route exact path="support" element={<Support />} />
                  <Route exact path="register" element={<Register />} />
                  <Route exact path="add-exhibition" element={<AddExhibition />} />
                  <Route exact path="contact" element={<Contact />} />
                  <Route exact path="about-us" element={<AboutUs />} />
                  <Route exact path="privacy-policy" element={<PrivacyPolicy />} />
                  <Route exact path="help-mint" element={<HelpMint />} />
                  <Route exact path="help-create-exhibition" element={<HelpCreateExhibition />} />
                  <Route exact path="help-create-wallet" element={<HelpCreateWallet />} />

                  <Route exact path="metaverse_explanation" element={<MetaExplanation />} />
                  <Route exact path="exhibition-list" element={<ExhibitionList />} />
                  <Route exact path="open-exhibitions" element={<OpenExhibitions />} />
                  <Route exact path="requests-list" element={<RequestsList />} />

                  <Route exact path="upload-page" element={<NFTUploadPage />} />
                  <Route exact path="pre-mint" element={<PreMint />} />
                  <Route exact path="UserDashboard" element={<UserDashboard />} />
                  <Route exact path="dashboard" element={<Dashboard />} />
                  <Route exact path="profile" element={<Profile />} />
                  <Route exact path="inter-profile" element={<InternationalProfile />} />
                  <Route exact path="exhibitor" element={<Exhibitor />} />
                  <Route exact path="collections/:username" element={<Collections />} />
                  <Route exact path="user-collections" element={<UserCollections />} />
                  <Route exact path="exhibition-collections/:id" element={<ExhibitionCollections />} />
                  <Route exact path="ai" element={<AI />} />
                  <Route exact path="metaverse/:token?" element={<Metaverse />} />
                  <Route exact path="join-artina" element={<GetMail />}></Route>
                  <Route exact path="payment_status" element={<RedirectedPage />} />
                  <Route exact path="FAQ" element={<HelpQuestions />} />
                  <Route exact path="whitepaper" element={<WhitePaper />} />

                  <Route path="*" element={<NotFound />} />

                  <Route path="allTickets" element={<AllTickets />} />
                  <Route path="metaversetickets" element={<MetaverseTickets />} />
                  <Route path="authentications" element={<Authentications />} />
                  <Route path="authenticate/:id" element={<Authenticate />} />
                  <Route path="exhibitionapproval/:id" element={<ExhibitionApproval />} />
                  <Route path="ticket-response/:id" element={<TicketResponse />} />
                  <Route path="admin-panel" element={<AdminPanel />} />
                  {/* <Route exact path="request-lists" element={<RequestLists />} /> */}
                  <Route exact path="all-collections" element={<AllCollections />} />
                </Routes>
              </React.Suspense>
            </div>
          </UserChangeContext.Provider>
        </UserContext.Provider>
      </ThirdwebProvider>
    </>
  );
};
