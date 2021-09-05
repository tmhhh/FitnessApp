import React from "react";
import { Col, Row } from "react-bootstrap";
// import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import ShoppingCard from "../../../Card/ShoppingCard";
import "./style.scss";
export default function ShoppingSection() {
  // const history = useHistory();
  return (
    <>
      <div className="shop_section container">
        <h1 className="shop_section_title">Shop</h1>
        <Row>
          <Col md={4}>
            <ShoppingCard
              tag={"Supplements"}
              img="https://dfd5gcc6b7vw5.cloudfront.net/assets/equipments/rings-6aad838348a180ba305a9e299e9b0c8c959be64778998782d52fe5375b3edc7a.jpg"
            />
          </Col>
          <Col md={4}>
            <ShoppingCard
              tag={"Clothes"}
              img="https://dfd5gcc6b7vw5.cloudfront.net/assets/equipments/paralettes-fafd7be0d551a1b8cf12ba1a875372fad8ec0c8c8fbb66182c46aef34332bc0f.jpg"
            />
          </Col>
          <Col md={4}>
            <ShoppingCard
              tag={"Equipments"}
              img="https://dfd5gcc6b7vw5.cloudfront.net/assets/equipments/bands-42412e7f634b9e31f039130383bc4ddf9a38e35adf61d390e44fe318cf7eadf3.jpg"
            />
          </Col>
        </Row>
        {/* <Button
          onClick={() => history.push("/shopping")}
          style={{
            fontSize: "18.88px",
            padding: "12px 48px",
            display: "block",
            margin: "20px auto",
          }}
          variant="dark"
        >
          {" "}
          View All
        </Button> */}
        <Link
          style={{
            display: "block",
            textDecoration: "none",
            width: "100px",
            margin: "0 auto 30px auto",
          }}
          to="/shopping"
        >
          <i
            style={{
              fontSize: "18.88px",
              padding: "15px 15px",
              borderRadius: "50%",
              backgroundColor: "black",
              color: "white",
            }}
            className="fa fa-arrow-right"
            aria-hidden="true"
          ></i>
        </Link>
      </div>
    </>
  );
}
