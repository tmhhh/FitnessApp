import React, { useState, useEffect } from "react";
import { Col, Pagination, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import ProductSide from "./ProductSide";
import Sidebar from "./Sidebar";
import "./style.scss";
import { Helmet } from "react-helmet";
export default function ShoppingPage() {
  const prodSelector = useSelector((state) => state.prodReducer);
  const { userInfo, isAuthenticated } = useSelector(
    (state) => state.authReducer
  );
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
  // console.log({ searchOption });

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

  // GET FAVORITE PRODUCTS
  const handleShowFavoriteProds = () => {
    const favoriteProds = [];
    userInfo.favoriteProducts.forEach((e) => {
      prodSelector.listProducts.forEach((prod) => {
        if (e.toString() === prod._id.toString()) {
          favoriteProds.push(prod);
        }
      });
    });
    setProdSelectorCopy({ ...prodSelector, listProducts: favoriteProds });
    return setSearchOption({ byCate: "All", byCateFilter: "" });
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

  //SEARCH BY PRICE
  const handleSearchByPrice = (domain) => {
    switch (domain) {
      case 0: // 10-40
        return setProdSelectorCopy({
          ...prodSelectorCopy,
          listProducts: prodSelector.listProducts.filter(
            (prod) =>
              prod.prodPrice *
                (1 - (prod.prodDiscount?.discountPercent / 100 || 0)) >=
                10 &&
              prod.prodPrice *
                (1 - (prod.prodDiscount?.discountPercent / 100 || 0)) <
                40
          ),
        });
      case 1: // 40-80
        return setProdSelectorCopy({
          ...prodSelectorCopy,
          listProducts: prodSelector.listProducts.filter(
            (prod) =>
              prod.prodPrice *
                (1 - (prod.prodDiscount?.discountPercent / 100 || 0)) >=
                40 &&
              prod.prodPrice *
                (1 - (prod.prodDiscount?.discountPercent / 100 || 0)) <
                80
          ),
        });
      case 2: // 80-100
        return setProdSelectorCopy({
          ...prodSelectorCopy,
          listProducts: prodSelector.listProducts.filter(
            (prod) =>
              prod.prodPrice *
                (1 - (prod.prodDiscount?.discountPercent / 100 || 0)) >=
                80 &&
              prod.prodPrice *
                (1 - (prod.prodDiscount?.discountPercent / 100 || 0)) <=
                100
          ),
        });
      default:
        break;
    }
  };
  return (
    <>
      <div className="container-fluid shopping_page_container">
        <Helmet>
          <title>Shopping</title>
          <meta name="description" content="Stuff related to fitness" />
        </Helmet>
        <Row>
          <Col md={3} lg={3}>
            <Sidebar
              isAuthenticated={isAuthenticated}
              handleShowFavoriteProds={handleShowFavoriteProds}
              handleSearchByCateType={handleSearchByCate}
              handleSearchByCateFilter={handleSearchByCateFilter}
              listCate={listCate}
              searchOption={searchOption}
              totalFavorite={userInfo.favoriteProducts?.length}
              handleSearchByPrice={handleSearchByPrice}
              // setFilter={setFilter}
            />
          </Col>
          <Col md={9} lg={9}>
            <ProductSide prodSelector={prodSelectorCopy} />
          </Col>
        </Row>
      </div>
    </>
  );
}
