import React from "react";
import { Table, Row, Col } from "react-bootstrap";
import "./style.scss";
export default function UserBill() {
  return (
    // <Row>
    // <Col md="12">
    <Table striped bordered hover className="mt-4 h-50 ">
      <thead>
        <tr>
          <th>#</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total Price</th>
          <th>Buy Date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>ISO HD</td>
          <td>$50</td>
          <td>3</td>
          <td>$150</td>
          <td>12/06/00</td>
        </tr>
        <tr>
          <td>1</td>
          <td>ISO HD</td>
          <td>$50</td>
          <td>3</td>
          <td>$150</td>
          <td>12/06/00</td>
        </tr>
      </tbody>
    </Table>
    // </Col>
    // </Row>
  );
}
