import "../ExhabitionComponent/src/App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "../ExhabitionComponent/src/component/nav-bar/nav-bar";
import Footer from "../ExhabitionComponent/src/component/footer/footer-component";

import Exhibitions from "../ExhabitionComponent/src/component/exhibitor-entrance-page/live-collections/exhibitions";
import RequestsDetails from "../ExhabitionComponent/src/component/request-artist-detail-page/r-page/request-detail";
import Showreq from "../ExhabitionComponent/src/component/request-artist-detail-page/r-page/show-req";
import RequestPages from "../ExhabitionComponent/src/component/requestlistforexhibition/requests/paging";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route element={<Footer/>}/>
        <Route index element={<Exhibitions/>} />
          <Route exact path="exhibitions" element={<Exhibitions/>} />
          <Route exact path="requests" element={<RequestPages/>} />
          <Route exact path="show-request/" element={<Showreq/>} />
          <Route exact path="requestsdetails" element={<RequestsDetails/>} />
          
        </Route>
        

        
      </Routes>
    </div>
  );
}

export default App;
