import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./style.scss";

import logo from "./logo.png";
export default function Navbar() {
  return (
    <>
      <Nav className="nav_bar" activeKey="/home">
        <div className="nav_bar_logo">
          <img width="70" height="40" src={logo} alt="logo" />
        </div>
        <div className="nav_bar_link">
          <Nav.Item className="nav_bar_item">
            <NavLink to="/training">TRAINING</NavLink>
          </Nav.Item>
          <Nav.Item className="nav_bar_item">
            <NavLink to="/blog">BLOG</NavLink>
          </Nav.Item>
          <Nav.Item className="nav_bar_item">
            <NavLink to="/shop">SHOP</NavLink>
          </Nav.Item>
          <Nav.Item className="nav_bar_item">
            <NavLink to="/login">LOG IN</NavLink>
          </Nav.Item>
        </div>
      </Nav>
    </>
  );
}
