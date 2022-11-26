import React from "react";
import "./Pagination-style.css";

const Pagination = ({
  RequestPerPage,
  totalRequests,
  paginate,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRequests / RequestPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div className="pagination">
        {pageNumbers.map((number) => (
          <div
            key={number}
            className={`page-item ${currentPage == number ? "active" : ""} `}
          >
            <a onClick={() => paginate(number)} href="!#" className="page-link">
              {number}
            </a>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Pagination;
