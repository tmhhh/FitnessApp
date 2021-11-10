import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./style.scss";
import { USER_IMAGE_BASE_URL } from "../../../../assets/constants";
export default function Sidebar({ userImage, userName, parentPath }) {
  return (
    <div className="side_bar_container">
      <div className="side_bar_user_info">
        <img
          src={
            userImage.includes("http")
              ? userImage
              : `${USER_IMAGE_BASE_URL}/${userImage}`
          }
          alt={userName}
          className="user_image"
        />
        <div className="user_name">{userName}</div>
      </div>
      <div className="side_bar_items">
        <div className="side_bar_item">
          <i className="fas fa-user"></i>
          <NavLink
            activeClassName="navbar_active"
            to="/profile"
            exact
            className="personal_information"
          >
            personal information
          </NavLink>
          <i className="fas fa-chevron-right"></i>
        </div>
        <div className="side_bar_item">
          <i className="fas fa-shopping-cart"></i>
          <NavLink
            exact
            activeClassName="navbar_active"
            to={`/profile/bill`}
            className="personal_information"
          >
            Bill information
          </NavLink>
          <i className="fas fa-chevron-right"></i>
        </div>
        <div className="side_bar_item">
          <i className="fas fa-wallet"></i>
          <NavLink
            exact
            activeClassName="navbar_active"
            to={`/profile/bill`}
            className="personal_information"
          >
            Bill history
          </NavLink>
          <i className="fas fa-chevron-right"></i>
        </div>
      </div>
    </div>
  );
}
