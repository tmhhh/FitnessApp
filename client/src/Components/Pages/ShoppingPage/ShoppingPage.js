import React, { useCallback, useEffect } from "react";
import { Col, Pagination, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import prodApi from "../../../api/prodApi";
import prodSlice from "../../../redux/slices/prodSlice";
import ProductCard from "../../Card/ProductCard";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";
import SearchBar from "../../SearchBar/SearchBar";
import Sidebar from "../../Sidebar/Sidebar";
import "./style.scss";

export default function ShoppingPage() {
  const prodSelector = useSelector((state) => state.prodReducer);
  // { listProducts, isLoading }

  const dispatch = useDispatch();
  //GET PRODUCTS
  const getProducts = useCallback(async () => {
    try {
      const res = await prodApi.getAllProducts();
      console.log(res.data);
      if (res.data.isSuccess)
        return dispatch(prodSlice.actions.getProducts(res.data.listProducts));
    } catch (err) {
      console.log(err);
      // return dispatch(prod)
    }
  }, [dispatch]);
  useEffect(() => {
    getProducts();
  }, [getProducts]);
  return (
    <>
      <Navbar />
      <div className="container shopping_page_container">
        <Row>
          <Col lg={3}>
            <Sidebar />
          </Col>
          <Col lg={9}>
            <SearchBar />
            <div className="product_container">
              <Row>
                {prodSelector.isLoading ? (
                  <Spinner
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      // transform: "translate(-50%,-50%)",
                    }}
                    animation="border"
                    variant="info"
                  />
                ) : (
                  prodSelector.listProducts.map((prod) => (
                    <Col lg={4} key={prod._id}>
                      <ProductCard
                        // info={{
                        //   img: prod.prodImage,
                        //   name: prod.prodName,
                        //   price: prod.prodPrice,
                        //   type: prod.prodType,
                        // }}
                        {...prod}
                      />
                    </Col>
                  ))
                )}
              </Row>
            </div>
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

      <Footer />
    </>
  );
}
