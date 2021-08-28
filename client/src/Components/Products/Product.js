import React from "react";
import "./style.scss";
export default function Product({ info: { name, price, img } }) {
  return (
    <div className="product">
      <img className="product_image" src={img} />
      <div>
        <p className="product_name">{name}</p>
        <p className="product_price">{price}</p>
      </div>
      {/* <div className="product_icon_container">
        <i style={{ color: "red" }} class="fas fa-plus"></i>
        <i style={{ color: "paleturquoise " }} class="fas fa-shopping-cart"></i>
      </div> */}
    </div>
  );
}
