import React, { useState, useEffect } from "react";
import { Col, Pagination, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import ProductSide from "./ProductSide";
import Sidebar from "./Sidebar";
import "./style.scss";

export default function ShoppingPage() {
  const prodSelector = useSelector((state) => state.prodReducer);
  const listCate = useSelector((state) => state.cateReducer);

  const [prodSelectorCopy, setProdSelectorCopy] = useState({ ...prodSelector });
  const [searchOption, setSearchOption] = useState({
    byCate: "All",
    byCateFilter: "",
  });

  //UPDATE PROD COPY WHEN THE ORIGINAL CHANGE
  useEffect(() => {
    setProdSelectorCopy({ ...prodSelector });
  }, [prodSelector]);
  console.log({ searchOption });

  /// HANDLE SEARCH BY CATE TYPE
  const handleSearchByCate = (cateOption) => {
    if (cateOption === "All") {
      setProdSelectorCopy({ ...prodSelector });
      return setSearchOption({ byCate: "All", byCateFilter: "" });
    }
    setProdSelectorCopy({
      ...prodSelectorCopy,
      listProducts: prodSelector.listProducts.filter(
        (prod) => prod.prodCategory.cateName._id.toString() === cateOption
      ),
    });
    setSearchOption({ byCate: cateOption, byCateFilter: "" });
  };

  //SEARCH BY FILTER
  const handleSearchByCateFilter = (filterOption) => {
    setProdSelectorCopy({
      ...prodSelectorCopy,
      listProducts: prodSelector.listProducts.filter(
        (prod) => prod.prodCategory.cateFilter._id.toString() === filterOption
      ),
    });
    setSearchOption({ ...searchOption, byCateFilter: filterOption });
  };
  return (
    <>
      <div className="container shopping_page_container">
        <div></div>
        <Row>
          <Col lg={3}>
            <Sidebar
              handleSearchByCateType={handleSearchByCate}
              handleSearchByCateFilter={handleSearchByCateFilter}
              listCate={listCate}
              searchOption={searchOption}

              // setFilter={setFilter}
            />
          </Col>
          <Col lg={9}>
            <ProductSide prodSelector={prodSelectorCopy} />
          </Col>
        </Row>
        <Pagination
          style={{
            position: "relative",
            top: "20px",
            left: "50%",
            width: "200px",
            marginBottom: "50px",
          }}
        >
          <Pagination.Prev />
          <Pagination.Item active>{1} </Pagination.Item>
          <Pagination.Item>{2}</Pagination.Item>

          <Pagination.Item disabled>{3}</Pagination.Item>

          <Pagination.Next />
        </Pagination>
      </div>
    </>
  );
}
