import {Route, Routes} from "react-router";
import StarterFile from "./Pages/StarterFile";
import ArtistPage from "./Pages/ArtistPage";
import HomePage from "./Pages/HomePage";
import ArtistApplicationForm from "./Pages/ExhibitionSignForm";
import NFTDetails from "./Pages/ProductPage";
// import Login from "./Pages/LoginPage";
// import Register from "./LoginComponent/SignUp";
import Register from "./LoginComponent/register";
import Login from "./LoginComponent/login";
import ExhibitorPage from "./Pages/Exhabition";
import ExhibitionLists from './Pages/Exhibition_lists'
import RequestDetails from "./ExhabitionComponent/src/component/request-artist-detail-page/r-page/request-detail";
import ShowRequests from "./ExhabitionComponent/src/component/request-artist-detail-page/r-page/show-req";
import RequestLists from "./ExhabitionComponent/src/component/requestlistforexhibition/requests/paging";
import NFTUploadPage from "./Pages/NftUploadPage";
import ShowCollection from "./components/ShowCollection";
// eslint-disable-next-line import/no-anonymous-default-export
import { ScrollPanel } from 'primereact/scrollpanel';
import {ChainId, ThirdwebProvider} from "@thirdweb-dev/react";
import ProfilePage from "./Pages/ProfilePage";
import UserDashboard from "./Pages/UserDashboard";
import { ScrollTop } from "primereact/scrolltop";

const activeChainId = ChainId.Goerli;

export default () => {
    return <>
        <ThirdwebProvider desiredChainId={activeChainId}>
            <div className="App">
            <ScrollTop    className="custom-scrolltop w-4rem h-4rem    border-round-md   bg-primary" icon="pi pi-arrow-up" />

                <Routes>
                    <Route path="/" element={<StarterFile/>}/>
                    <Route exact path="artist-page" element={<ArtistPage/>}/>
                    <Route exact path="artist-application-form" element={<ArtistApplicationForm/>}/>
                    <Route exact path="nft-details" element={<NFTDetails/>}/>
                    <Route exact path="login" element={<Login/>}/>
                    <Route exact path="register" element={<Register/>}/>
                    <Route exact path="exhibitor-page" element={<ExhibitorPage/>}/>
                    <Route exact path="exhibition-lists" element={<ExhibitionLists/>}/>
                    <Route exact path="request-lists" element={<RequestLists/>}/>
                    <Route exact path="show-request" element={<ShowRequests/>}/>
                    <Route exact path="request-details" element={<RequestDetails/>}/>
                    <Route exact path="upload-page" element={<NFTUploadPage/>}/>
                    <Route exact path="UserDashboard" element={<UserDashboard/>}/>
                    <Route exact path="profile" element={<ProfilePage/>}/>
                    <Route exact path="collections" element={<ShowCollection/>}/>
                </Routes>
            </div>
        </ThirdwebProvider>
    </>
};