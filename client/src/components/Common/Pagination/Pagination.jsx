import React, { useEffect, useState } from "react";
import { PAGE_SIZE } from "../../../assets/constants";

export default function Pagination({ numOfPages, handlePageChange }) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    onPageChange(page);
  }, [page]);
  document.querySelectorAll(".page-number").forEach((e) => {
    e.addEventListener("click", handlePageClick);
  });
  function handlePageClick(e) {
    setPage(+e.target.innerText);
  }
  function handlePreviousPage() {
    const prePage = page - 1;
    setPage(prePage);
  }
  function handleNextPage() {
    const nextPage = page + 1;
    setPage(nextPage);
  }

  function onPageChange(curPage) {
    handlePageChange({
      page,
      size: PAGE_SIZE,
    });
  }
  return (
    <nav aria-label="...">
      <ul className="pagination">
        <li className={"page-item " + (page <= 1 && "disabled")}>
          <button className="page-link" onClick={handlePreviousPage}>
            Previous
          </button>
        </li>
        {[...Array(numOfPages)].map((e, index) => (
          <div key={index}>
            <li className={"page-item " + (page === index + 1 && "active")}>
              <button className="page-link page-number">{index + 1}</button>
            </li>
          </div>
        ))}

        <li className={"page-item " + (page >= numOfPages && "disabled")}>
          <button className="page-link" onClick={handleNextPage}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
