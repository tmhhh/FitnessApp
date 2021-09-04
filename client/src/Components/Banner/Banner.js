import React from "react";
import "./style.scss";
export default function Banner() {
  return (
    <div className="banner banner-section">
      <img
        src="https://dfd5gcc6b7vw5.cloudfront.net/assets/thenx-header-b0f1a2685be5ff4f739a7333baf90c8045a39f170347548609b634e39709357c.jpg"
        alt=""
        className="banner_image"
      />
      <div className="banner_title">
        <p className="banner_main_title">The World Of Fitness</p>
        <div className="banner_sub_title">Better Day By Day</div>
      </div>
    </div>
  );
}
