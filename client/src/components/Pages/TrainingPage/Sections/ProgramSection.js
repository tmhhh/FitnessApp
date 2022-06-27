import React from "react";
import ExerciseCard from "../../../Card/ExerciseCard";
import { Button } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";

import { useHistory } from "react-router";
export default function ProgramSection({ title }) {
  const history = useHistory();
  return (
    <div className="program_section container">
      <h1 className="program_section_title">{title}</h1>
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
              img: "https://res.cloudinary.com/thenx-production/image/upload/w_450/v1559250020/programs/46/1559249983.jpg",
            }}
          />
        </Col>
        <Col>
          <ExerciseCard
            info={{
              title: "Professional Program ",

              tag: "Professional ",
              img: "https://res.cloudinary.com/thenx-production/image/upload/w_450/v1558975698/programs/48/1558975688.jpg",
            }}
          />
        </Col>
      </Row>
      <button
        onClick={() => history.push("/programs")}
        style={{
          fontSize: "18.88px",
          padding: "12px 48px",
          display: "block",
          margin: "auto",
        }}
        className="common-button"
      >
        {" "}
        View All
      </button>
    </div>
  );
}
