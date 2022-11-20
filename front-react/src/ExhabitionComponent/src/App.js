import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./component/nav-bar/nav-bar";
import Footer from "./component/footer/footer";

import Exhibitions from "./component/exhibitor-entrance-page /live-collections/exhibitions";
import Requests_details from "./component/request-artist-detail-page /r-page/request-detail";
import Showreq from "./component/request-artist-detail-page /r-page/show-req";
import Request_pages from "./component/request list for exhibition /requests/paging";

import Test from "./component/request list for exhibition /requests/test";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Exhibitions />} />
          <Route path="exhibitions" element={<Exhibitions />} />
          <Route path="requests" element={<Request_pages />} />
          <Route path="show-request/" element={<Showreq />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
