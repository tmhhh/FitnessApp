import React from "react";
import { Row, Col } from "react-bootstrap";
import Navbar from "../../Navbar/Navbar";
import Product from "../../Products/Product";

import "./style.scss";
import Sidebar from "../../Sidebar/Sidebar";
import Footer from "../../Footer/Footer";
import SearchBar from "../../SearchBar/SearchBar";

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
                  <Product
                    info={{
                      img: "https://cdn.shopify.com/s/files/1/0561/9761/1672/products/best-bcaa-shredded-25serv-watermelon-ice-WEB_400x.jpg?v=1619791489",
                      name: "BEST BCAA SHREDDED",
                      price: "30$",
                    }}
                  />
                </Col>
                <Col lg={4}>
                  <Product
                    info={{
                      img: "https://cdn.shopify.com/s/files/1/0561/9761/1672/products/ISO-HD_5LBS_CNC---PSL-3000x3000-compressor_400x.jpg?v=1619802031",
                      name: "ISO HD ",
                      price: "50$",
                    }}
                  />
                </Col>
                <Col lg={4}>
                  <Product
                    info={{
                      img: "https://cdn.shopify.com/s/files/1/0561/9761/1672/products/best-protein-vanilla-swirl-72-serv-WEB_400x.jpg?v=1619801437",
                      name: "BEST PROTEIN",
                      price: "50$",
                    }}
                  />
                </Col>
                <Col lg={4}>
                  <Product
                    info={{
                      img: "https://cdn.shopify.com/s/files/1/0561/9761/1672/products/VEGAN-PROTEIN-25-Servs-Vanilla_3000x3000-COMPRESSED_400x.jpg?v=1619804132",
                      name: "VEGAN PROTEIN",
                      price: "42$",
                    }}
                  />
                </Col>
                <Col lg={4}>
                  <Product
                    info={{
                      img: "https://cdn.shopify.com/s/files/1/0561/9761/1672/products/best-aminos-fruit-punch-25serv_3000x3000-WEB_400x.jpg?v=1619799310",
                      name: "BEST AMINO ACID",
                      price: "27$",
                    }}
                  />
                </Col>
                <Col lg={4}>
                  <Product
                    info={{
                      img: "https://cdn.shopify.com/s/files/1/0561/9761/1672/products/BEST-CREATINE-50-Serv-Watermelon-Cooler-3000x3000-WEB_400x.jpg?v=1619792044",
                      name: "BEST CREATINE",
                      price: "29.99$",
                    }}
                  />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
      <Pagination
        style={{ position: "relative", left: "50%", marginTop: "60px" }}
      >
        <Pagination.Prev />
        <Pagination.Item active>{1} </Pagination.Item>
        <Pagination.Item>{2}</Pagination.Item>

        <Pagination.Item disabled>{3}</Pagination.Item>

        <Pagination.Next />
      </Pagination>
      <Footer />
    </>
  );
}
