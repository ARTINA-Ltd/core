import {Route, Routes} from "react-router";
import StarterFile from "./Pages/StarterFile";
import ArtistPage from "./Pages/ArtistPage";
import HomePage from "./Pages/HomePage";
import ExhibitionSignForm from "./Pages/ExhibitionSignForm";
import ProductPage from "./Pages/ProductPage";
import LoginPage from "./Pages/LoginPage";
import SignUp from "./LoginComponent/SignUp";
import Exhabition from "./Pages/Exhabition";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    return <>
        {/*<div className="App">*/}
        {/*    <Routes>*/}
        {/*        <Route path="/" element={<StarterFile />}>*/}
        {/*            <Route exact path="ArtistPage" element={<ArtistPage />} />*/}
        {/*            <Route exact path="HomePage" element={<HomePage />} />*/}
        {/*            <Route exact path="ExhibitionSignForm" element={<ExhibitionSignForm />} />*/}
        {/*            <Route exact path="ProductPage" element={<ProductPage />} />*/}
        {/*            <Route exact path="LoginPage" element={<LoginPage />} />*/}
        {/*            <Route exact path="SignUp" element={<SignUp />} />*/}

        {/*        </Route >*/}
        {/*    </Routes>*/}
        {/*</div>*/}
        {/*<LoginPage/>*/}


        {/*<ProductPage />*/}
        {/*<HomePage />*/}

        {/*<ExhibitionLists/>*/}
        {/*<ExhibitionSignForm/>*/}

        <Exhabition />
    </>

};