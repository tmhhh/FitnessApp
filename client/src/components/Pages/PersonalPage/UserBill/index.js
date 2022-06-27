import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import billApi from "../../../../api/billApi";
import { formatCurrency } from "../../../../utils/formatCurrency";
import "./style.scss";
export default function UserBill() {
  const [listBills, setListBills] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await billApi.getIncompleteBill();
        if (res.data.isSuccess) setListBills(res.data.foundBills);
      } catch (error) {
        console.log(error);
      }
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
              </tbody>
            </Table>
          </div>
        ))}
    </div>
  );
}
