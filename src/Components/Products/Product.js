import React from "react";
import { Card } from "react-bootstrap";
import "./style.scss";
export default function Product({ info: { name, price, img } }) {
  return (
    <Card className="product">
      <Card.Img className="product_image" variant="top" src={img} />
      <Card.Body>
        <Card.Title className="product_name">{name}</Card.Title>
        <Card.Text className="product_price">{price}</Card.Text>
      </Card.Body>
    </Card>
  );
}
