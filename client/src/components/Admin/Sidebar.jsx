import { NavLink } from "react-router-dom";

export default function Sidebar({ url }) {
  // console.log({ url });
  return (
    <>
      <NavLink
        exact
        to={url}
        activeClassName="sidebar-active"
        className="list-group-item list-group-item-action py-2  "
        aria-current="true"
      >
        <span
          style={{ display: "inline-block", width: "20px" }}
          className="me-3"
        >
          <i className="fas fa-home"></i>
        </span>
        <span>Dashboard</span>
      </NavLink>
      <NavLink
        to={`${url}/category`}
        activeClassName="sidebar-active"
        className="list-group-item list-group-item-action py-2   "
      >
        <span
          style={{ display: "inline-block", width: "20px" }}
          className="me-3"
        >
          🧩
        </span>
        <span>Categories</span>
      </NavLink>
      <NavLink
        to={`${url}/product`}
        activeClassName="sidebar-active"
        className="list-group-item list-group-item-action py-2   "
      >
        <span
          style={{ display: "inline-block", width: "20px" }}
          className="me-3"
        >
          📦
        </span>
        <span>Products</span>
      </NavLink>
      <NavLink
        to={`${url}/post`}
        activeClassName="sidebar-active"
        className="list-group-item list-group-item-action py-2  "
      >
        <span
          style={{ display: "inline-block", width: "20px" }}
          className="me-3"
        >
          📮
        </span>
        <span>Posts</span>
      </NavLink>
      <NavLink
        to={`${url}/service`}
        activeClassName="sidebar-active"
        className="list-group-item list-group-item-action py-2"
        hidden="true"
      >
        <span
          style={{ display: "inline-block", width: "20px" }}
          className="me-3"
        >
          💬
        </span>
        <span>Reviews</span>
      </NavLink>
      <NavLink
        to={`${url}/voucher`}
        activeClassName="sidebar-active"
        className="list-group-item list-group-item-action py-2  "
      >
        <span
          style={{ display: "inline-block", width: "20px" }}
          className="me-3"
        >
          🎟️
        </span>
        <span>Vouchers</span>
      </NavLink>
      <NavLink
        to={`${url}/exercises`}
        activeClassName="sidebar-active"
        className="list-group-item list-group-item-action py-2  "
      >
        <span
          style={{ display: "inline-block", width: "20px" }}
          className="me-3"
        >
          <i className="fas fa-dumbbell"></i>
        </span>
        <span>Exercises</span>
      </NavLink>
      <NavLink
        to={`${url}/bills`}
        activeClassName="sidebar-active"
        className="list-group-item list-group-item-action py-2  "
      >
        <span
          style={{ display: "inline-block", width: "20px" }}
          className="me-3"
        >
          <ion-icon name="newspaper-outline"></ion-icon>
        </span>
        <span>Bills</span>
      </NavLink>
    </>
  );
}
