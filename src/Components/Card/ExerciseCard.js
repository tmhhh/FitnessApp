import React from "react";
import "./style.scss";
import { Card } from "react-bootstrap";
export default function ExerciseCard({ info: { img, tag, title } }) {
  const handleOnClick = () => {
    console.log(img);
  };
  return (
    <>
      <Card className="card exercise_card" onClick={handleOnClick}>
        <Card.Img className="card_image" variant="top" src={img} />
        <div className="card_tag">{tag}</div>
        <Card.Body className="card_body">
          <Card.Title className="card_name">{title}</Card.Title>
          <Card.Text className="card_price">123 comments,100 likes</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
