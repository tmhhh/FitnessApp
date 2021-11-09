import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useRouteMatch } from "react-router-dom";
import AdminRoute from "./AdminRoute";
import Sidebar from "./Sidebar";
import "./style.scss";

export default function AdminPage() {
  let { path, url } = useRouteMatch();
  // console.log({ path, url });
  return (
    <>
      <Container
        fluid
        style={{
          marginTop: "60px ",
          height: "100%",
          backgroundColor: "rgba(238, 238, 238, 0.707)",
        }}
      >
        <Row>
          <Col
            className="admin-sidebar d-flex"
            style={{ position: "fixed", top: "60px", left: "0" }}
            xs={12}
            sm={12}
            md={2}
          >
            <Sidebar url={url} />
          </Col>
          <Col style={{ marginLeft: "auto" }} xs={12} sm={12} md={10}>
            <AdminRoute path={path} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
