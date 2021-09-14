import React from "react";
import { Col, Pagination, Row, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import ProductCard from "../../Card/ProductCard";
import SearchBar from "../../Common/SearchBar";
import Sidebar from "../../Partials/Sidebar";
import "./style.scss";

export default function ShoppingPage() {
  const prodSelector = useSelector((state) => state.prodReducer);
  return (
    <>
      <div className="container shopping_page_container">
        <Row>
          <Col lg={3}>
            <Sidebar />
          </Col>
          <Col lg={9}>
            <SearchBar />
            <div className="product_container">
              <Row>
                {prodSelector.prodLoading ? (
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
                      <ProductCard {...prod} />
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
    </>
  );
}
