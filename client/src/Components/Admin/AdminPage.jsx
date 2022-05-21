import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useRouteMatch } from "react-router-dom";
import AdminRoute from "./AdminRoute";
import Sidebar from "./Sidebar";
import "./style.scss";
import { Helmet } from "react-helmet";
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
          backgroundColor: "rgba(248,248,248,0.71)",
        }}
      >
        <Helmet>
          <title>Dashboard</title>
          <meta name="description" content="Manage your application" />
        </Helmet>
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
