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
            </Routes>
        </div>
       

        {/* <Exhabition /> */}
    </>

};