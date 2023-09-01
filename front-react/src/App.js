import { Route, Routes } from "react-router";
import { createContext, useEffect, useState } from "react";

import StarterFile from "./Pages/StarterFile";
import ArtistPage from "./Pages/ArtistPage";
import NFTDetails from "./Pages/NFTDetails";
// import Login from "./Pages/LoginPage";
// import Register from "./LoginComponent/SignUp";
import Register from "./LoginComponent/register";
import Login from "./LoginComponent/login";
import RequestDetails from "./ExhabitionComponent/src/component/request-artist-detail-page/r-page/request-detail";
import ShowRequests from "./ExhabitionComponent/src/component/request-artist-detail-page/r-page/show-req";
import RequestLists from "./ExhabitionComponent/src/component/requestlistforexhibition/requests/paging";
import NFTUploadPage from "./Pages/NftUploadPage";
import ShowCollection from "./components/ShowCollection";
// eslint-disable-next-line import/no-anonymous-default-export
import { ScrollPanel } from "primereact/scrollpanel";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
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
import HelpQuestions from "./Pages/help-questions";
import HelpCreateWallet from "./Pages/help-create-wallet";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import AI from "./Pages/AI";
import Metaverse from "./Pages/Metaverse";
import GetMail from "./Pages/GetMail";
import NotFound from "./Pages/NotFound";
import RedirectedPage from "./Pages/RedirectPage";
const activeChainId = ChainId.Goerli;

export const UserContext = createContext();
export const UserChangeContext = createContext();

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
      .get(
        "https://api.artina.org/api/account/user-info/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
          mode: "cors",
        }
      )
      .then((data) => {
        setUser(data);
        console.log(data);
      })
      .catch((res) => {
        setUser(undefined)
        console.log(res)
      });
  };

  return (
    <>
      <ThirdwebProvider
        activeChain="ethereum"
        autoConnect={false}
      >
        <UserContext.Provider value={user}>
          <UserChangeContext.Provider value={userChange}>
            <div className="App">
              <ScrollTop
                className="bg-primary animate-bounce scale-75"
                icon="pi pi-arrow-up"
              />

              <Routes>
                <Route path="/" element={<Home />} />
                <Route exact path="artist-page" element={<ArtistPage />} />
                <Route exact path="artist-application-form/:id" element={<ArtistApplicationForm />} />
                <Route exact path="nft-details/:id" element={<NFTDetails />} />
                <Route exact path="Commission" element={<Commission />} />
                <Route exact path="login" element={<Login />} />
                <Route exact path="forget-password" element={<ForgetPassword />} />
                <Route exact path="support" element={<Support />} />
                <Route exact path="register" element={<Register />} />

                <Route exact path="contact" element={<Contact />} />
                <Route exact path="about-us" element={<AboutUs />} />
                <Route exact path="privacy-policy" element={<PrivacyPolicy />} />

                <Route exact path="help-mint" element={<HelpMint />} />
                <Route exact path="help-create-exhibition" element={<HelpCreateExhibition />} />
                <Route exact path="help-create-wallet" element={<HelpCreateWallet />} />

                <Route exact path="exhibition-list" element={<ExhibitionList />} />
                <Route exact path="open-exhibitions" element={<OpenExhibitions />} />
                <Route exact path="requests-list" element={<RequestsList />} />
                <Route exact path="show-request" element={<ShowRequests />} />
                <Route exact path="request-details" element={<RequestDetails />} />
                <Route exact path="upload-page" element={<NFTUploadPage />} />
                <Route exact path="UserDashboard" element={<UserDashboard />} />
                <Route exact path="dashboard" element={<Dashboard />} />
                <Route exact path="profile" element={<Profile />} />
                <Route exact path="exhibitor" element={<Exhibitor />} />
                <Route exact path="collections/:username" element={<Collections />} />
                <Route exact path="user-collections" element={<UserCollections />} />
                <Route exact path="exhibition-collections/:id" element={<ExhibitionCollections />} />
                <Route exact path="ai" element={<AI />} />
                <Route exact path="metaverse/:token?" element={<Metaverse />} />
                <Route exact path="join-artina" element={<GetMail />}></Route>
                <Route exact path="payment_status" element={<RedirectedPage />} />
                <Route exact path="FAQ" element={<HelpQuestions />} />
                <Route path="*" element={<NotFound />} />
                {/* <Route exact path="request-lists" element={<RequestLists />} /> */}
              </Routes>
            </div>
          </UserChangeContext.Provider>
        </UserContext.Provider>
      </ThirdwebProvider>
    </>
  );
};
