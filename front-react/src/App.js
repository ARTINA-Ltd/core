import './App.css';
import {BrowserRouter, Route , Routes} from "react-router-dom"

import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from "./Pages/HomePage";
import ProductPage from "./Pages/ProductPage";
import ArtistPage from "./Pages/ArtistPage";
import ExhibitionLists from "./Pages/ExhibitionLists";
import ExhibitionSignForm from "./Pages/ExhibitionSignForm";
import LoginPage from "./Pages/LoginPage";
import StarterFile from "./Pages/StarterFile";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    return <>
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<StarterFile />} >
                    <Route path="/artistPage" element={<ArtistPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
                    {/*<LoginPage/>*/}


                    {/*<ProductPage />*/}
                    {/*<HomePage />*/}

                    {/*<ExhibitionLists/>*/}
                    {/*<ExhibitionSignForm/>*/}


    </>

}

