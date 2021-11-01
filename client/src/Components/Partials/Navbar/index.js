import React, { useContext } from "react";
import { Dropdown, DropdownButton, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { Context } from "../../../Contexts";
import AuthForm from "../../Auth/AuthForm";
import "./style.scss";
import { USER_IMAGE_BASE_URL } from "../../../assets/constants";
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
    // if (authForm.isShown === false)
    return setAuthForm({ ...authForm, isShown: !authForm.isShown });
    // setAuthForm({ ...authForm, isShown: false });
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
            <NavLink activeClassName="nav_bar_item_active" to="/training">
              TRAINING
            </NavLink>
          </Nav.Item>
          <Nav.Item className="nav_bar_item">
            <NavLink activeClassName="nav_bar_item_active" to="/nutrition">
              NUTRITION
            </NavLink>
          </Nav.Item>
          <Nav.Item className="nav_bar_item">
            <NavLink activeClassName="nav_bar_item_active" to="/shopping">
              SHOP
            </NavLink>
          </Nav.Item>
          <Nav.Item className="nav_bar_item">
            {authLoading ? null : isAuthenticated ? (
              <>
                <img
                  className="user_image"
                  alt={userInfo.userImage}
                  src={
                    userInfo.userImage.includes("http")
                      ? userInfo.userImage
                      : `${USER_IMAGE_BASE_URL}/${userInfo.userImage}`
                  }
                />
                <DropdownButton
                  id="dropdown_toggle"
                  title={
                    userInfo.userName.split(" ")[
                      userInfo.userName.split(" ").length - 1
                    ]
                  }
                  autoClose
                >
                  {userInfo.userType === 1 && (
                    <NavLink
                      className="dropdown_item pointer"
                      activeClassName="dropdown_item_active dropdown_item pointer"
                      to="/admin"
                    >
                      <div className="dropdown_item_icon">
                        <i className="fas fa-users-cog"></i>
                      </div>{" "}
                      Dashboard
                    </NavLink>
                  )}

                  <NavLink
                    className="dropdown_item pointer"
                    activeClassName="dropdown_item_active dropdown_item pointer"
                    to="/profile"
                  >
                    <div className="dropdown_item_icon">
                      <i className="far fa-id-badge"></i>
                    </div>
                    Profile
                  </NavLink>
                  <NavLink
                    className="dropdown_item pointer"
                    activeClassName="dropdown_item_active dropdown_item pointer"
                    to="/checkout"
                  >
                    <div className="dropdown_item_icon">
                      <i className="fas fa-shopping-basket"></i>
                    </div>
                    Shopping Cart
                  </NavLink>

                  <div className="dropdown_item ">
                    <div className="dropdown_item_icon">
                      <i className="far fa-user"></i>
                    </div>{" "}
                    Type: {userInfo.userType === 0 ? "User" : "Admin"}
                  </div>

                  <Dropdown.Divider id="dropdown_divider" />
                  <div
                    className=" dropdown_item pointer"
                    onClick={handleLogout}
                  >
                    <div className="dropdown_item_icon">
                      <i className="fas fa-sign-out-alt"></i>
                    </div>
                    Logout
                  </div>
                </DropdownButton>
              </>
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
