import React from "react";
import { ListGroup, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function Sidebar({ url }) {
  console.log({ url });
  return (
    <>
      <Nav className="admin-sidebar d-flex justify-content-center">
        <div style={{ marginTop: "80px ", width: "200px" }}>
          <NavLink
            exact
            to={url}
            activeClassName="sidebar-active"
            className="list-group-item list-group-item-action py-2 "
            aria-current="true"
          >
            <span className="me-3">🕹️</span>
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to={`${url}/category`}
            activeClassName="sidebar-active"
            className="list-group-item list-group-item-action py-2   "
          >
            <span className="me-3">🧩</span>
            <span>Categories</span>
          </NavLink>
          <NavLink
            to={`${url}/product`}
            activeClassName="sidebar-active"
            className="list-group-item list-group-item-action py-2   "
          >
            <span className="me-3">📦</span>
            <span>Products</span>
          </NavLink>
          <NavLink
            to={`${url}/user`}
            activeClassName="sidebar-active"
            className="list-group-item list-group-item-action py-2  "
          >
            <span className="me-3">🧑</span>
            <span>Users</span>
          </NavLink>
          <NavLink
            to={`${url}/review`}
            activeClassName="sidebar-active"
            className="list-group-item list-group-item-action py-2  "
          >
            <span className="me-3">💬</span>
            <span>Reviews</span>
          </NavLink>
          <NavLink
            to={`${url}/voucher`}
            activeClassName="sidebar-active"
            className="list-group-item list-group-item-action py-2  "
          >
            <span className="me-3">🎟️</span>
            <span>Vouchers</span>
          </NavLink>
        </div>
      </Nav>
    </>
  );
}
