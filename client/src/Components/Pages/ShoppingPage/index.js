import React, { useState, useEffect, useRef } from "react";
import { Col, Pagination, Row } from "react-bootstrap";
import { calculateFinalPrice } from "utils/calculate";
import { useSelector } from "react-redux";
import ProductSide from "./ProductSide";
import Sidebar from "./Sidebar";
import "./style.scss";
import { Helmet } from "react-helmet";
import { prodFilterSelector } from "redux/selectors/prodSelector";
export default function ShoppingPage() {
  const [searchOption, setSearchOption] = useState({
    category: "All",
    cateFilter: null,
    price: null, //
    favorite: {
      isChosen: false,
      listFavorites: [],
    },
  });
  const { listProducts, prodLoading } = useSelector((state) =>
    prodFilterSelector(state.prodReducer, searchOption)
  );
  console.log({ listProducts });
  const { userInfo, isAuthenticated } = useSelector(
    (state) => state.authReducer
  );
  const listCate = useSelector((state) => state.cateReducer);

  //SEARCH BY PRICE
  const handleSearchByPrice = (domain) => {
    // switch (domain) {
    //   case 0: // 10-40
    //     // console.log(3);
    //     setProdSelectorCopy({
    //       listProducts: prodSelectorCopy.listProducts.filter((prod) => {
    //         const product = calculateFinalPrice(prod);
    //         return product >= 10 && product < 40;
    //       }),
    //     });
    //     break;
    //   case 1: // 40-80
    //     setProdSelectorCopy({
    //       listProducts: prodSelectorCopy.listProducts.filter((prod) => {
    //         const product = calculateFinalPrice(prod);
    //         return product >= 40 && product < 80;
    //       }),
    //     });
    //     break;
    //   case 2: // 80-100
    //     setProdSelectorCopy({
    //       listProducts: prodSelectorCopy.listProducts.filter((prod) => {
    //         const product = calculateFinalPrice(prod);
    //         return product >= 80 && product <= 100;
    //       }),
    //     });
    //     break;
    //   default:
    //     break;
    // }
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
              // handleShowFavoriteProds={handleShowFavoriteProds}
              // handleSearchByCateType={handleSearchByCate}
              // handleSearchByCateFilter={handleSearchByCateFilter}
              listCate={listCate}
              setSearchOption={setSearchOption}
              searchOption={searchOption}
              totalFavorite={userInfo.favoriteProducts?.length}
              listFavorites={userInfo.favoriteProducts}
              handleSearchByPrice={handleSearchByPrice}
              // setFilter={setFilter}
            />
          </Col>
          <Col md={9} lg={9}>
            <ProductSide
              listProducts={listProducts}
              prodLoading={prodLoading}
              // // searchOption={searchOption}
            />
          </Col>
        </Row>
      </div>
    </>
  );
}
