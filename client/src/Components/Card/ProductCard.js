import React from "react";
import "./style.scss";
import { useHistory } from "react-router";

export default function Product({ info: { name, type, price, img } }) {
  const history = useHistory();
  return (
    <div className="product_card">
      <img
        className="product_card_image"
        src={img}
        alt={name}
        onClick={() => {
          history.push("/productDetail");
        }}
      />
      <div className="product_card_content">
        <p className="product_card_name">{name}</p>
        <p className="product_card_type">{type}</p>
        <p className="product_card_price">{price}</p>
      </div>
      <div className="product_card_actions">
        <i className="fas fa-cart-plus"></i>
        {/* <i class="far fa-heart"></i> */}
      </div>
    </div>
  );
}
