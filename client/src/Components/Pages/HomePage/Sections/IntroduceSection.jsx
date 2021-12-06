import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.scss";
export default function IntroduceSection() {
  return (
    <div className="introduce_section container-fluid">
      <Row>
        <Col className="introduce_section_item section_item_title" md="6" lg="6">
          <div className="introduce_section_title">From Beginner To Pro</div>
          <Link to="/nutrition" className="btn btn-primary mx-auto introduce_section_title_button ">
            Search For Nutrition
          </Link>
        </Col>
        <Col className="introduce_section_item section_item_image" md="6" lg="6">
          <div className="introduce_section_image imageForSearchNutrition">
            <img
              src="https://dfd5gcc6b7vw5.cloudfront.net/assets/screenshots/dashboard-ef274319d69eadedf3f9688a67bdfdb36651fe8b5a98bf55461a0b6e08636cef.jpg"
              alt=""
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="introduce_section_item" md="6" lg="6">
          <div className="introduce_section_image">
            <img
              src="https://dfd5gcc6b7vw5.cloudfront.net/assets/screenshots/workouts-library-36a4ef01f5bc38a1bf26ab7d6d246bc85fc7e0f4cb6b59c2eba30d24d6924e2f.jpg"
              alt=""
            />
          </div>
        </Col>
        <Col className="introduce_section_item" md="6" lg="6">
          {" "}
          <div className="introduce_section_title">
            Custom Programs & Technique guides for you{" "}
          </div>
          <Link to="/training" className="btn btn-primary mx-auto">
            Search For Exercise
          </Link>
        </Col>
      </Row>
    </div>
  );
}
