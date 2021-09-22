import React from "react";
import "./style.scss";
export default function Sidebar({
  listCate,
  handleSearchByCateType,
  handleSearchByCateFilter,
  searchOption,
}) {
  console.log({ searchOption });
  const listFilter = [];
  if (searchOption.byCate !== "All") {
    for (const cate of listCate) {
      if (cate._id === searchOption.byCate) {
        for (const e of cate.cateFilter) {
          listFilter.push(e);
        }
      }
    }
  }

  //HANDLE ON CLICK

  const handleOnCLick = (option, type) => {
    if (type === "cate") handleSearchByCateType(option);
    else handleSearchByCateFilter(option);
  };
  return (
    <div className="side_bar">
      <div className="product_type">
        <h3 className="product_type_title">
          FILTER
          <i className="fas fa-chevron-down"></i>
        </h3>
        {listFilter.map((e, index) => (
          <p onClick={() => handleOnCLick(e._id, "filter")} key={index}>
            {e.filterName}
          </p>
        ))}
      </div>
      <div className="other_products">
        <h3 className="other_products_title">
          CATEGORY<i className="fas fa-list"></i>
        </h3>
        <p
          onClick={() => handleOnCLick("All", "cate")}
          className="other_products_item"
        >
          All
        </p>
        {listCate.map((e) => (
          <p
            onClick={() => handleOnCLick(e._id, "cate")}
            key={e._id}
            className="other_products_item"
          >
            {e.cateName}
          </p>
        ))}
      </div>
    </div>
  );
}