import React from "react";
import Navbar from "../Navbar/Navbar";
import Banner from "../Banner/Banner";
import ExerciseCard from "../Card/ExerciseCard";
import Footer from "../Footer/Footer";
import { Col, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
export default function Training() {
  return (
    <>
      <Navbar />
      <Banner />
      <div className="program_section container">
        <h1 className="program_section_title">Programs</h1>
        <Row>
          <Col>
            <ExerciseCard
              info={{
                title: "Beginner Program",
                tag: "Beginner",
                img: "https://res.cloudinary.com/thenx-production/image/upload/w_450/v1558975663/programs/45/1558975654.jpg",
              }}
            />
          </Col>
          <Col>
            <ExerciseCard
              info={{
                title: "Intermediate Program",

                tag: "Intermediate",
                img: "https://res.cloudinary.com/thenx-production/image/upload/w_450/v1558975663/programs/45/1558975654.jpg",
              }}
            />
          </Col>
          <Col>
            <ExerciseCard
              info={{
                title: "Professional Program ",

                tag: "Professional ",
                img: "https://res.cloudinary.com/thenx-production/image/upload/w_450/v1558975663/programs/45/1558975654.jpg",
              }}
            />
          </Col>
        </Row>
        <Button
          style={{
            fontSize: "18.88px",
            padding: "12px 48px",
            display: "block",
            margin: "auto",
          }}
          variant="dark"
        >
          {" "}
          View All
        </Button>
      </div>
      <Footer />
    </>
  );
}
