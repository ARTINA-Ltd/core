import {Route, Routes} from "react-router";
import StarterFile from "./Pages/StarterFile";
import ArtistPage from "./Pages/ArtistPage";
import HomePage from "./Pages/HomePage";
import ExhibitionSignForm from "./Pages/ExhibitionSignForm";
import ProductPage from "./Pages/ProductPage";
import LoginPage from "./Pages/LoginPage";
import SignUp from "./LoginComponent/SignUp";
import Exhabition from "./Pages/Exhabition"; 
import Exhibition_lists from './Pages/Exhibition_lists'
import RequestsDetails from "./ExhabitionComponent/src/component/request-artist-detail-page/r-page/request-detail";
import Showreq from "./ExhabitionComponent/src/component/request-artist-detail-page/r-page/show-req";
import RequestLists from "./ExhabitionComponent/src/component/requestlistforexhibition/requests/paging";
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    return <>

        <div className="App">
            <Routes>
                <Route  path="/" element={<StarterFile />}/>
                    <Route exact path="artistpage" element={<ArtistPage />} />
                    <Route exact path="homepage" element={<HomePage />} />
                    <Route exact path="exhibitionsignform" element={<ExhibitionSignForm />} />
                    <Route exact path="productpage" element={<ProductPage />} />
                    <Route exact path="loginpage" element={<LoginPage />} />
                    <Route exact path="signup" element={<SignUp />} />
                    <Route exact path="exhibition" element={<Exhabition />} />
                    <Route exact path="exhibitionlists" element={<Exhibition_lists />} />
                    <Route exact path="request-lists" element={<RequestLists/>} />
                    <Route exact path="show-request/" element={<Showreq/>} />
                    <Route exact path="requestsdetails" element={<RequestsDetails/>} />
            </Routes>
        </div>
       

        {/* <Exhabition /> */}
    </>

};