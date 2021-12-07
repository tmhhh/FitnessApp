import React, { useEffect, useState } from "react";
import { Table, Row, Col } from "react-bootstrap";
import billApi from "../../../../api/billApi";
import { formatCurrency } from "../../../../utils/formatCurrency";
export default function UserBillHistory() {
  const [listBills, setListBills] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await billApi.getBillHistoryByCustomer();
      const listBills = res.data.bills;
      setListBills(listBills);
      console.log(listBills);
    })();
  }, []);

  return (
    <div className="w-100">
      {listBills.length > 0 &&
        listBills.map((bill, index) => (
          <div style={{ margin: "20px" }} key={bill._id}>
            <h3>
              #{index + 1} ({new Date(bill.createdAt).toLocaleDateString()})
            </h3>

            <Table striped bordered hover className="mt-4 h-50 ">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {bill.listItems?.map((item, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.product.prodName}</td>
                    <td>{formatCurrency(item.product.prodPrice)}</td>
                    <td>{item.quantity}</td>
                    <td>
                      {item.prodDiscount ? (
                        <>
                          <p
                            style={{
                              color: "#999",
                              textDecoration: "line-through",
                            }}
                          >
                            {formatCurrency(
                              item.product.prodPrice * item.quantity
                            )}
                          </p>
                          <p>
                            {formatCurrency(
                              item.product.prodPrice *
                                item.quantity *
                                (1 - item.prodDiscount / 100)
                            )}
                          </p>
                        </>
                      ) : (
                        formatCurrency(item.quantity * item.product.prodPrice)
                      )}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>

                  <td>
                    <p style={{ fontSize: "1.3rem", fontWeight: 400 }}>Total</p>
                  </td>
                  <td>
                    <p style={{ fontSize: "1.3rem", fontWeight: 700 }}>
                      {" "}
                      {formatCurrency(
                        bill.price.totalPrice - bill.price.shippingFee
                      )}
                      {bill.discountUsed && ` (-${bill.price.discount}%)`}{" "}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>

                  <td>
                    <p style={{ fontSize: "1.3rem", fontWeight: 400 }}>
                      Status
                    </p>
                  </td>
                  <td>
                    <p style={{ fontSize: "1.3rem", fontWeight: 700 }}>
                      {bill.status}
                    </p>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        ))}
    </div>
  );
}
