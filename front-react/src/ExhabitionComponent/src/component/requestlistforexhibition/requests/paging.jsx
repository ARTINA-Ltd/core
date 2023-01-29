import { useEffect, useMemo, useState } from "react";
import Requests from "./request";
import Pagination from "./Pagination";
import axios from "axios";
import req from "../../request.json";
import NavBar from "../../nav-bar/nav-bar";
import Footer from "../../footer/footer-component";
const Request_pages = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [RequestPerPage] = useState(8);
  const [sortType, setSortType] = useState("ascending");
  const [state, setState] = useState("pending");
  const [currentuser, setCurrentuser] = useState(8);
  const [currentReq, setCurrentReq] = useState(null);

  const sortedData = useMemo(() => {
    let result = requests;
    if (sortType === "descending") {
      result = [...requests].sort((a, b) => {
        return b.date.localeCompare(a.date);
      });
    } else if (sortType === "ascending") {
      result = [...requests].sort((a, b) => {
        return a.date.localeCompare(b.date);
      });
    }
    return result;
  }, [requests, sortType]);

  const fetchRequest = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://78.38.35.249:8000/api/exhibition/exhibitors/5/get_${state}_state/`
      );
      setRequests(res.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setRequests(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRequest();
  }, [state]);

  const indexOfLastRequest = currentPage * RequestPerPage;
  const indexOfFirstRequest = indexOfLastRequest - RequestPerPage;
  const currentRequest = sortedData.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    
    <div>
      <NavBar />
      <Requests
        requests={currentRequest}
        loading={loading}
        setState={setState}
        state={state}
        setCurrentReq={setCurrentReq}
      />
      <Pagination
        RequestPerPage={RequestPerPage}
        totalRequests={requests.length}
        paginate={paginate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <Footer />
    </div>
  );
};
export default Request_pages;
