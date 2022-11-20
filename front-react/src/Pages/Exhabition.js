import "../ExhabitionComponent/src/index.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "../ExhabitionComponent/src/component/nav-bar/nav-bar";


import Exhibitions from "../ExhabitionComponent/src/component/exhibitor-entrance-page/live-collections/exhibitions";
import Showreq from "../ExhabitionComponent/src/component/request-artist-detail-page/r-page/show-req";
import Request_pages from "../ExhabitionComponent/src/component/request list for exhibition/requests/paging";


function Exhabition() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Navbar />}>
                    <Route index element={<Exhibitions />} />
                    <Route path="exhibitions" element={<Exhibitions />} />
                    {/* eslint-disable-next-line react/jsx-pascal-case */}
                    <Route path="requests" element={<Request_pages />} />
                    <Route path="show-request/" element={<Showreq />} />
                </Route>
            </Routes>
        </div>
    );
}

export default Exhabition;
