import React from "react";
import "./style.scss";
function RecommendOption({ image, name, description, onClick }) {
  return (
    <div onClick={onClick} className="recommend-option-container">
      <img className="recommend-option-img" src={image} alt={name} />
      <div className="recommend-option-info">
        <p className="recommend-option-name">{name}</p>
        <p className="recommend-option-description">{description}</p>
      </div>
    </div>
  );
}

export default RecommendOption;
