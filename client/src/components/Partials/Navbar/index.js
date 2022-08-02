import { Skeleton, Tooltip, Typography } from "antd";
import { useContext, useRef } from "react";
import { Dropdown, DropdownButton, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { USER_IMAGE_BASE_URL } from "../../../assets/constants";
import { Context } from "../../../contexts";
import AuthForm from "../../Auth/AuthForm";
import "./style.scss";

const { Link } = Typography;

export default function Navbar() {
  const navRef = useRef(null);
  // const [showDropdown, setDropdown] = useState(false);
  const history = useHistory();
  const { authForm, setAuthForm, loadUser } = useContext(Context);
  const { isAuthenticated, userInfo, authLoading } = useSelector(
    (state) => state.authReducer
  );
  const { userCart } = useSelector((state) => state.cartReducer);
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
      <i
        onClick={() => navRef.current.classList.toggle("nav_bar_active")}
        className="fas fa-bars nav_bar_toggle_icon"
      ></i>

      <Nav ref={navRef} className="nav_bar" activeKey="/home">
        <div className="nav_bar_logo" onClick={() => history.push("/")}>
          <img
            width="70"
            height="40"
            src="https://dfd5gcc6b7vw5.cloudfront.net/assets/logo-8a7bb8b7de46c1b7163081c1d735c55860cf8d83689ad0a98a1865826a82b7cc.svg"
            alt="logo"
          />
        </div>
        <i
          onClick={() => navRef.current.classList.toggle("nav_bar_active")}
          className="fas fa-times nav_bar_close_icon"
        ></i>

        <div className="nav_bar_link">
          <NavLink
            className="nav_bar_item"
            activeClassName="nav_bar_item_active"
            to="/training"
          >
            <div className="nav_bar_item-icon">
              <i className="fas fa-dumbbell"></i>
            </div>
            <div className="nav_bar_item-title">TRAINING</div>
          </NavLink>
          <NavLink
            className="nav_bar_item"
            activeClassName="nav_bar_item_active"
            to="/nutrition"
          >
            <div className="nav_bar_item-icon">
              <i className="fas fa-utensils"></i>{" "}
            </div>
            <div className="nav_bar_item-title">NUTRITION</div>
          </NavLink>
          <NavLink
            className="nav_bar_item"
            activeClassName="nav_bar_item_active"
            to="/blog"
          >
            <div className="nav_bar_item-icon">
              <i className="fas fa-pen"></i>{" "}
            </div>
            <div className="nav_bar_item-title">BLOG</div>
          </NavLink>
          <NavLink
            className="nav_bar_item"
            activeClassName="nav_bar_item_active"
            to="/shopping"
          >
            <div className="nav_bar_item-icon">
              <i className="fas fa-shopping-basket"></i>{" "}
            </div>
            <div className="nav_bar_item-title">SHOP</div>
          </NavLink>

          {authLoading ? (
            <div
              style={{
                minWidth: 140,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <Skeleton.Avatar active={true} size="large" shape={"circle"} />
              <Skeleton.Button style={{ height: 20 }} active={true} />
            </div>
          ) : isAuthenticated ? (
            <div className="nav_bar_item">
              <img
                className="user_image"
                alt={userInfo.userImage}
                src={
                  userInfo.userImage?.includes("http")
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
                      <i className="fas fa-home"></i>
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
                  <i className="cart-item-number">
                    {userCart.filter((e) => !e.isOrdered).length}
                  </i>
                </NavLink>

                <div className="dropdown_item ">
                  <div className="dropdown_item_icon">
                    <i className="far fa-user"></i>
                  </div>{" "}
                  Type: {userInfo.userType === 0 ? "User" : "Admin"}
                </div>

                <Dropdown.Divider id="dropdown_divider" />
                <div className=" dropdown_item pointer" onClick={handleLogout}>
                  <div className="dropdown_item_icon">
                    <i className="fas fa-sign-out-alt"></i>
                  </div>
                  Logout
                </div>
              </DropdownButton>
            </div>
          ) : (
            <div className="nav_bar_item" onClick={handleShowAuthForm}>
              {authForm.isShown === false ? (
                <>
                  <div className="nav_bar_item-icon">
                    <i className="fas fa-sign-in-alt"></i>
                  </div>
                  <div className="nav_bar_item-title">LOGIN</div>
                </>
              ) : (
                "X"
              )}
            </div>
          )}
          <Tooltip
            placement="bottomRight"
            title={"See more information about us"}
          >
            <Link
              style={{ color: "white", fontSize: 18, marginLeft: 10 }}
              href="https://fitnesswhitepaper.gitbook.io/untitled/about-us"
              target="_blank"
            >
              <i className="far fa-question-circle"></i>
            </Link>
          </Tooltip>
        </div>

        <AuthForm />
      </Nav>
    </>
  );
}
