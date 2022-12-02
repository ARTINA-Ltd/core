import { useEffect, useMemo, useState } from "react";
import Requests_details from "./request-detail";
import axios from "axios";
import req from "./../../request.json";
import { useLocation, Link } from "react-router-dom";
import Navbar from "../../nav-bar/nav-bar";
import Footer from "../../footer/footer-component";
const Showreq = (props) => {
  const location = useLocation();
  const state = location.state;

  const [request, setRequest] = useState([]);
  const [nfts, setNfts] = useState([]);
  const [error, setErrorr] = useState(null);
  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState("accepted");
  const [feedback, setFeedback] = useState("you are accepted");

  const ChangeState = async () => {
    let formField = new FormData();
    formField.append("state", status);
    formField.append("feedback", feedback);

    await axios({
      method: "post",
      url: "http://127.0.0.1:8000/exhibition/nftexs/1/changing_state/",
      data: formField,
      mode: "cors",
    }).then((response) => {
      console.log(response.data);
    });
  };

  useEffect(() => {
    const fetchNft = async (id) => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/core/Nfts/` + id + `/`
        );

        setNfts((prev) => [...prev, res.data]);
        setErrorr(null);
      } catch (err) {
        setErrorr(err.message);
        setNfts(null);
      } finally {
        setLoading(false);
      }
    };
    state.nfts.forEach(fetchNft);
  }, []);

  return (
    <div>
      <Navbar />
      <Requests_details
        request={state}
        nfts={nfts}
        loading={loading}
        ChangeState={ChangeState}
      />
      <Footer/>
    </div>
  );
};
export default Showreq;
