import React, { useState, useEffect } from "react";
import Requests from "./request";
import Pagination from "./Pagination";
import axios from "axios";
// import req from "./../../request.json";

const Request_pages = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [RequestPerPage] = useState(8);

  useEffect(() => {
    const fetchRequest = async () => {
      setLoading(true);
      const res = await fetch("");
      const requests = await res.json();
      // setRequests(requests);
      setRequests(req);
      setLoading(false);
    };

    fetchRequest();
  }, []);

  const indexOfLastRequest = currentPage * RequestPerPage;
  const indexOfFirstRequest = indexOfLastRequest - RequestPerPage;
  const currentRequest = requests.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Requests requests={currentRequest} loading={loading} />
      <Pagination
        RequestPerPage={RequestPerPage}
        totalRequests={requests.length}
        paginate={paginate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
export default Request_pages;
