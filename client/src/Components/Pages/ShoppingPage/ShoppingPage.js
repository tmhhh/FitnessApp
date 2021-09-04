import React from "react";
import { Row, Col } from "react-bootstrap";
import Navbar from "../../Navbar/Navbar";
import ProductCard from "../../Card/ProductCard";

import "./style.scss";
import Sidebar from "../../Sidebar/Sidebar";
import Footer from "../../Footer/Footer";
import SearchBar from "../../SearchBar/SearchBar";
import imgSrc from "../../../assets/img/best_bcaa.png";
import imgSrc2 from "../../../assets/img/best_aminos.png";
import imgSrc3 from "../../../assets/img/best_creatine.png";
import imgSrc4 from "../../../assets/img/best_protein.png";
import imgSrc5 from "../../../assets/img/iso_hd.png";
import imgSrc6 from "../../../assets/img/vegan_protein.png";

import { Pagination } from "react-bootstrap";
export default function ShoppingPage() {
  return (
    <>
      <Navbar />
      <div className="container shopping_page_container">
        <Row>
          <Col lg={3}>
            <Sidebar />
          </Col>
          <Col lg={9}>
            <div className="product_container">
              <SearchBar />
              <Row>
                <Col lg={4}>
                  <ProductCard
                    info={{
                      img: imgSrc,
                      name: "BEST BCAA SHREDDED",
                      price: "$30",
                      type: "Supplement",
                    }}
                  />
                </Col>
                <Col lg={4}>
                  <ProductCard
                    info={{
                      img: imgSrc2,
                      name: "ISO HD",
                      price: "$50",
                      type: "Supplement",
                    }}
                  />
                </Col>
                <Col lg={4}>
                  <ProductCard
                    info={{
                      img: imgSrc3,
                      name: "BEST PROTEIN",
                      price: "$50",
                      type: "Supplement",
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={4}>
                  <ProductCard
                    info={{
                      img: imgSrc4,
                      name: "VEGAN PROTEIN",
                      price: "$42",
                      type: "Supplement",
                    }}
                  />
                </Col>
                <Col lg={4}>
                  <ProductCard
                    info={{
                      img: imgSrc5,
                      name: "BEST AMINO ACID",
                      price: "$27",
                      type: "Supplement",
                    }}
                  />
                </Col>
                <Col lg={4}>
                  <ProductCard
                    info={{
                      img: imgSrc6,
                      name: "BEST CREATINE",
                      price: "$29.99",
                      type: "Supplement",
                    }}
                  />
                </Col>
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
