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
      <Sidebar url={url} />
      <Container
        fluid
        style={{
          marginTop: "60px ",
          height: "100%",
          backgroundColor: "rgba(238, 238, 238, 0.707)",
        }}
      >
        <Row>
          <Col xs={2}></Col>
          <Col xs={10}>
            <AdminRoute path={path} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
