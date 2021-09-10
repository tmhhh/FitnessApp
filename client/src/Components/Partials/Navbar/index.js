import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import AuthForm from "../../Auth/AuthForm";
import "./style.scss";
export default function Navbar() {
  const history = useHistory();
  const [authForm, setAuthForm] = useState({
    type: "login",
    isShown: false,
  });

  const handleShowAuthForm = () => {
    if (authForm.isShown === false)
      return setAuthForm({ ...authForm, isShown: true });
    setAuthForm({ ...authForm, isShown: false });
  };
  return (
    <>
      <Nav className="nav_bar" activeKey="/home">
        <div className="nav_bar_logo" onClick={() => history.push("/")}>
          <img
            width="70"
            height="40"
            src="https://dfd5gcc6b7vw5.cloudfront.net/assets/logo-8a7bb8b7de46c1b7163081c1d735c55860cf8d83689ad0a98a1865826a82b7cc.svg"
            alt="logo"
          />
        </div>
        <div className="nav_bar_link">
          <Nav.Item className="nav_bar_item">
            <NavLink to="/training">TRAINING</NavLink>
          </Nav.Item>
          <Nav.Item className="nav_bar_item">
            <NavLink to="/checkout">NUTRITION</NavLink>
          </Nav.Item>
          <Nav.Item className="nav_bar_item">
            <NavLink to="/shopping">SHOP</NavLink>
          </Nav.Item>
          <Nav.Item className="nav_bar_item">
            <NavLink to="/admin">Admin</NavLink>
          </Nav.Item>
          <Nav.Item className="nav_bar_item">
            <a href="#bca" onClick={handleShowAuthForm}>
              {authForm.isShown === false ? "LOGIN" : "X"}
            </a>
          </Nav.Item>
          <AuthForm authForm={authForm} setAuthForm={setAuthForm} />
        </div>
      </Nav>
    </>
  );
}
