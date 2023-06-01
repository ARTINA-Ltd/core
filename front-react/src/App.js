import { Route, Routes } from "react-router";
import { createContext, useEffect, useState } from "react";

import StarterFile from "./Pages/StarterFile";
import ArtistPage from "./Pages/ArtistPage";
import HomePage from "./Pages/HomePage";
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
import ArtistApplicationForm from './Pages/ArtistApplicationForm';
import ExhibitionCollections from "./Pages/ExhibitionCollections";
import RequestsList from "./Pages/RequestsList";
import Exhibitor from "./Pages/Exhibitor";

const activeChainId = ChainId.Goerli;

export const UserContext = createContext();
export const UserChangeContext = createContext();

export default () => {

  const [user, setUser] = useState();

  const bodyParameters = {
    key: "value",
  };
  // axios.post('https://api.artina.org/api/account/user-info',
  //       config)
  //       .then(data =>{
  //         setUser(data);
  //         console.log("data: ")
  //         console.log(data)
  //       }).catch(console.log)
  useEffect(() => {
    axios({
      method: "get",
      // url: "https://api.artina.org/api/account/user-info/",
      url: "https://api.artina.org/api/account/user-info/",
      headers: { Authorization: `Bearer ${localStorage.getItem("authTokens")}` },
      mode: "cors",
    })
      .then((data) => {
        setUser(data);
      })
      .catch(setUser(undefined));
  }, []);

  const userChange = async () => {
    console.log("called");
    await axios
      .get(
        // url: "http://78.38.35.249:8000/api/account/user-info/",
        "https://api.artina.org/api/account/user-info/",
        { headers: { Authorization: `Bearer ${localStorage.getItem("authTokens")}` }, mode: "cors" }
      )
      .then((data) => {
        setUser(data);
      })
      .catch(setUser(undefined));
  };

  return (
    <>
      <ThirdwebProvider desiredChainId={activeChainId}>
        <UserContext.Provider value={user}>
          <UserChangeContext.Provider value={userChange}>
            <div className="App">
              <ScrollTop
                className="bg-primary animate-bounce scale-75"
                icon="pi pi-arrow-up"
              />

              <Routes>
                {/* {Token=='null' ? <></> ::} */}
                <Route path="/" element={<Home />} />
                <Route exact path="artist-page" element={<ArtistPage />} />
                <Route
                  exact
                  path="artist-application-form/:id"
                  element={<ArtistApplicationForm />}
                />
                <Route exact path="nft-details/:id" element={<NFTDetails />} />
                <Route exact path="Commission" element={<Commission />} />
                <Route exact path="login" element={<Login />} />
                <Route exact path="forget-password" element={<ForgetPassword />} />
                <Route exact path="support" element={<Support />} />
                <Route exact path="register" element={<Register />} />
                
                <Route exact path="contact" element={<Contact />} />
                
                <Route exact path="exhibition-list" element={<ExhibitionList />} />
                <Route exact path="open-exhibitions" element={<OpenExhibitions />} />

                {/* <Route exact path="request-lists" element={<RequestLists />} /> */}
                <Route exact path="requests-list" element={<RequestsList />} />
                <Route exact path="show-request" element={<ShowRequests />} />
                <Route
                  exact
                  path="request-details"
                  element={<RequestDetails />}
                />
                <Route exact path="upload-page" element={<NFTUploadPage />} />
                <Route exact path="UserDashboard" element={<UserDashboard />} />
                <Route exact path="profile" element={<Profile />} />
                <Route exact path="exhibitor" element={<Exhibitor />} />
                <Route exact path="collections/:username" element={<Collections />} />
                <Route exact path="exhibition-collections/:id" element={<ExhibitionCollections />} />
              </Routes>
            </div>
          </UserChangeContext.Provider>
        </UserContext.Provider>
      </ThirdwebProvider>
    </>
  );
};
