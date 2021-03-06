import React from "react";
import "./style.scss";
export default function Footer() {
  return (
    <footer className="footer container-fluid">
      <div className="footer_info">
        <div className="footer_info_title">Company</div>
        <div className="footer_info_details">
          <i className="fas fa-shopping-basket"></i>
          <span>Shopping</span>
        </div>
        <div className="footer_info_details">
          <i className="fas fa-utensils"></i>
          <span>Nutrition</span>
        </div>
        <div className="footer_info_details">
          <i className="fas fa-dumbbell"></i>
          <span>Training</span>
        </div>
      </div>
      <div className="footer_info">
        <div className="footer_info_title">Social</div>
        <div className="footer_info_details">
          <ion-icon name="logo-facebook"></ion-icon>
          <span>Facebook</span>
        </div>
        <div className="footer_info_details">
          <ion-icon name="logo-google"></ion-icon>
          <span>Gmail</span>
        </div>
        <div className="footer_info_details">
          <ion-icon name="logo-instagram"></ion-icon>
          <span>Instagram</span>
        </div>
      </div>
      <div className="footer_info">
        <div className="footer_info_title">Address</div>
        <div className="footer_info_details">
          <ion-icon name="navigate-outline"></ion-icon>
          <span>1 Vo Van Ngan, tp Thu Duc</span>
        </div>
      </div>
    </footer>
  );
}
