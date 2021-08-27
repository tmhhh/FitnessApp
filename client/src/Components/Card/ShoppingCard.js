import React from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router";
import "./style.scss";
export default function ShoppingCard({ img }) {
  const history = useHistory();
  const handleOnClick = () => {
    history.push("/shop");
  };
  return (
    <Card className="card " onClick={handleOnClick}>
      <Card.Img className="card_image" variant="top" src={img} />
      <Card.Body className="card_body">
        <Card.Title className="card_name">Card Title</Card.Title>
        <Card.Text className="card_price">150.000VND</Card.Text>
      </Card.Body>
    </Card>
  );
}
