import React from "react";
import Navbar from "../Navbar/Navbar";
import { Carousel, Row, Col } from "react-bootstrap";
import "./style.scss";

import ShoppingCard from "../Card/ShoppingCard";
import Footer from "../Footer/Footer";
export default function Home() {
  return (
    <>
      <Navbar />
      <div className="banner banner-section">
        <img
          src="https://dfd5gcc6b7vw5.cloudfront.net/assets/thenx-header-b0f1a2685be5ff4f739a7333baf90c8045a39f170347548609b634e39709357c.jpg"
          alt=""
          className="banner_image"
        />
        <div className="banner_title">
          <p className="banner_main_title">The World Of Fitness</p>
          <div className="banner_sub_title">Better Day By Dat</div>
        </div>
      </div>
      <div className="shop_section container">
        <h1 className="shop_section_title">Shop</h1>
        <Row>
          <Col>
            <ShoppingCard img="https://dfd5gcc6b7vw5.cloudfront.net/assets/equipments/rings-6aad838348a180ba305a9e299e9b0c8c959be64778998782d52fe5375b3edc7a.jpg" />
          </Col>
          <Col>
            <ShoppingCard img="https://dfd5gcc6b7vw5.cloudfront.net/assets/equipments/rings-6aad838348a180ba305a9e299e9b0c8c959be64778998782d52fe5375b3edc7a.jpg" />
          </Col>
          <Col>
            <ShoppingCard img="https://dfd5gcc6b7vw5.cloudfront.net/assets/equipments/rings-6aad838348a180ba305a9e299e9b0c8c959be64778998782d52fe5375b3edc7a.jpg" />
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  );
}
