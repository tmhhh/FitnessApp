import React from "react";
import { Button, Container } from "react-bootstrap";

export default function ProductSide() {
  return (
    <Container className="admin-container mt-5">
      <div className="admin-content">
        <h2 className="admin-content-title">Manage Product</h2>
        <Button variant="dark" className="myButton">
          {" "}
          + New item
        </Button>
      </div>
    </Container>
  );
}
