import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router";
import "./style.scss";

export default function ShoppingCard({ img, tag }) {
  const history = useHistory();
  const handleOnClick = () => {
    history.push("/shopping");
  };
  return (
    <Card className="shopping_card ">
      <div className="shopping_card_tag">{tag}</div>
      <Card.Img
        className="shopping_card_image"
        variant="top"
        src={img}
        alt={tag}
      />
      <Card.Body className="shopping_card_noti" onClick={handleOnClick}>
        GET IN !!! <i className="far fa-hand-point-left"></i>
      </Card.Body>
    </Card>
  );
}
