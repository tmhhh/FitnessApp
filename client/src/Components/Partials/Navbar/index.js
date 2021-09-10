import React, { useContext, useState } from "react";
import { Nav, Dropdown, DropdownButton } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { Context } from "../../../Contexts";
import AuthForm from "../../Auth/AuthForm";
import "./style.scss";
export default function Navbar() {
  // const [showDropdown, setDropdown] = useState(false);
  const history = useHistory();
  const { authForm, setAuthForm, loadUser } = useContext(Context);
  const { isAuthenticated, userInfo, authLoading } = useSelector(
    (state) => state.authReducer
  );
  //SHOW FORM
  const handleShowAuthForm = () => {
    if (isAuthenticated) return;
    if (authForm.isShown === false)
      return setAuthForm({ ...authForm, isShown: true });
    setAuthForm({ ...authForm, isShown: false });
  };

  // //HIDE DROPDOWN
  // const handleHideDropdown = () => {
  //   console.log("hide");
  //   setDropdown(false);
  // };

  // //SHOW DROPDOWN
  // const handleShowDropdown = () => {
  //   console.log("show");
  //   setDropdown(true);
  // };

  //LOG OUT
  const handleLogout = () => {
    console.log("log out");
    localStorage.removeItem("USER_TOKEN");
    loadUser();
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
            <NavLink to="/nutrition">NUTRITION</NavLink>
          </Nav.Item>
          <Nav.Item className="nav_bar_item">
            <NavLink to="/shopping">SHOP</NavLink>
          </Nav.Item>
          <Nav.Item className="nav_bar_item">
            {authLoading ? null : isAuthenticated ? (
              <DropdownButton
                id="dropdown_toggle"
                title={userInfo.userName}
                autoClose
              >
                <Dropdown.Item className=" dropdown_item">
                  <Link to="/profile">
                    <i className="far fa-id-badge"></i> Profile
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item className=" dropdown_item">
                  <Link to="/checkout">
                    <i className="fas fa-shopping-basket"></i>Shopping Cart
                  </Link>
                </Dropdown.Item>

                <Dropdown.Item className=" dropdown_item">
                  <p>
                    <i className="far fa-user"></i> Type
                  </p>
                </Dropdown.Item>

                <Dropdown.Divider id="dropdown_divider" />
                <Dropdown.Item className=" dropdown_item">
                  <p role="button" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                    Logout
                  </p>
                </Dropdown.Item>
              </DropdownButton>
            ) : (
              <span role="button" onClick={handleShowAuthForm}>
                {authForm.isShown === false ? "LOGIN" : "X"}
              </span>
            )}
          </Nav.Item>

          <AuthForm />
        </div>
      </Nav>
    </>
  );
}
