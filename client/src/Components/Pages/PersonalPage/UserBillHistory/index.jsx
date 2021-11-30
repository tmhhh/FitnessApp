import React, { useEffect, useState } from "react";
import { Table, Row, Col } from "react-bootstrap";
import billApi from "../../../../api/billApi";

export default function UserBillHistory() {
  const [listBill, setListBill] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await billApi.getBillByCustomer();
      const listBill = res.data.bills;
      setListBill(listBill);
      console.log(listBill);
    })();
  }, []);

  return (
    <div className="d-flex flex-column w-100">
      {listBill.length > 0 &&
        listBill.map((bill, index) => (
          <div key={bill._id}>
            <h1>Bill no.{index + 1}</h1>
            <Table striped bordered hover className="mt-4 h-50 ">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Buy Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bill.listItems?.map((item, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.product.prodName}</td>
                    <td>{item.product.prodPrice}</td>
                    <td>{item.quantity}</td>
                    <td>{item.quantity * item.product.prodPrice}</td>
                    <td>{bill.createdAt}</td>
                    <td>STATUS</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ))}
    </div>
  );
}
