import React from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router";
import "./style.scss";
export default function ShoppingCard({ img, tag }) {
  const history = useHistory();
  const handleOnClick = () => {
    history.push("/shop");
  };
  return (
    <Card className="shopping_card " onClick={handleOnClick}>
      <div className="shopping_card_tag">{tag}</div>
      <Card.Img
        className="shopping_card_image"
        variant="top"
        src={img}
        alt={tag}
      />
      <Card.Body className="shopping_card_body">
        <Card.Title className="shopping_card_name">Card Title</Card.Title>
        <Card.Text className="shopping_card_price">150.000VND</Card.Text>
      </Card.Body>
    </Card>
  );
}
