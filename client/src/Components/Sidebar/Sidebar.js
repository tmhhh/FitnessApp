import React from "react";
import "./style.scss";
export default function Sidebar() {
  return (
    <div className="side_bar">
      <div className="product_type">
        <h3 className="product_type_title">
          FILTER
          <i class="fas fa-chevron-down"></i>
        </h3>
        <p>Protein</p>
        <p>PreWorkout</p>
        <p>BCCA</p>
        <p>Creatine</p>
        <p>Vitamins</p>
      </div>
      <div className="other_products">
        <h3 className="other_products_title">
          CATEGORY<i class="fas fa-list"></i>
        </h3>
        <p className="other_products_item">Supplements</p>
        <p className="other_products_item">Clothes</p>
        <p className="other_products_item">Equipments</p>
      </div>
    </div>
  );
}
