import React from "react";
import ExerciseCard from "../../../Card/ExerciseCard";
import { Row, Col, Button } from "react-bootstrap";
export default function TechniqueSection() {
  return (
    <div className="technique_section container">
      <h1 className="technique_section_title">Technique Guides</h1>
      <Row>
        <Col>
          <ExerciseCard
            info={{
              img: "https://res.cloudinary.com/thenx-production/image/upload/w_450/v1559051302/programs/53/1559051292.jpg",
              title: "Handstand Technique Guide",
              tag: "Beginner",
            }}
          />
        </Col>
        <Col>
          <ExerciseCard
            info={{
              img: "https://res.cloudinary.com/thenx-production/image/upload/w_450/v1559050689/programs/55/1559050678.jpg",
              title: "Muscle Up Technique Guide",
              tag: "Intermediate",
            }}
          />
        </Col>
        <Col>
          <ExerciseCard
            info={{
              img: "https://res.cloudinary.com/thenx-production/image/upload/w_450/v1559050975/programs/56/1559050923.jpg",
              title: "Pullover Technique Guide",
              tag: "Professional",
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
  );
}
